<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const selectedKeys = ref<string[]>([])
const router = useRouter()
const route = useRoute()
const changeMenu = ({ key }: { key: string }) => {
  router.push(key)
}
watch(
  () => route.path,
  (value) => {
    selectedKeys.value[0] = value
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="index-container">
    <a-layout>
      <a-layout-header class="header">
        <img class="logo" src="/images/logo.jpeg" alt="" />
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
          @click="changeMenu"
        >
          <a-menu-item key="/home">应用中心</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="padding: 0 50px">
        <div class="main">
          <Router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center"> Ant Design ©2018 Created by Ant UED</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped lang="scss">
.header {
  @apply flex items-center gap-[20px];
  .logo {
    height: 100%;
    padding: 10px 0;
  }
}

.main {
  height: 100vh;
  padding: 10px;
}
</style>
