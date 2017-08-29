const fs = require('fs');
const test = require('tape');
const logger = require('../lib')('./test.log', {
	logLevel: 'WARNING',
	timestamp: 'YYYY-MM-DD HH:mm:ss.ms'
}, {
	app: 'test'
});

fs.writeFileSync('./test.log', '', {
	flag: 'w+'
});

test('adds a log entry depending on log level', (t) => {
	logger.log('EMERGENCY', 'adds a log entry');
	logger.log('DEBUG', 'does not add a log entry');
	logger.emergency('adds a log entry');
	logger.alert('adds a log entry');
	logger.critical('adds a log entry');
	logger.error('adds a log entry');
	logger.warning('adds a log entry');
	logger.notice('does not add a log entry');
	logger.info('does not add a log entry');
	logger.debug('does not add a log entry');

	const stream = fs.createReadStream('./test.log', { flags: 'r+' });
	let buf = '';
	let count = 0;

	stream.on('data', (chunk) => {
		buf += chunk;
		if (buf[buf.length - 1] !== '\n') return;
		buf.split('\n').map((line) => {
			if (!line.length) return false;
			try {
				const data = JSON.parse(line);

				t.equal(data._app, 'test');
				t.ok(data.timestamp.indexOf(/[0-9]{4}-[0-9]{2}-[0-9]{2}/));

				if (data.short_message === 'adds a log entry') count++;
			} catch (err) {
				// Do nothing
			}

			return true;
		});
		buf = '';
	});

	stream.on('end', () => {
		t.equal(count, 6);
		t.end();
	});
});
