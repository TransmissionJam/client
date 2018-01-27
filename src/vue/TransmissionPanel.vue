<template>
  <div id="transmission-panel">
    <div id="buffer">
      <div
        v-for="(command, i) in buffer"
        v-bind:key="i"
        :class="['command', command.type, command.user, command.command]"
      >
      </div>
    </div>
    <div id="sent">
      <div
        v-for="(command, i) in sent"
        v-bind:key="i"
        :class="['command', command.type, command.user, command.command]"
      >
      </div>
    </div>
  </div>
</template>
<script>
import utils from '../utils.js';

export default
{
  name: "tj-transmission-panel",
  data: function()
  { return {
      buffer: [],
      sent: []
    }
  },
  props:{
  },
  mounted: function()
  {
    let instance = this;

    window.app.events.on('transmission:buffer', (commands) =>
    {
      instance.buffer.splice(0);

      commands.forEach((command) =>
      {
        instance.buffer.push
        ({
          user: command.user,
          type: utils.getCommandType(command.command),
          command: command.command
        });
      })
    });
  }
}
</script>
<style lang="css" scoped>
#transmission-panel
{
  width: 200px;
  height: 400px;
  background-color: rgb(22, 18, 18);
  -webkit-box-shadow: inset 5px 5px 20px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: inset 5px 5px 20px -6px rgba(0,0,0,0.75);
  box-shadow: inset 5px 5px 20px -6px rgba(0,0,0,0.75);
  border-radius: 3px;
  user-select: none;
}

#transmission-panel .command
{
  width: 20px;
  height: 20px;
  margin: 3px;
  background-size: contain;
}

#transmission-panel .command.direction
{
  background-image: url(images/command-arrow.png);
}

#transmission-panel .command.rotation
{
  background-image: url(images/command-rotate.png);
}

#transmission-panel .command.south
{
  transform: rotateZ(180deg);
}

#transmission-panel .command.west
{
  transform: rotateZ(-90deg);
}

#transmission-panel .command.east
{
  transform: rotateZ(90deg);
}

#transmission-panel .command.rotate-c
{
  transform: scaleX(-1);
}

#transmission-panel .command.pickup
{
  background-image: url(images/command-pickup.png);
}

#transmission-panel .command.drop
{
  background-image: url(images/command-drop.png);
}
</style>