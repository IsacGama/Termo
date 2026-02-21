<template>
  <div
    :class="[
      sizeClass,
      'flex items-center justify-center',
      'rounded-lg font-bold uppercase font-serif',
      'border-2 transition-colors duration-300 select-none cursor-pointer',
      tileClass,
      { 'animate-pop': shouldPop },
      { 'animate-flip': shouldFlip },
      { 'animate-bounce-win': shouldBounce },
      { 'animate-pulse-cursor': isActive && !evaluation },
    ]"
    @click="$emit('select', colIndex)"
  >
    {{ letter }}
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  letter: { type: String, default: '' },
  evaluation: { type: String, default: null },
  isActive: { type: Boolean, default: false },
  colIndex: { type: Number, default: 0 },
  shouldFlipRow: { type: Boolean, default: false },
  isSolved: { type: Boolean, default: false },
  size: { type: String, default: 'normal' },
})

defineEmits(['select'])

const shouldPop = ref(false)
const shouldFlip = ref(false)
const shouldBounce = ref(false)

watch(() => props.letter, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    shouldPop.value = true
    setTimeout(() => { shouldPop.value = false }, 100)
  }
})

watch(() => props.shouldFlipRow, (val) => {
  if (val && props.evaluation) {
    setTimeout(() => {
      shouldFlip.value = true
      setTimeout(() => { shouldFlip.value = false }, 600)
    }, props.colIndex * 250)
  }
})

const sizeClass = computed(() => {
  if (props.size === 'quarteto') return 'w-7 h-7 text-[10px] lg:w-9 lg:h-9 lg:text-sm xl:w-10 xl:h-10 xl:text-base'
  if (props.size === 'dueto') return 'w-10 h-10 text-base sm:w-9 sm:h-9 sm:text-sm md:w-11 md:h-11 md:text-base lg:w-12 lg:h-12 lg:text-lg'
  return 'w-[52px] h-[52px] text-xl sm:w-[58px] sm:h-[58px] sm:text-2xl md:w-16 md:h-16'
})

const tileClass = computed(() => {
  if (props.isSolved && props.evaluation) {
    return evalColorClass(props.evaluation) + ' opacity-60'
  }
  if (props.evaluation) return evalColorClass(props.evaluation)
  if (props.isActive) return 'bg-tile-active border-blue-400 dark:border-blue-500 text-gray-900 dark:text-white'
  if (props.letter) return 'bg-tile-empty border-gray-400 dark:border-gray-500 text-gray-900 dark:text-white'
  return 'bg-tile-empty border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
})

function evalColorClass(evaluation) {
  if (evaluation === 'correct') return 'bg-correct text-white border-correct'
  if (evaluation === 'incorrect') return 'bg-incorrect text-white border-incorrect'
  if (evaluation === 'absent') return 'bg-absent text-white border-absent'
  return ''
}
</script>
