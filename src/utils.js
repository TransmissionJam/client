export default
{
  getCommandType: (command) =>
  {
    type = '';

    switch(command)
    {
      case 'north':
      case 'south':
      case 'west':
      case 'east':
      {
        type = 'direction';
      } break;

      case 'rotate-c':
      case 'rotate-cc':
      {
        type = 'rotation';
      } break;
    }

    return type;
  }
}