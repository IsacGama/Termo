import { onMounted, onUnmounted } from 'vue'

export function useKeyboard({ inputLetter, deleteLetter, submitGuess, navigateLeft, navigateRight }) {
  function handleKeyDown(event) {
    const key = event.key

    if (key === 'Enter') {
      event.preventDefault()
      submitGuess()
    } else if (key === 'Backspace') {
      event.preventDefault()
      deleteLetter()
    } else if (key === 'ArrowLeft') {
      event.preventDefault()
      navigateLeft()
    } else if (key === 'ArrowRight') {
      event.preventDefault()
      navigateRight()
    } else if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
      inputLetter(key)
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })
}
