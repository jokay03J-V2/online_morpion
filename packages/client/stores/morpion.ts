export interface State {
    party: {
        members: string[],
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

            });
        },
    }
})