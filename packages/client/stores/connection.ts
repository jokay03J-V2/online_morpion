export interface Connection {
    status: 'online' | 'pending' | 'offline'
}

export const useConnectionStore = defineStore('connectionState', {
    state: (): Connection => ({
        status: 'offline'
    }),
    actions: {
        bindEvents() {
            socket.on("connect", () => {
                this.status = "online";
            });
        }
    }
});