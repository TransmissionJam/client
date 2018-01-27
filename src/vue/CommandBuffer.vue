<template>
  <div id="command-buffer">
    <div id="buffer">
      <div
        v-for="(command, i) in commands"
        v-bind:key="i"
        :class="['command', command.type, command.command]"
      >
      </div>
    </div>
    <div id="send">

    </div>
  </div>
</template>
<script>
export default
{
  name: "tc-command-buffer",
  data: function()
  { return {
      commands: []
    }
  },
  props: {
  },
  mounted: function()
  {
    let instance = this;

    window.app.events.on('command', function()
    {
      let command = this.event.match(/command:(.+)/)[1];
      let type = '';

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

      switch(command)
      {
        case 'delete':
        {
          //commandBuffer.delete();
        } break;

        case 'send':
        {
          //commandBuffer.send();
        } break;

        default:
        {
          instance.commands.push({command:command,type:type});
        } break;
      }
    });
  }
}
</script>
<style lang="css" scoped>
#command-buffer
{
  height: 50px;
  width: 500px;
  background-color: rgba(255,255,255,0.5);
}

#command-buffer .command
{
  width: 50px;
  height: 50px;
  background-size: contain;
  float: left;
}

#command-buffer .command.direction
{
  background-image: url(images/command-arrow.png);
}

#command-buffer .command.rotation
{
  background-image: url(images/command-rotate.png);
}

#command-buffer .command.south
{
  transform: rotateZ(180deg);
}

#command-buffer .command.west
{
  transform: rotateZ(-90deg);
}

#command-buffer .command.east
{
  transform: rotateZ(90deg);
}

#command-buffer .command.rotate-c
{
  transform: scaleX(-1);
}
</style>
