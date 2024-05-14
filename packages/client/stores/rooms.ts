export interface Room {
    id: string;
    label: string;
}

export interface RoomsI {
    rooms: Room[]
}

export const useRoomsStore = defineStore('rooms', {
    state: (): RoomsI => ({ rooms: [] }),
    actions: {
        bindEvents() {
            socket.on('connect', () => {
                // ask all rooms
                socket.emit('rooms:getAll');
                // update state when all rooms are got
                socket.on('rooms:getAll', (rooms: Room[]) => {
                    this.rooms = rooms;
                });
            })
        },
        createRoom(name: string) {
            socket.emit('rooms:create', name);
        }
    }
});