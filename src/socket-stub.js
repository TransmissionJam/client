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

      return list;
    })());
  });

  function getRandomUser()
  {
    return Math.random() > 0.5 ? 'self' : 'enemy'
  }
};