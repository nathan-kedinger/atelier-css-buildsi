<script setup lang="ts">
import NavigationBar from "@/components/layout/NavigationBar.vue";
import { routesList } from '@/const/routes'
</script>

<template>
<!--  <Dialog v-model:visible="visible" modal header="test"
          @after-hide="close(true)"
  >-->
  <NavigationBar :title :items="routesList"/>

  <router-view v-slot="{ Component }">
    <div class="h-[calc(100dvh-42px-16px)] mt-4 overflow-clip mx-4">
      <component :is="Component" />
    </div>
  </router-view>


  <!--  </Dialog>-->
</template>

<style scoped>
</style>
