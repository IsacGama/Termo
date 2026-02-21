<template>
  <button
    @click="theme.toggleDark()"
    class="w-9 h-9 rounded-full flex items-center justify-center
           bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
           transition-colors duration-200"
    :title="theme.isDark.value ? 'Modo claro' : 'Modo escuro'"
  >
    <Moon v-if="!theme.isDark.value" class="w-5 h-5 text-gray-700" />
    <Sun v-else class="w-5 h-5 text-yellow-400" />
  </button>
</template>

<script setup>
import { inject } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'

const theme = inject('theme')
</script>
