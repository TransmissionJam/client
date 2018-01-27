import io from '~node_modules/socket.io-client/dist/socket.io.js';

import '../css/app.css'

if(tc.socket.enabled)
{
  const socket = io(tc.socket.url);
}
