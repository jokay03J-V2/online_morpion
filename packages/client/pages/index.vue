<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const roomsStore = useRoomsStore();
const newRoomName = ref('');

socket.off();

roomsStore.bindEvents();

const handleSubmit = (e: Event) => {
  e.preventDefault();
  const router = useRouter();
  roomsStore.createRoom(newRoomName.value);
  socket.once('rooms:created', (gameId: string) => {
    router.push('/game/' + gameId);
  })
}
</script>
<template>
  <section class="flex flex-col items-center px-1">
    <h1 class="w-full text-3xl shadow-md mb-2">Accueil</h1>
    <form @submit="handleSubmit" class="flex items-center gap-1">
      <input type="text" v-model="newRoomName" class="border border-black p-1">
      <input type="submit" value="Crée" class="border border-black p-1">
    </form>
    <ul>
      <li v-for="room in roomsStore.rooms">
        {{ room.label }}
      </li>
    </ul>
  </section>
</template>