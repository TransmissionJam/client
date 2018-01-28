export default
function()
{
  const events = window.app.events;

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
  }

  function getRandomUser()
  {
    return Math.random() > 0.5 ? 'self' : 'enemy'
  }

  function getRandomExecuted()
  {
    return Math.random() > 0.5
  }
};