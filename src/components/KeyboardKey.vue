<template>
  <button
    :class="[
      'rounded-md font-semibold transition-colors duration-200 select-none overflow-hidden',
      'h-12 sm:h-14 flex items-center justify-center',
      isWide ? 'px-3 sm:px-4 text-xs sm:text-sm' : 'w-8 sm:w-10 text-sm sm:text-base',
      keyClass,
    ]"
    :style="keyStyle"
    @click="$emit('press')"
  >
    <slot>{{ letter }}</slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  letter: { type: String, default: '' },
  boardStatuses: { type: Array, default: () => [] },
  gameMode: { type: String, default: 'classic' },
  isWide: { type: Boolean, default: false },
})

defineEmits(['press'])

function statusColor(status) {
  if (status === 'correct') return 'var(--game-correct)'
  if (status === 'incorrect') return 'var(--game-incorrect)'
  if (status === 'absent') return 'var(--game-absent)'
  return 'var(--game-key-bg)'
}

const hasAnyStatus = computed(() =>
  props.boardStatuses.length > 0 && props.boardStatuses.some(s => s !== null)
)

const keyClass = computed(() => {
  if (hasAnyStatus.value) return 'text-white border border-white/20'
  return 'bg-key-bg text-gray-900 dark:text-white hover:opacity-80'
})

const keyStyle = computed(() => {
  if (!hasAnyStatus.value) return {}

  const statuses = props.boardStatuses
  const colors = statuses.map(s => statusColor(s))

  if (colors.length === 1) {
    // Classic - solid color
    return { backgroundColor: colors[0] }
  }

  if (colors.length === 2) {
    // Dueto - vertical split (left = board 0, right = board 1)
    return {
      background: `linear-gradient(to right, ${colors[0]} 50%, ${colors[1]} 50%)`,
    }
  }

  if (colors.length === 4) {
    // Quarteto - 2x2 quadrants (TL=0, TR=1, BL=2, BR=3)
    return {
      backgroundImage: `linear-gradient(to right, ${colors[0]} 50%, ${colors[1]} 50%), linear-gradient(to right, ${colors[2]} 50%, ${colors[3]} 50%)`,
      backgroundSize: '100% 50%',
      backgroundPosition: 'top, bottom',
      backgroundRepeat: 'no-repeat',
    }
  }

  return {}
})
</script>
