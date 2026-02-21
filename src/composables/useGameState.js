import { reactive, computed } from 'vue'
import { removeAccents } from './useWordList'
import { useLocalStorage } from './useLocalStorage'

const MODE_CONFIG = {
  classic: { wordCount: 1, rows: 6 },
  dueto: { wordCount: 2, rows: 7 },
  quarteto: { wordCount: 4, rows: 9 },
}

const COLS = 5

export function useGameState(wordList) {
  const stats = {
    winStreak: useLocalStorage('winStrike', 0),
    wins: useLocalStorage('vitorias', 0),
    losses: useLocalStorage('derrotas', 0),
  }

  const settings = {
    skipFilled: useLocalStorage('termo-skip-filled', false),
  }

  function createEmptyState(mode = 'classic') {
    const config = MODE_CONFIG[mode]
    return {
      gameMode: mode,
      board: Array.from({ length: config.rows }, () => Array(COLS).fill('')),
      boardEvaluations: Array.from({ length: config.wordCount }, () =>
        Array.from({ length: config.rows }, () => Array(COLS).fill(null))
      ),
      solvedBoards: Array(config.wordCount).fill(false),
      currentRow: 0,
      currentCol: 0,
      targetWords: [],
      gameStatus: 'playing',
      keyStatuses: {},
      toast: null,
      shakeRow: -1,
      flipRow: -1,
      showRules: true,
      showVictory: false,
      showDefeat: false,
      showSettings: false,
      showStats: false,
      showModeSelector: false,
    }
  }

  const state = reactive(createEmptyState())

  const config = computed(() => MODE_CONFIG[state.gameMode])
  const rows = computed(() => config.value.rows)
  const wordCount = computed(() => config.value.wordCount)

  function startGame() {
    const words = []
    const usedNormalized = new Set()
    for (let i = 0; i < wordCount.value; i++) {
      let word
      do {
        word = wordList.getRandomWord()
      } while (usedNormalized.has(removeAccents(word)))
      words.push(word)
      usedNormalized.add(removeAccents(word))
    }
    state.targetWords = words
  }

  function selectTile(col) {
    if (state.gameStatus !== 'playing') return
    if (col >= 0 && col < COLS) {
      state.currentCol = col
    }
  }

  function inputLetter(letter) {
    if (state.gameStatus !== 'playing') return

    letter = letter.toLowerCase()

    if (settings.skipFilled.value) {
      // Find next empty slot starting from currentCol
      let col = state.currentCol
      // If current col is filled, find next empty
      if (state.board[state.currentRow][col] !== '') {
        let found = false
        for (let i = 0; i < COLS; i++) {
          const checkCol = (col + i) % COLS
          if (state.board[state.currentRow][checkCol] === '') {
            col = checkCol
            found = true
            break
          }
        }
        if (!found) return // All filled
      }
      state.board[state.currentRow][col] = letter
      // Move to next empty
      let nextCol = col + 1
      for (let i = 0; i < COLS; i++) {
        const checkCol = (nextCol + i) % COLS
        if (state.board[state.currentRow][checkCol] === '') {
          state.currentCol = checkCol
          return
        }
      }
      state.currentCol = COLS // All filled
    } else {
      if (state.currentCol >= COLS) return
      state.board[state.currentRow][state.currentCol] = letter
      state.currentCol++
    }
  }

  function deleteLetter() {
    if (state.gameStatus !== 'playing') return

    if (settings.skipFilled.value) {
      // In skip mode, delete from currentCol or find previous filled
      if (state.currentCol < COLS && state.board[state.currentRow][state.currentCol] !== '') {
        state.board[state.currentRow][state.currentCol] = ''
        return
      }
      // Find previous filled tile
      for (let i = state.currentCol - 1; i >= 0; i--) {
        if (state.board[state.currentRow][i] !== '') {
          state.board[state.currentRow][i] = ''
          state.currentCol = i
          return
        }
      }
    } else {
      // If current tile has content, delete it and move back
      if (state.currentCol < COLS && state.board[state.currentRow][state.currentCol] !== '') {
        state.board[state.currentRow][state.currentCol] = ''
        if (state.currentCol > 0) state.currentCol--
        return
      }
      // Otherwise move back and delete previous
      if (state.currentCol <= 0) return
      state.currentCol--
      state.board[state.currentRow][state.currentCol] = ''
    }
  }

  function navigateLeft() {
    if (state.currentCol > 0) state.currentCol--
  }

  function navigateRight() {
    if (state.currentCol < COLS - 1) state.currentCol++
  }

  function submitGuess() {
    if (state.gameStatus !== 'playing') return

    const guess = state.board[state.currentRow].join('')

    if (guess.length !== COLS) {
      showToast('Digite todas as letras para verificar.')
      triggerShake()
      return
    }

    if (!wordList.isValidWord(guess)) {
      showToast('Palavra não encontrada na lista.')
      triggerShake()
      return
    }

    state.flipRow = state.currentRow

    // Evaluate against all target words
    for (let b = 0; b < wordCount.value; b++) {
      const evaluation = evaluateGuess(guess, state.targetWords[b])
      state.boardEvaluations[b][state.currentRow] = evaluation
    }

    // Update key statuses BEFORE marking solved (so solving guess is included)
    updateKeyStatuses(guess)

    // Now check for newly solved boards
    for (let b = 0; b < wordCount.value; b++) {
      if (!state.solvedBoards[b]) {
        const isCorrect = state.boardEvaluations[b][state.currentRow].every(e => e === 'correct')
        if (isCorrect) state.solvedBoards[b] = true
      }
    }

    const allSolved = state.solvedBoards.every(s => s)

    if (allSolved) {
      state.gameStatus = 'won'
      stats.winStreak.value++
      stats.wins.value++
      setTimeout(() => { state.showVictory = true }, 1600)
      return
    }

    if (state.currentRow === rows.value - 1) {
      state.gameStatus = 'lost'
      stats.winStreak.value = 0
      stats.losses.value++
      setTimeout(() => { state.showDefeat = true }, 1600)
      return
    }

    state.currentRow++
    state.currentCol = 0
  }

  function evaluateGuess(guess, target) {
    const guessNorm = removeAccents(guess)
    const targetNorm = removeAccents(target)

    const result = Array(COLS).fill(null)
    const letterCount = {}

    for (const letter of targetNorm) {
      letterCount[letter] = (letterCount[letter] || 0) + 1
    }

    for (let i = 0; i < COLS; i++) {
      if (guessNorm[i] === targetNorm[i]) {
        result[i] = 'correct'
        letterCount[guessNorm[i]]--
      }
    }

    for (let i = 0; i < COLS; i++) {
      if (result[i] !== null) continue
      if (letterCount[guessNorm[i]] > 0) {
        result[i] = 'incorrect'
        letterCount[guessNorm[i]]--
      } else {
        result[i] = 'absent'
      }
    }

    return result
  }

  function updateKeyStatuses(guess) {
    const priority = { correct: 3, incorrect: 2, absent: 1 }
    const newStatuses = {}

    // Deep copy existing per-board statuses
    for (const [letter, statuses] of Object.entries(state.keyStatuses)) {
      newStatuses[letter] = [...statuses]
    }

    for (let i = 0; i < COLS; i++) {
      const letter = guess[i].toLowerCase()
      if (!newStatuses[letter]) {
        newStatuses[letter] = Array(wordCount.value).fill(null)
      }

      for (let b = 0; b < wordCount.value; b++) {
        if (state.solvedBoards[b]) continue // Skip already solved boards
        const eval_ = state.boardEvaluations[b][state.currentRow]
        if (!eval_) continue
        const status = eval_[i]
        const current = newStatuses[letter][b]
        if (!current || priority[status] > priority[current]) {
          newStatuses[letter][b] = status
        }
      }
    }

    state.keyStatuses = newStatuses
  }

  function showToast(message) {
    state.toast = message
    setTimeout(() => { state.toast = null }, 1500)
  }

  function triggerShake() {
    state.shakeRow = state.currentRow
    setTimeout(() => { state.shakeRow = -1 }, 500)
  }

  function changeMode(newMode) {
    Object.assign(state, createEmptyState(newMode))
    state.showRules = false
    startGame()
  }

  function resetGame() {
    const mode = state.gameMode
    Object.assign(state, createEmptyState(mode))
    state.showRules = false
    startGame()
  }

  return {
    state,
    stats,
    settings,
    config,
    rows,
    wordCount,
    startGame,
    selectTile,
    inputLetter,
    deleteLetter,
    navigateLeft,
    navigateRight,
    submitGuess,
    resetGame,
    changeMode,
  }
}
