import io from 'socket.io-client';

const wsUrl = process.env.REACT_APP_WS_URL as string;

export const socket = io(wsUrl)