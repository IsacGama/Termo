<template>
  <OverlayModal :model-value="game.state.showDefeat" @update:model-value="game.state.showDefeat = $event">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Você Perdeu!</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-3">
        {{ game.state.targetWords.length > 1 ? 'As palavras corretas eram:' : 'A palavra correta era:' }}
      </p>
      <div class="flex flex-wrap justify-center gap-2">
        <p
          v-for="(word, i) in game.state.targetWords"
          :key="i"
          :class="[
            'text-xl font-bold uppercase px-3 py-1 rounded-lg',
            game.state.solvedBoards[i]
              ? 'text-correct bg-correct/10'
              : 'text-red-500 bg-red-500/10',
          ]"
        >
          {{ word }}
          <span v-if="game.state.solvedBoards[i]" class="text-sm">✓</span>
        </p>
      </div>
    </div>
  </OverlayModal>
</template>

<script setup>
import { inject } from 'vue'
import OverlayModal from './OverlayModal.vue'

const game = inject('game')
</script>
