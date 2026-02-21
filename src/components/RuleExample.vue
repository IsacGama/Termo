<template>
  <div class="flex justify-center gap-1 my-2">
    <div
      v-for="(letter, i) in word.split('')"
      :key="i"
      :class="[
        'w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center',
        'rounded-md text-sm sm:text-base font-bold uppercase text-white',
        i === highlight ? statusClass : 'bg-gray-500',
      ]"
    >
      {{ letter }}
    </div>
  </div>
  <p class="text-sm text-gray-700 dark:text-gray-300 text-center mb-3">
    A letra <span :class="['font-bold px-1 rounded', textStatusClass]">{{ word[highlight] }}</span>
    {{ description }}
  </p>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  word: { type: String, required: true },
  highlight: { type: Number, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
})

const statusClass = computed(() => ({
  correct: 'bg-correct',
  incorrect: 'bg-incorrect',
  absent: 'bg-absent',
})[props.status])

const textStatusClass = computed(() => ({
  correct: 'text-correct',
  incorrect: 'text-incorrect',
  absent: 'text-absent',
})[props.status])
</script>
