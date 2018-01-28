import io from '~node_modules/socket.io-client/dist/socket.io.js';
import Mousetrap from '~node_modules/mousetrap/mousetrap.min.js';
import EventEmitter from '~node_modules/namespace-emitter/index.js';

import CommandBuffer from './vue/CommandBuffer.vue';
import TransmissionPanel from './vue/TransmissionPanel.vue';

import './app.css';

import stub from './socket-stub.js';

(() =>
{
  const data = {};
  const events = new EventEmitter();
  if(tc.socket.enabled)
  {
    const socket = io(tc.socket.url);
  }
  
  Mousetrap.bind('up', () => {events.emit('command:north');});
  Mousetrap.bind('down', () => {events.emit('command:south')});
  Mousetrap.bind('left', () => {events.emit('command:west')});
  Mousetrap.bind('right', () => {events.emit('command:east')});
  Mousetrap.bind('shift+up', () => {events.emit('command:pickup')});
  Mousetrap.bind('shift+down', () => {events.emit('command:drop')});
  Mousetrap.bind('shift+left', () => {events.emit('command:rotate-cc')});
  Mousetrap.bind('shift+right', () => {events.emit('command:rotate-c')});
  Mousetrap.bind('backspace', () => {events.emit('command:delete')});
  Mousetrap.bind('space', () => {events.emit('command:scan')});
  Mousetrap.bind('return', () => {events.emit('command:send')});

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
        },
        mounted: function()
        {
          const canvas = document.querySelector('#display canvas');
          const ctx = canvas.getContext('2d');

          const _width = 800;
          const _height = 390;

          canvas.width = _width;
          canvas.height = _height;

          function render()
          {
            ctx.clearRect(0, 0, _width, _height);
            drawGrid();

            requestAnimationFrame(render);
          }

          function drawGrid()
          {
            let xLimit = _width / 10;
            let yLimit = _height / 10;

            ctx.strokeStyle = '#ff1177';
            ctx.lineWidth = 0.5;
            ctx.beginPath();

            for(let i = 1; i < xLimit; ++i)
            {
              ctx.moveTo(i * 10, 0);
              ctx.lineTo(i * 10, _height);
            }

            for(let i = 1; i < yLimit; ++i)
            {
              ctx.moveTo(0, i * 10);
              ctx.lineTo(_width, i * 10);
            }

            ctx.stroke();
          }

          render();
        }
      });
    },
    events: events
  };

  stub();
})();

