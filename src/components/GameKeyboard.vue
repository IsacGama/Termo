<template>
  <div class="flex flex-col items-center gap-1.5 px-2 pb-4">
    <!-- Row 1 -->
    <div class="flex gap-1">
      <KeyboardKey
        v-for="key in row1"
        :key="key"
        :letter="key"
        :board-statuses="keyStatuses[key.toLowerCase()] || []"
        :game-mode="game.state.gameMode"
        @press="game.inputLetter(key)"
      />
    </div>
    <!-- Row 2 -->
    <div class="flex gap-1">
      <KeyboardKey
        v-for="key in row2"
        :key="key"
        :letter="key"
        :board-statuses="keyStatuses[key.toLowerCase()] || []"
        :game-mode="game.state.gameMode"
        @press="game.inputLetter(key)"
      />
      <KeyboardKey :is-wide="true" @press="game.deleteLetter()">
        <Delete class="w-5 h-5" />
      </KeyboardKey>
    </div>
    <!-- Row 3 -->
    <div class="flex gap-1">
      <KeyboardKey
        v-for="key in row3"
        :key="key"
        :letter="key"
        :board-statuses="keyStatuses[key.toLowerCase()] || []"
        :game-mode="game.state.gameMode"
        @press="game.inputLetter(key)"
      />
      <KeyboardKey :is-wide="true" @press="game.submitGuess()">
        Enter
      </KeyboardKey>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import { Delete } from 'lucide-vue-next'
import KeyboardKey from './KeyboardKey.vue'

const game = inject('game')
const keyStatuses = computed(() => game.state.keyStatuses)

const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
</script>
