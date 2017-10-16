const fs = require('fs');
const {hostname} = require('os');
const timestamp = require('time-stamp');
const stringify = require('fast-safe-stringify');
const flat = require('flat');

const flatten = function flatten (original) {
	let result = flat(original, { delimiter: '_' });

	result = mapKeys(result, (value, key) => `_${key}`);

	return result;
};

const logger = function logger (file, opts, args) {
	const stream = fs.createWriteStream(file, { flags: 'a' });

	const writeLog = function writeLog (level, msg, tags) {
		const data = {
			version: '1.1',
			host: hostname(),
			short_message: msg,
			message: msg,
			timestamp: opts.timestamp ? timestamp(opts.timestamp) : Number(new Date()),
			level: exports[level],
			_type: level
		};

		let flattened = flatten(Object.assign({}, args, tags));

		Object.assign(flattened, data);

		if (exports[level] <= (exports[opts.logLevel] || exports.DEBUG)) {
			stream.write(`${stringify(flattened)}\r\n`, opts.encoding || 'utf8');
		}
	};

	return {
		log (level, msg, tags) {
			writeLog(level, msg, tags);
		},
		emergency (msg, tags) {
			writeLog('EMERGENCY', msg, tags);
		},
		alert (msg, tags) {
			writeLog('ALERT', msg, tags);
		},
		critical (msg, tags) {
			writeLog('CRITICAL', msg, tags);
		},
		error (msg, tags) {
			writeLog('ERROR', msg, tags);
		},
		warning (msg, tags) {
			writeLog('WARNING', msg, tags);
		},
		notice (msg, tags) {
			writeLog('NOTICE', msg, tags);
		},
		info (msg, tags) {
			writeLog('INFO', msg, tags);
		},
		debug (msg, tags) {
			writeLog('DEBUG', msg, tags);
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
