import { watch } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export function useTheme() {
  const isDark = useLocalStorage('termo-dark-mode', false)
  const isHighContrast = useLocalStorage('termo-high-contrast', false)

  function applyTheme() {
    const html = document.documentElement
    html.classList.toggle('dark', isDark.value)
    html.classList.toggle('high-contrast', isHighContrast.value)
  }

  watch(isDark, applyTheme, { immediate: true })
  watch(isHighContrast, applyTheme, { immediate: true })

  function toggleDark() {
    isDark.value = !isDark.value
  }

  function toggleHighContrast() {
    isHighContrast.value = !isHighContrast.value
  }

  return { isDark, isHighContrast, toggleDark, toggleHighContrast }
}
