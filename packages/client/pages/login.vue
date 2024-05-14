<script setup lang="ts">
const userStore = useUserStore();
const usernameRef = ref('');

const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!usernameRef.value) return;
    userStore.username = usernameRef.value;
    const router = useRouter();
    router.push('/');
}
</script>
<template>
    <form class="mx-auto flex flex-col items-center" @submit="handleSubmit">
        <input type="text" v-model="usernameRef" class="border border-black">
        <input type="submit" value="Envoyer">
    </form>
</template>
<style></style>