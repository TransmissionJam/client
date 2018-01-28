<template>
  <div id="command-buffer">
    <div id="buffer">
      <div
        v-for="(command, i) in commands"
        v-bind:key="i"
        :class="['command', command.type, command.command]"
      >
        <div class="icon"></div>        
      </div>
    </div>
    <div
      id="send"
      v-on:click="send"
      :disabled="empty"
    >
      SEND
    </div>
  </div>
</template>
<script>
import Notfy from '~node_modules/notyf/dist/notyf.min.js';
const _notfy = new Notyf();
import utils from '../utils.js';

export default
{
  name: "tj-command-buffer",
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
      let type = utils.getCommandType(command);

      if(instance.commands.length >= 8 && type != '')
      {
        _notfy.alert('You can queue up to 8 commands at a time! Send it or delete a few commands.');
        return false;
      }

      switch(command)
      {
        case 'delete':
        {
          instance.commands.pop();
        } break;

        case 'send':
        {
          if(instance.commands.length == 0)
          {
            return false;
          }

          window.app.events.emit('commands:send',((commands)=>
          {
            let list = [];
            commands.forEach((command) =>
            {
              list.push(command.command);
            });
            return list;
          })(instance.commands));
          instance.commands.splice(0);
          _notfy.confirm('Commands sent to buffer!');
        } break;

        default:
        {
          instance.commands.push({command:command,type:type});
        } break;
      }
    });
  },
  methods:
  {
    send: function()
    {
      window.app.events.emit('command:send');
    }
  },
  computed:
  {
    empty: function()
    {
      return this.commands.length == 0;
    }
  }
}
</script>
<style lang="css" scoped>
#command-buffer
{
  height: 50px;
  width: 400px;
  background-color: rgb(22, 18, 18);
  -webkit-box-shadow: inset 5px 5px 20px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: inset 5px 5px 20px -6px rgba(0,0,0,0.75);
  box-shadow: inset 5px 5px 20px -6px rgba(0,0,0,0.75);
  border-radius: 3px;
  user-select: none;
}

#command-buffer .command
{
  width: 44px;
  height: 44px;
  margin: 3px;
  float: left;
}

#send
{
  font-family: 'Bungee', cursive;
  background-color: #829d51;
  color: #e8d8a8;
  width: 50px;
  height: 50px;
  position: absolute;
  right: -75px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  border-radius: 3px;
  -webkit-box-shadow: 5px 5px 20px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: 5px 5px 20px -6px rgba(0,0,0,0.75);
  box-shadow: 5px 5px 20px -6px rgba(0,0,0,0.75);
  cursor: pointer;
}

#send[disabled]
{
  background-color: rgb(54, 50, 50);
  cursor: not-allowed;
}
</style>
