<template>
  <OverlayModal :model-value="game.state.showVictory" @update:model-value="game.state.showVictory = $event">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Você Venceu!</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-2">
        {{ game.state.targetWords.length > 1 ? 'Parabéns, você acertou todas as palavras!' : 'Parabéns, você acertou a palavra!' }}
      </p>
      <div v-if="game.state.targetWords.length > 1" class="flex flex-wrap justify-center gap-2 mb-3">
        <span
          v-for="(word, i) in game.state.targetWords"
          :key="i"
          class="text-lg font-bold uppercase px-3 py-1 rounded-lg text-correct bg-correct/10"
        >
          {{ word }}
        </span>
      </div>
      <p class="text-lg font-semibold text-correct">
        Vitórias seguidas: {{ game.stats.winStreak.value }}
      </p>
    </div>
  </OverlayModal>
</template>

<script setup>
import { inject } from 'vue'
import OverlayModal from './OverlayModal.vue'

const game = inject('game')
</script>
