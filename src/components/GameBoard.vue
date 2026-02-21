<template>
  <div :class="containerClass">
    <div
      v-for="boardIndex in game.wordCount.value"
      :key="boardIndex - 1"
      :class="[
        'flex flex-col',
        rowGapClass,
        { 'opacity-50': game.state.solvedBoards[boardIndex - 1] },
      ]"
    >
      <!-- Solved indicator -->
      <div
        v-if="game.state.solvedBoards[boardIndex - 1]"
        class="text-center text-correct font-bold text-xs mb-1"
      >
        ✓ Acertou!
      </div>

      <GameRow
        v-for="rowIndex in game.rows.value"
        :key="rowIndex - 1"
        :row-index="rowIndex - 1"
        :board-index="boardIndex - 1"
        :tile-size="tileSize"
      />
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import GameRow from './GameRow.vue'

const game = inject('game')

const containerClass = computed(() => {
  const mode = game.state.gameMode
  if (mode === 'quarteto') return 'grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3'
  if (mode === 'dueto') return 'flex flex-col gap-2 sm:flex-row sm:gap-4'
  return 'flex flex-col'
})

const rowGapClass = computed(() => {
  const mode = game.state.gameMode
  if (mode === 'quarteto') return 'gap-0.5 md:gap-1'
  return 'gap-1'
})

const tileSize = computed(() => {
  const mode = game.state.gameMode
  if (mode === 'quarteto') return 'quarteto'
  if (mode === 'dueto') return 'dueto'
  return 'normal'
})
</script>
