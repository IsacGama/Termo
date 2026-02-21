<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="game.state.toast"
        class="fixed top-20 left-1/2 -translate-x-1/2 z-[60]
               bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900
               px-6 py-3 rounded-xl shadow-lg font-medium text-sm"
      >
        {{ game.state.toast }}
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { inject } from 'vue'

const game = inject('game')
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -10px);
}
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}
</style>
