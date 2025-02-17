<script setup lang="ts">
const postStore = usePostStore();
const isLoading = ref(false);

function getPosts() {
  isLoading.value = true;
  postStore
    .getPosts()
    .then(() => {
      isLoading.value = false;
    })
    .catch(() => {
      isLoading.value = false;
    });
}

getPosts();
</script>

<template>
  <div>{{ postStore.posts }}</div>
</template>
