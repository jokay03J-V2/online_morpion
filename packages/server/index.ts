import { createServer } from "http";
import { Server } from "socket.io";
import { logger } from "./utils/logger";
import { generateTiles } from "./utils/generateTiles";

interface Room {
    members: string[];
    label: string;
    tiles: null[][];
}

interface Rooms {
    [x: string]: Room
}

const MAX_PER_ROOM = 2;

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: { origin: '*' }
});

let rooms: Rooms = {};

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
        rooms[roomId] = { label, members: [socket.id], tiles: generateTiles(3, 3) };
        io.emit("rooms:getAll", rooms);
        socket.emit('rooms:created', roomId);
        socket.join(roomId);
    });

    socket.on('room:join', (roomId: string) => {
        if (!rooms[roomId] || rooms[roomId].members.length === MAX_PER_ROOM) return socket.emit('room:error', 'The room is full !');

        socket.join(roomId);
        socket.emit('room:ready', rooms[roomId]);
    });
});

httpServer.listen(8000, () => {
    logger.info('Listen at 8000');
});