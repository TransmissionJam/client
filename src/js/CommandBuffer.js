export default
function CommandBuffer(events)
{
  const _instance = this;
  const _events = events;
  const _limit = 8;
  const _buffer = [];

  

  _instance.send = () =>
  {
    _events.emit('commands:send', _buffer.clone());
    _buffer.length = 0;
  }
}