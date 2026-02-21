<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        @click.self="$emit('update:modelValue', false)"
      >
        <div class="bg-surface dark:bg-surface rounded-2xl p-6 mx-4 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div {
  transform: scale(0.95);
}
.modal-leave-to > div {
  transform: scale(0.95);
}
</style>
