const rollup = require('rollup');
const LocalWebServer = require('local-web-server');
const chalk = require('chalk');
const moment = require('moment');
const argv = require('yargs').argv;
const fs = require('fs');

const options = require('../rollup.config.js');
const watcher = rollup.watch(options);
require('./link-libs.js');

var _initialBuild = false;

var timer =
(function()
{
  var start = 0;

  return {
    start: function()
    {
      start = Date.now();
    },
    stop: function()
    {
      var now = Date.now();
      var diff = now - (start != -1 ? start : now);
      start = -1;
      return diff != 0 ? chalk.yellow(diff + 'ms') : chalk.red('0ms'); 
    }
  }
})();

watcher.on('event', function(event)
{
  switch(event.code)
  {
    case 'START':
    {
      if(!_initialBuild)
      {
        timer.start();
        console.log(`${timestamp() + chalk.red('Rollup')} initial build...`);
      }
      else
      {
        timer.start();
        console.log(`${timestamp() + chalk.red('Rollup')} rebuilding...`);
      }
    } break;

    case 'END':
    {
      console.log(`${timestamp() + chalk.red('Rollup')} build ${chalk.green('finished')} ${timer.stop()}`);
      if(!_initialBuild)
      {
        _initialBuild = true;
        startServer();
        if(!argv.watch)
        {
          watcher.close();
        }
      }
    } break;

    case 'ERROR':
    case 'FATAL':
    {
      console.log(`${chalk.red('Error: ')} ${event.error}`);
      console.log(event.error);
    } break;
  }
});

function startServer()
{
  const localWebServer = new LocalWebServer();

  const server = localWebServer.listen
  ({
    port: 80
  , directory: 'public'
  // , rewrite:
  //   [
  //     { from: '/lib/susjs/dist/*'
  //     , to: '/dist/$1'
  //     }
  //   ]
  });

  console.log(`${timestamp()}server running ${chalk.yellow('@')} ${chalk.green('http://localhost/')}`);
}

function timestamp()
{
  return chalk.yellow(moment().format('HH:mm:ss '));
}