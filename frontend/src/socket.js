import { io } from 'socket.io-client';
import { SOCKET_URL } from './config';

// Connect backend socket on port 5001
const socket = io(SOCKET_URL, {
    autoConnect: true
});

export default socket;
