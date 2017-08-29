# gelf-file

[![Greenkeeper badge](https://badges.greenkeeper.io/jessie-codes/gelf-file.svg)](https://greenkeeper.io/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.org/jessie-codes/gelf-file.svg?branch=master)](https://travis-ci.org/jessie-codes/gelf-file)
[![npm version](https://badge.fury.io/js/gelf-file.svg)](https://badge.fury.io/js/gelf-file)

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

## Functions

+ `log(logLevel, message)` - Creates a log entry for the desired log level.
+ `emergency(message)` - Creates an emergency log entry.
+ `alert(message)` - Creates an alert log entry.
+ `critical(message)` - Creates an critical log entry.
+ `error(message)` - Creates an error log entry.
+ `warning(message)` - Creates an warning log entry.
+ `notice(message)` - Creates an notice log entry.
+ `info(message)` - Creates an info log entry.
+ `debug(message)` - Creates an debug log entry.