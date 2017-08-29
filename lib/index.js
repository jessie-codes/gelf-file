const fs = require('fs');
const {hostname} = require('os');
const timestamp = require('time-stamp');
const stringify = require('fast-safe-stringify');

const logger = function logger (file, opts, args) {
	const stream = fs.createWriteStream(file, { flags: 'a' });

	const writeLog = function writeLog (level, msg, tags) {
		let flat = {};

		const flatten = (pointer, attr) => {
			if (Object(pointer) !== pointer) {
				flat[`_${attr}`] = pointer;
			} else if (Array.isArray(pointer)) {
				for (let i = 0, len = pointer.length; i < len; i++) {
					flatten(pointer[i], `${attr}_${i}`);
				}
			} else {
				for (const n in pointer) {
					flatten(pointer[n], attr ? `${attr}_${n}` : n);
				}
			}
		};

		const data = {
			version: '1.1',
			host: hostname,
			short_message: msg,
			message: msg,
			timestamp: opts.timestamp ? timestamp(opts.timestamp) : Number(new Date()),
			level: exports[level],
			_type: level
		};

		flatten(Object.assign({}, args, tags));
		Object.assign(flat, data);

		if (exports[level] <= (exports[opts.logLevel] || exports.DEBUG)) {
			stream.write(`${stringify(flat)}\r\n`, opts.encoding || 'utf8');
		}
	};

	return {
		log (level, msg) {
			writeLog(level, msg, args);
		},
		emergency (msg) {
			writeLog('EMERGENCY', msg, args);
		},
		alert (msg) {
			writeLog('ALERT', msg, args);
		},
		critical (msg) {
			writeLog('CRITICAL', msg, args);
		},
		error (msg) {
			writeLog('ERROR', msg, args);
		},
		warning (msg) {
			writeLog('WARNING', msg, args);
		},
		notice (msg) {
			writeLog('NOTICE', msg, args);
		},
		info (msg) {
			writeLog('INFO', msg, args);
		},
		debug (msg) {
			writeLog('DEBUG', msg, args);
		}
	};
};

exports.EMERGENCY = 0;
exports.ALERT = 1;
exports.CRITICAL = 2;
exports.ERROR = 3;
exports.WARNING = 4;
exports.NOTICE = 5;
exports.INFO = 6;
exports.DEBUG = 7;

module.exports = logger;
