<template>
  <div id="transmission-panel">
    <div class="panel" id="buffer">
      <div class="label">
        BUFFER
      </div>
      <div
        v-for="(command, i) in buffer"
        v-bind:key="i"
        :class="['command', command.type, command.user, command.command]"
      >
        <div class="icon"></div>
        <div class="indicator"></div>
      </div>
    </div>
    <div class="panel"  id="executed">
      <div class="label">
        EXECUTED
      </div>
      <div
        v-for="(command, i) in executed"
        v-bind:key="i"
        :class="['command', command.type, command.user, command.command]"
      >
        <div class="indicator"></div>
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
      executed: []
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
  border-radius: 3px;
  user-select: none;
  padding: 10px;
  border: solid #6f6f6f 3px;
  padding-top: 60px;
}

#transmission-panel .command
{
  width: 30px;
  height: 30px;
  margin: 3px;
  position: relative;
  float: none;
}

#transmission-panel .panel
{
  background-color: rgb(22, 18, 18);
  -webkit-box-shadow: inset 5px 5px 20px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: inset 5px 5px 20px -6px rgba(0,0,0,0.75);
  box-shadow: inset 5px 5px 20px -6px rgba(0,0,0,0.75);
  width: 50px;
  height: 100%;
  padding-left: 30px;
  padding-top: 10px;
  float: left;
  position: relative;
}

#transmission-panel .panel .label
{
  font-family: 'Bungee', cursive;
  color: #fff;
  position: absolute;
  left: 20px;
  top: -30px;
  transform: rotateZ(-30deg);
  font-size: 12px;
  transform-origin: bottom left;
}

#transmission-panel .command .indicator
{
  width: 10px;
  height: 10px;
  position: absolute;
  left: -20px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  border-radius: 50%;
}

#transmission-panel .command.self .indicator
{
  background-color: rgb(0, 153, 0);
}

#transmission-panel .command.enemy .indicator
{
  background-color: rgb(172, 0, 0);
}
</style>