const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket сервер запущен на порту ${PORT}`);

wss.on('connection', (ws) => {
    console.log('Кто-то зашел на улицу!');

    ws.on('message', (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(data.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('Кто-то ушел с улицы.');
    });
});