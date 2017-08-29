const fs = require('fs');
const {hostname} = require('os');
const timestamp = require('time-stamp');
const stringify = require('fast-safe-stringify');

const logger = function logger (file, opts, args) {
	const stream = fs.createWriteStream(file, { flags: 'a' });

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

	const writeLog = function writeLog (level, msg) {
		const data = {
			version: '1.1',
			host: hostname,
			short_message: msg,
			message: msg,
			timestamp: opts.timestamp ? timestamp(opts.timestamp) : Number(new Date()),
			level: exports[level],
			_type: level
		};

		Object.assign(data, flat);

		if (exports[level] <= (exports[opts.logLevel] || exports.DEBUG)) {
			stream.write(`${stringify(data)}\r\n`, opts.encoding || 'utf8');
		}
	};

	flatten(args);

	return {
		log (level, msg) {
			writeLog(level, msg);
		},
		emergency (msg) {
			writeLog('EMERGENCY', msg);
		},
		alert (msg) {
			writeLog('ALERT', msg);
		},
		critical (msg) {
			writeLog('CRITICAL', msg);
		},
		error (msg) {
			writeLog('ERROR', msg);
		},
		warning (msg) {
			writeLog('WARNING', msg);
		},
		notice (msg) {
			writeLog('NOTICE', msg);
		},
		info (msg) {
			writeLog('INFO', msg);
		},
		debug (msg) {
			writeLog('DEBUG', msg);
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
