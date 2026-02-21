<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
    <GameHeader />

    <main class="flex-1 overflow-y-auto flex flex-col">
      <div class="min-h-full flex flex-col items-center justify-center px-2 sm:px-4 py-4 gap-4">
        <template v-if="wordList.isLoading.value">
          <div class="text-gray-500 dark:text-gray-400 text-lg">Carregando...</div>
        </template>
        <template v-else>
          <GameBoard />
        </template>
      </div>
    </main>

    <GameKeyboard />

    <!-- Overlays -->
    <RulesOverlay />
    <VictoryOverlay />
    <DefeatOverlay />
    <SettingsOverlay />
    <StatsOverlay />
    <GameModeSelector />
    <ToastNotification />
  </div>
</template>

<script setup>
import { provide, onMounted } from 'vue'
import { useWordList } from './composables/useWordList'
import { useGameState } from './composables/useGameState'
import { useKeyboard } from './composables/useKeyboard'
import { useTheme } from './composables/useTheme'

import GameHeader from './components/GameHeader.vue'
import GameBoard from './components/GameBoard.vue'
import GameKeyboard from './components/GameKeyboard.vue'
import RulesOverlay from './components/RulesOverlay.vue'
import VictoryOverlay from './components/VictoryOverlay.vue'
import DefeatOverlay from './components/DefeatOverlay.vue'
import SettingsOverlay from './components/SettingsOverlay.vue'
import StatsOverlay from './components/StatsOverlay.vue'
import GameModeSelector from './components/GameModeSelector.vue'
import ToastNotification from './components/ToastNotification.vue'

const wordList = useWordList()
const game = useGameState(wordList)
const theme = useTheme()

provide('game', game)
provide('theme', theme)

useKeyboard({
  inputLetter: game.inputLetter,
  deleteLetter: game.deleteLetter,
  submitGuess: game.submitGuess,
  navigateLeft: game.navigateLeft,
  navigateRight: game.navigateRight,
})

onMounted(async () => {
  await wordList.load()
  game.startGame()
})
</script>
