import { lchmod } from "fs";

export default
function()
{
  const events = window.app.events;
  const _width = 800;
  const _height = 390;
  const xLimit = _width / 10;
  const yLimit = _height / 10;

  events.on('commands:send', (commands) =>
  {
    events.emit('transmission:buffer', (()=>
    {
      let list = [];
      commands.forEach((command) =>
      {
        list.push({user: getRandomUser(), command: command});
      });

      setTimeout(commandsSent.bind(list), 3000);

      return list;
    })());
  });

  function commandsSent()
  {
    events.emit('transmission:buffer:flush');

    setTimeout(commandsExecuted.bind(this), 1000);
  }

  function commandsExecuted()
  {
    events.emit('transmission:executed', ((commands) =>
    {
      let list = [];
      commands.forEach((command) =>
      {
        list.push({user: command.user, command: command.command, executed: getRandomExecuted()});
      });

      return list;
    })(this));

    events.emit('world:update',(()=>
    {
      let data = [];
      let player = false;
      let enemy = false;

      for(let i = 0; i < xLimit * yLimit; ++i)
      {
        let slot = Math.random();

        if(slot > 0.97)
        {
          if(slot > 0.99)
          {
            if(!player)
            {
              // player
              data.push({type:'self', orientation: getRandomOrientation()});
              player = true;
            }
            else if(!enemy)
            {
              // enemy
              data.push({type:'enemy', orientation: getRandomOrientation()});
              enemy = true;
            }
          }
          else
          {
            // resource
            data.push({type:'resource', value: 1});
          }
        }
        else
        {
          // empty
          data.push(0);
        }
      }

      return data;
    })());
  }

  function getRandomUser()
  {
    return Math.random() > 0.5 ? 'self' : 'enemy'
  }

  function getRandomExecuted()
  {
    return Math.random() > 0.5
  }

  function getRandomOrientation()
  {
    let orientations = ['n','s','w','e'];
    let orientation = Math.round(Math.random() * 3);
    return orientations[orientation];
  }
};