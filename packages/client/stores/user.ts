export const useUserStore = defineStore('user', {
    state: () => ({
        username: ""
    }),
    actions: {
        setUsername(username: string) {
            this.username = username;
        }
    }
});