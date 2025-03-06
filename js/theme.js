const { createApp, ref, onMounted, watch } = Vue;

createApp({
  setup() {
    const isDarkMode = ref(false);
    
    const checkSystemTheme = () => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    };
    
    const setThemeClass = (isDark) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('darkMode', isDarkMode.value);
    };
    
    onMounted(() => {
      // Check for saved theme preference or use system preference
      const savedTheme = localStorage.getItem('darkMode');
      
      if (savedTheme !== null) {
        isDarkMode.value = savedTheme === 'true';
      } else {
        isDarkMode.value = checkSystemTheme();
      }
      
      setThemeClass(isDarkMode.value);
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('darkMode') === null) {
          isDarkMode.value = e.matches;
        }
      });
    });
    
    watch(isDarkMode, (newValue) => {
      setThemeClass(newValue);
    });
    
    return {
      isDarkMode,
      toggleTheme
    };
  }
}).mount('#app');
