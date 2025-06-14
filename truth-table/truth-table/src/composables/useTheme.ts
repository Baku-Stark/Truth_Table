import { ref, onMounted } from 'vue'

const isDark = ref(false)

export function useTheme() {
  onMounted(() => {
    isDark.value = localStorage.theme === 'dark'
    updateClass()
  })

  function toggleTheme() {
    isDark.value = !isDark.value
    localStorage.theme = isDark.value ? 'dark' : 'light'
    updateClass()
  }

  function updateClass() {
    const html = document.documentElement
    if (isDark.value) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  return { isDark, toggleTheme }
}
