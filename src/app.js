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
          const xLimit = _width / 10;
          const yLimit = _height / 10;

          const orientationMap =
          {
            's' : 0,
            'n': 1,
            'e': -0.5,
            'w': 0.5
          };

          canvas.width = _width;
          canvas.height = _height;

          function render(data)
          {
            ctx.clearRect(0, 0, _width, _height);
            drawWorld(data);
            drawGrid();
          }

          function drawWorld(data)
          {
            let resource = [];
            let enemy = [];
            let player = [];

            for(let i = 0; i < data.length; ++i)
            {
              let x = i % xLimit * 10;
              let y = Math.floor(i / xLimit) * 10;

              switch(data[i].type)
              {
                case 'self':
                {
                  player.push({x: x, y: y, orientation: data[i].orientation});
                } break;

                case 'enemy':
                {
                  enemy.push({x: x, y: y, orientation: data[i].orientation});
                } break;

                case 'resource':
                {
                  resource.push({x: x, y: y});
                } break;
              }
            }

            ctx.beginPath();
            for(let i = 0; i < resource.length; ++i)
            {
              ctx.rect(resource[i].x, resource[i].y, 10, 10);
            }

            ctx.fillStyle = '#ffbf00';
            ctx.fill();

            ctx.beginPath();
            for(let i = 0; i < enemy.length; ++i)
            {
              ctx.save();
              ctx.translate(enemy[i].x + 5, enemy[i].y + 5);
              ctx.rotate(Math.PI * orientationMap[enemy[i].orientation]);
              ctx.moveTo(-5, -5);
              ctx.lineTo(5, -5);
              ctx.lineTo(0, 5);
            }

            ctx.fillStyle = '#f90050';
            ctx.fill();
            ctx.restore();

            // player
            ctx.beginPath();
            for(let i = 0; i < player.length; ++i)
            {
              ctx.save();
              ctx.translate(player[i].x + 5, player[i].y + 5);
              ctx.rotate(Math.PI * orientationMap[player[i].orientation]);
              ctx.moveTo(-5, -5);
              ctx.lineTo(5, -5);
              ctx.lineTo(0, 5);
            }

            ctx.fillStyle = '#49f900';
            ctx.fill();
            ctx.restore();
          }

          function drawGrid()
          {
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

          render([]);

          events.on('world:update', render);

          if(window.location.search)
          {
            var namespace;

            var tokens = window.location.search.substring(1).split('&');
            for(var i = 0; i < tokens.length; ++i)
            {
              var keyValue = tokens[i].split('=');

              switch(keyValue[0])
              {
                case 'nps':
                {
                  namespace = keyValue[1];
                } break;
              }
            }

            if(namespace)
            {
              let socket = io(window.location.hostname + ':50001/' + namespace);
            }
          }
        }
      });
    },
    events: events
  };

  new Howl({
    src: ['/audio/bg-loop.mp3']
  }).play();

  stub();
})();

