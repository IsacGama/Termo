<template>
  <OverlayModal :model-value="game.state.showSettings" @update:model-value="game.state.showSettings = $event">
    <h2 class="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">Configurações</h2>

    <div class="space-y-4">
      <!-- Dark mode -->
      <div class="flex items-center justify-between">
        <span class="text-gray-700 dark:text-gray-300 font-medium">Modo escuro</span>
        <button
          @click="theme.toggleDark()"
          :class="[
            'relative w-12 h-7 rounded-full transition-colors duration-200 shrink-0',
            theme.isDark.value ? 'bg-blue-500' : 'bg-gray-300',
          ]"
        >
          <span
            :class="[
              'absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-200 shadow',
              theme.isDark.value ? 'translate-x-5' : 'translate-x-0',
            ]"
          />
        </button>
      </div>

      <!-- High contrast -->
      <div class="flex items-center justify-between">
        <span class="text-gray-700 dark:text-gray-300 font-medium">Modo alto contraste</span>
        <button
          @click="theme.toggleHighContrast()"
          :class="[
            'relative w-12 h-7 rounded-full transition-colors duration-200 shrink-0',
            theme.isHighContrast.value ? 'bg-blue-500' : 'bg-gray-300',
          ]"
        >
          <span
            :class="[
              'absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-200 shadow',
              theme.isHighContrast.value ? 'translate-x-5' : 'translate-x-0',
            ]"
          />
        </button>
      </div>

      <!-- Skip filled tiles -->
      <div class="flex items-center justify-between gap-3">
        <div>
          <span class="text-gray-700 dark:text-gray-300 font-medium">Pular quadrados preenchidos</span>
          <p class="text-xs text-gray-500 dark:text-gray-400">Ao digitar, pula para o próximo vazio</p>
        </div>
        <button
          @click="game.settings.skipFilled.value = !game.settings.skipFilled.value"
          :class="[
            'relative w-12 h-7 rounded-full transition-colors duration-200 shrink-0',
            game.settings.skipFilled.value ? 'bg-blue-500' : 'bg-gray-300',
          ]"
        >
          <span
            :class="[
              'absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-200 shadow',
              game.settings.skipFilled.value ? 'translate-x-5' : 'translate-x-0',
            ]"
          />
        </button>
      </div>
    </div>
  </OverlayModal>
</template>

<script setup>
import { inject } from 'vue'
import OverlayModal from './OverlayModal.vue'

const game = inject('game')
const theme = inject('theme')
</script>
