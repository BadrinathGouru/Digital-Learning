import { io } from 'socket.io-client';

// Connect backend socket on port 5001
const socket = io('http://localhost:5001', {
    autoConnect: true
});

export default socket;
