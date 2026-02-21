<template>
  <OverlayModal :model-value="game.state.showStats" @update:model-value="game.state.showStats = $event">
    <h2 class="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">Estatísticas</h2>
    <div class="grid grid-cols-3 gap-4 text-center">
      <div>
        <p class="text-3xl font-bold text-correct">{{ game.stats.wins.value }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Vitórias</p>
      </div>
      <div>
        <p class="text-3xl font-bold text-red-500">{{ game.stats.losses.value }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Derrotas</p>
      </div>
      <div>
        <p class="text-3xl font-bold text-blue-500">{{ game.stats.winStreak.value }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Sequência</p>
      </div>
    </div>
  </OverlayModal>
</template>

<script setup>
import { inject } from 'vue'
import OverlayModal from './OverlayModal.vue'

const game = inject('game')
</script>
