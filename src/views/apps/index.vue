<script setup lang="ts"></script>

<template>
  <section class="card" @click="$router.push({ name: 'VideoTransformDemo' })">
    <img src="/images/logo.jpeg" alt="" />
  </section>
</template>

<style scoped lang="scss">
.card {
  @apply w-[300px] h-[200px] rounded-xl overflow-hidden shadow duration-300 cursor-pointer;
  &:hover {
    @apply shadow-xl;
    img {
      transform: scale(1.1);
    }
  }

  img {
    @apply w-full h-full duration-200 object-cover;
  }
}
</style>
