import io from '~node_modules/socket.io-client/dist/socket.io.js';
import Mousetrap from '~node_modules/mousetrap/mousetrap.min.js';
import EventEmitter from '~node_modules/namespace-emitter/index.js';

import CommandBuffer from './vue/CommandBuffer.vue';
import TransmissionPanel from './vue/TransmissionPanel.vue';

import './app.css';

(() =>
{
  const data = {};
  const events = new EventEmitter();
  if(tc.socket.enabled)
  {
    const socket = io(tc.socket.url);
  }
  
  const commandBuffer = document.querySelector('tc-command-buffer');
  
  const canvas = document.querySelector('#display canvas');
  const ctx = canvas.getContext('2d');
  
  Mousetrap.bind('up', () => {events.emit('command:north');});
  Mousetrap.bind('down', () => {events.emit('command:south')});
  Mousetrap.bind('left', () => {events.emit('command:west')});
  Mousetrap.bind('right', () => {events.emit('command:east')});
  Mousetrap.bind('shift+up', () => {events.emit('command:pickup')});
  Mousetrap.bind('shift+down', () => {events.emit('command:drop')});
  Mousetrap.bind('shift+left', () => {events.emit('command:rotate-cc')});
  Mousetrap.bind('shift+right', () => {events.emit('command:rotate-c')});
  Mousetrap.bind('backspace', () => {events.emit('command:delete')});
  Mousetrap.bind('return', () => {events.emit('command:send')});

  events.on('commands:send', (commands) =>
  {
    // TODO: send commands
    console.log(commands);
  });

  window.app =
  {
    init: () =>
    {
      new Vue
      ({
        el: '#app',
        data: data,
        components:
        { 'tj-command-buffer': CommandBuffer
        , 'tj-transmission-panel': TransmissionPanel
        },
        watch:
        {
        },
        methods: 
        {
        }
      });
    },
    events: events
  };
})();

