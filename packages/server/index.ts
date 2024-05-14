import { createServer } from "http";
import { Server } from "socket.io";
import { logger } from "./utils/logger";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: { origin: '*' }
});

let rooms = { "test": { label: "test" } };

io.on("connection", (socket) => {
    logger.info('New connection ' + socket.id);
    socket.emit('party:allRooms', Object.keys(rooms));

    socket.on("rooms:getAll", () => {
        const roomsRes = Object.keys(rooms)
            .map((id) => {
                return { ...rooms[id], id }
            });

        socket.emit("rooms:getAll", roomsRes);
    });

    socket.on('rooms:create', (label: string) => {
        const roomId = crypto.randomUUID();
        rooms[roomId] = { label };
        io.emit("rooms:getAll", rooms);
        socket.emit('rooms:created', roomId);
    })
});

httpServer.listen(8000, () => {
    logger.info('Listen at 8000');
});