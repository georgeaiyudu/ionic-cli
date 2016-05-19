'use strict';

var rewire = require('rewire');
var helpUtils = rewire('../../lib/utils/help');
var IonicAppLib = require('ionic-app-lib');
var log = IonicAppLib.logging.logger;

describe('printIonic function', function() {
  it('should return an array of strings', function() {
    var printIonic = helpUtils.__get__('printIonic');
    var results = printIonic();

    expect(results).toEqual(jasmine.any(Array));
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toEqual(jasmine.any(String));
  });
});

describe('printTemplate function', function() {
  it('should log an array as a new line seperated string', function() {
    spyOn(log, 'info');
    var printTemplate = helpUtils.__get__('printTemplate');
    printTemplate(['red', 'green', '', null]);

    expect(log.info).toHaveBeenCalledWith('red\ngreen\n\n');
  });
});

describe('printTaskListUsage method', function() {
  it('should call printTaskDetails for all tasks with a summary', function() {
    spyOn(log, 'info');
    spyOn(log, 'error');
    var printTaskRevert = helpUtils.__set__('printTaskDetails', function(param) {
      log.error(param);
    });

    var taskList = [
      {
        name: 'one',
        summary: 'one summary'
      },
      {
        name: 'two',
        summary: 'two summary'
      },
      {
        name: 'three'
      }
    ];
    helpUtils.printTaskListUsage(taskList, 'v2.0.0');
    expect(log.error.calls.length).toEqual(2);
    printTaskRevert();
  });
});

describe('printTaskListShortUsage method', function() {
  it('should log', function() {
    spyOn(log, 'info');
    var taskList = [
      {
        name: 'one',
        summary: 'one summary'
      },
      {
        name: 'two',
        summary: 'two summary'
      },
      {
        name: 'three'
      }
    ];
    helpUtils.printTaskListShortUsage(taskList, 'fudge', 'v2.0.0');
    expect(log.info.calls.length).toEqual(1);
  });
});

describe('printTaskUsage method', function() {
  it('should log info', function() {
    spyOn(log, 'info');
    spyOn(log, 'error');
    var printTaskRevert = helpUtils.__set__('printTaskDetails', function(param) {
      log.error(param);
    });

    helpUtils.printTaskUsage({}, 'v2.0.0');
    expect(log.error.calls.length).toEqual(1);
    printTaskRevert();
  });
});

describe('printTaskDetails function', function() {
  it('should log info', function() {
    spyOn(log, 'info');
    var printTaskDetails = helpUtils.__get__('printTaskDetails');
    printTaskDetails({
      name: 'one',
      title: 'one',
      summary: 'one summary',
      args: {
        '[options]': '',
        '<PLATFORM>': ''
      },
      options: {
        '--livereload-port|-r': 'Live Reload port (35729 default, livereload req.)',
        '--consolelogs|-c': {
          title: 'Print app console logs to Ionic CLI (livereload req.)',
          boolean: true
        }
      }
    });
    expect(log.info).toHaveBeenCalled();
  });
});