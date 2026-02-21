<template>
  <OverlayModal :model-value="game.state.showModeSelector" @update:model-value="game.state.showModeSelector = $event">
    <h2 class="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">Modo de Jogo</h2>

    <div class="space-y-3">
      <button
        v-for="mode in modes"
        :key="mode.id"
        @click="selectMode(mode.id)"
        :class="[
          'w-full p-4 rounded-xl border-2 transition-all duration-200 text-left',
          game.state.gameMode === mode.id
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
            : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400',
        ]"
      >
        <div class="flex items-center gap-3">
          <div class="text-2xl">{{ mode.icon }}</div>
          <div>
            <p class="font-bold text-gray-900 dark:text-white">{{ mode.name }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ mode.description }}</p>
          </div>
        </div>
      </button>
    </div>
  </OverlayModal>
</template>

<script setup>
import { inject } from 'vue'
import OverlayModal from './OverlayModal.vue'

const game = inject('game')

const modes = [
  { id: 'classic', name: 'Clássico', description: '1 palavra, 6 tentativas', icon: '🎯' },
  { id: 'dueto', name: 'Dueto', description: '2 palavras, 8 tentativas', icon: '🎭' },
  { id: 'quarteto', name: 'Quarteto', description: '4 palavras, 10 tentativas', icon: '🃏' },
]

function selectMode(modeId) {
  game.changeMode(modeId)
  game.state.showModeSelector = false
}
</script>
