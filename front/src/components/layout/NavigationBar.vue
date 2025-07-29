<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem } from 'primevue/menuitem'

const menu = ref()
const toggle = (event: HTMLElement) => {
  menu.value.toggle(event)
}

const { items, title } = defineProps<{
  items: MenuItem[]
  title: string
}>()

const darkButtonsMenubar = ref({
  root: {
    itemColor: '{gray.200}',
    itemFocusBackground: '{gray.600}',
    itemFocusColor: '{gray.100}',
    baseItemPadding: '9px',
    baseItemBorderRadius: '0',
    color: '{gray.200}'
  }
})
</script>

<template>
  <Menubar
    class="object-fill rounded-none! bg-surface-900! border-none! h-[42px]"
    :model="items"
    :dt="darkButtonsMenubar"
  >
    <template #start>
      <span class="font-medium text-xl mr-8"> Tailwind CSS workshop</span>
    </template>

    <template #item="{ item, props, hasSubmenu, root }">
      <router-link v-if="item.route" v-slot="{ href, navigate, isActive }" :to="item.route" custom>
        <a
          v-ripple
          class="flex items-center m-0"
          :class="isActive ? 'animate-border-in ' : '!text-inherit animate-border-out'"
          v-bind="props.action"
          @click="navigate"
        >
          <span v-if="item.icon" :class="item.icon" class="text-2xl mr-0 pr-0" />
          <span>{{ item.label }}</span>

          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
          >
            {{ item.shortcut }}
          </span>
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down ml-auto',
              { 'pi-angle-down': root, 'pi-angle-right': !root }
            ]"
          ></i>
        </a>
      </router-link>
    </template>

    <template #end>
      <div class="relative inline-block">
        <Avatar
          :dt="{
            root: {
              width: '40px',
              height: '40px',
              iconSize: '24px'
            }
          }"
          style="background-color: #ece9fc; color: #2a1261; cursor: pointer !important"
          shape="circle"
          aria-controls="overlay_menu"
          aria-haspopup="true"
          @click="toggle"
        >
          {{ userInitials }}
        </Avatar>
        <OverlayBadge
          :severity="me?.cuid ? 'success' : 'danger'"
          :dt="{
            root: {
              outline: {
                width: '0px',
                color: '{content.background}'
              },
              dotSize: '16px'
            }
          }"
          class="absolute top-1/4 right-1/2 transform translate-x-4 -translate-y-1"
        />
      </div>
      <Popover
        ref="menu"
        id="overlay_menu"
        :dt="{
          root: {
            contentPadding: '0',
            borderRadius: '4px'
          }
        }"
      >
        <Card
          class="w-80 hi"
          style="width: 20rem; overflow: hidden"
          :dt="{
            root: {
              borderRadius: '4px'
            }
          }"
        >
          <template #title>{{ me?.firstname }} {{ me?.lastname }}</template>
          <template #subtitle>
            <span class="text-xl">Permissions :</span>
            <listbox :options="me?.roles" unstyled />
          </template>
          <template #content>
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur
              error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam
              nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
            </p>
          </template>
          <template #footer>
            <ToggleTheme ref="toggleTheme" class="mt-4 ml-4" />
          </template>
        </Card>
      </Popover>
    </template>
  </Menubar>
</template>

<style scoped>
@keyframes borderAnimationIn {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes borderAnimationOut {
  from {
    width: 100%;
    left: 0;
  }
  to {
    width: 0;
    left: 100%;
  }
}

a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: var(--color-orange-500);
}

.animate-border-in::after {
  width: 100%;
  animation: borderAnimationIn 0.3s forwards;
}

.animate-border-out::after {
  width: 0;
  animation: borderAnimationOut 0.3s forwards;
}
</style>
