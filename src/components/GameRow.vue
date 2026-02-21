<template>
  <div
    :class="[
      'flex justify-center',
      tileSize === 'quarteto' ? 'gap-0.5 md:gap-1' : 'gap-1',
      { 'animate-shake': isShaking },
    ]"
  >
    <GameTile
      v-for="(_, colIndex) in 5"
      :key="colIndex"
      :letter="game.state.board[rowIndex][colIndex]"
      :evaluation="game.state.boardEvaluations[boardIndex][rowIndex][colIndex]"
      :is-active="isCurrentRow && colIndex === game.state.currentCol"
      :col-index="colIndex"
      :should-flip-row="game.state.flipRow === rowIndex"
      :is-solved="game.state.solvedBoards[boardIndex]"
      :size="tileSize"
      @select="handleTileSelect"
    />
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import GameTile from './GameTile.vue'

const props = defineProps({
  rowIndex: { type: Number, required: true },
  boardIndex: { type: Number, default: 0 },
  tileSize: { type: String, default: 'normal' },
})

const game = inject('game')

const isCurrentRow = computed(() =>
  game.state.currentRow === props.rowIndex && game.state.gameStatus === 'playing'
)
const isShaking = computed(() => game.state.shakeRow === props.rowIndex)

function handleTileSelect(colIndex) {
  if (isCurrentRow.value) {
    game.selectTile(colIndex)
  }
}
</script>
