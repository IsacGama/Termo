<template>
  <header class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
    <div class="flex gap-2">
      <button
        @click="game.state.showStats = true"
        class="w-9 h-9 rounded-full flex items-center justify-center
               bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
               transition-colors duration-200"
        title="Estatísticas"
      >
        <BarChart3 class="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
      <button
        @click="game.state.showRules = true"
        class="w-9 h-9 rounded-full flex items-center justify-center
               bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
               transition-colors duration-200"
        title="Regras"
      >
        <HelpCircle class="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
      <button
        @click="game.state.showModeSelector = true"
        class="w-9 h-9 rounded-full flex items-center justify-center
               bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
               transition-colors duration-200"
        title="Modo de jogo"
      >
        <Gamepad2 class="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
    </div>

    <div class="text-center">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-wider text-gray-900 dark:text-white font-mono">
        TERMO
      </h1>
      <p class="text-xs text-gray-500 dark:text-gray-400 -mt-1">
        {{ modeLabel }}
      </p>
    </div>

    <div class="flex gap-2">
      <button
        @click="game.resetGame()"
        class="w-9 h-9 rounded-full flex items-center justify-center
               bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
               transition-colors duration-200"
        title="Reiniciar"
      >
        <RotateCcw class="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
      <button
        @click="game.state.showSettings = true"
        class="w-9 h-9 rounded-full flex items-center justify-center
               bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
               transition-colors duration-200"
        title="Configurações"
      >
        <Settings class="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup>
import { inject, computed } from 'vue'
import { BarChart3, HelpCircle, RotateCcw, Settings, Gamepad2 } from 'lucide-vue-next'
import ThemeToggle from './ThemeToggle.vue'

const game = inject('game')

const modeLabel = computed(() => ({
  classic: 'Clássico',
  dueto: 'Dueto',
  quarteto: 'Quarteto',
})[game.state.gameMode])
</script>
