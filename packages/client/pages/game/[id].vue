<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
const route = useRoute();
const morpionStore = useMorpionStore();

socket.off();

morpionStore.bindEvents();
morpionStore.joinRoom(route.params.id as string);
</script>
<template>
    {{ $route.params.id }}
</template>