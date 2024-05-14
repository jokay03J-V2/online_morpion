interface Member {
    username: string
}

export interface State {
    party: {
        members: Member[],
        tiles: null[][]
    },
}

export const useMorpionStore = defineStore("morpion", {
    state: (): State => ({
        party: {
            members: [],
            tiles: [...Array(3).fill([...Array(3).fill(null)])]
        },
    }),
    actions: {
        bindEvents() {
            socket.on('connect', () => {
                socket.on('room:ready', (state: State) => {

                });
            });
        },
        joinRoom(gameId: string) {
            socket.emit('room:join', gameId);
        }
    }
})