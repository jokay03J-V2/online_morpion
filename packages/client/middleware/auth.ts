function isAuthenticated(): boolean {
    const userStore = useUserStore();
    return userStore.username.length > 0;
}
export default defineNuxtRouteMiddleware((to, from) => {
    if (!isAuthenticated()) {
        return navigateTo('/login')
    }
})
