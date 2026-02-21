import { ref } from 'vue'

export function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function useWordList() {
  const words = ref([])
  const wordsNormalized = ref(new Set())
  const isLoading = ref(true)

  async function load() {
    try {
      const response = await fetch('/palavras.txt')
      const text = await response.text()
      const list = text.split('\n').map(w => w.trim()).filter(Boolean)
      words.value = list
      wordsNormalized.value = new Set(list.map(w => removeAccents(w)))
    } catch (error) {
      console.error('Erro ao carregar palavras:', error)
    } finally {
      isLoading.value = false
    }
  }

  function isValidWord(word) {
    return wordsNormalized.value.has(removeAccents(word))
  }

  function getRandomWord() {
    const index = Math.floor(Math.random() * words.value.length)
    return words.value[index]
  }

  return { words, isLoading, load, isValidWord, getRandomWord }
}
