<template>
  <OverlayModal :model-value="game.state.showRules" @update:model-value="game.state.showRules = $event">
    <h2 class="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">Regras do Jogo</h2>
    <p class="text-sm text-gray-700 dark:text-gray-300 text-center mb-4">
      Descubra a palavra em até 6 tentativas. A cada tentativa as peças irão te auxiliar, mostrando o quão perto você está da solução.
    </p>

    <RuleExample
      word="PARTO"
      :highlight="1"
      status="correct"
      description="existe na palavra e está na posição correta"
    />
    <RuleExample
      word="FITAS"
      :highlight="4"
      status="incorrect"
      description="existe na palavra mas não está na posição correta"
    />
    <RuleExample
      word="PULGA"
      :highlight="3"
      status="absent"
      description="não existe na palavra"
    />

    <div class="text-sm text-gray-600 dark:text-gray-400 text-center mt-4 space-y-1">
      <p>Os acentos não são considerados</p>
      <p>As palavras podem ter letras repetidas</p>
    </div>
  </OverlayModal>
</template>

<script setup>
import { inject } from 'vue'
import OverlayModal from './OverlayModal.vue'
import RuleExample from './RuleExample.vue'

const game = inject('game')
</script>
