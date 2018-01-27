<template>
  <div id="command-buffer">
    <div id="buffer">
      <div
        v-for="(command, i) in commands"
        v-bind:key="i"
        class="command"
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
    mounted: () =>
    {
      let instance = this;
      console.log(this);
      window.app.events.on('command', handleCommand);

      function handleCommand()
      {
        let command = this.event.match(/command:(.+)/)[1];

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
            instance.commands.push(command);
          } break;
        }
      }
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
</style>
