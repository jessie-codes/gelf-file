# gelf-file

[![NPM](https://nodei.co/npm/gelf-file.png?compact=true)](https://nodei.co/npm/gelf-file/)

[![Greenkeeper badge](https://badges.greenkeeper.io/jessie-codes/gelf-file.svg)](https://greenkeeper.io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.org/jessie-codes/gelf-file.svg?branch=master)](https://travis-ci.org/jessie-codes/gelf-file)
[![Coverage Status](https://coveralls.io/repos/github/jessie-codes/gelf-file/badge.svg?branch=master)](https://coveralls.io/github/jessie-codes/gelf-file?branch=master)

Gelf formatted log files.

## Installation

```bash
npm install gelf-file
```

## Arguments

+ **file** `String`: The path for the log file.
+ **opts** `Object`:
	+ **logLevel** : The log level for the application.
	+ **timestamp** The format for the timestamp. See [time-stamp](https://www.npmjs.com/package/time-stamp)
+ **args** `Object` : An object containing parameters that should be added to each log entry.

## Log Levels

 Mirror that of syslog:
 
  - `0` `EMERGENCY`   system unusable
  - `1` `ALERT`       immediate action required
  - `2` `CRITICAL`    condition critical
  - `3` `ERROR`       condition error
  - `4` `WARNING`     condition warning
  - `5` `NOTICE`      condition normal, but significant 
  - `6` `INFO`        a purely informational message
  - `7` `DEBUG`       debugging information

## Usage

```javascript
const logger = require('gelf-file')('./app.log', {logLevel: 'WARNING'}, {app: 'my-app'});
logger.log('DEBUG', 'started app');
```

## API

### Parameters
+ **logLevel** `String` - The desired log level. Valid values are listed in the log level list above.
+ **message** `String` - The log message.
+ **tags** `Object` - Additional information to store with the log message.

### Functions
+ `log(logLevel, message, tags)` - Creates a log entry for the desired log level.
+ `emergency(message, tags)` - Creates an emergency log entry.
+ `alert(message, tags)` - Creates an alert log entry.
+ `critical(message, tags)` - Creates an critical log entry.
+ `error(message, tags)` - Creates an error log entry.
+ `warning(message, tags)` - Creates an warning log entry.
+ `notice(message, tags)` - Creates an notice log entry.
+ `info(message, tags)` - Creates an info log entry.
+ `debug(message, tags)` - Creates an debug log entry.

## Inspiration

This project was inspired by [log](https://www.npmjs.com/package/log)