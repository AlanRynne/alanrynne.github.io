const { createApp, ref, onMounted, watch } = Vue;

createApp({
  setup() {
    const isDarkMode = ref(false);
    const mouseX = ref(0);
    const mouseY = ref(0);
    let lastUpdateTime = 0;
    const targetFPS = 60;
    const frameTimeMs = 1000 / targetFPS;

    const checkSystemTheme = () => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    const setThemeClass = (isDark) => {
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem("darkMode", isDarkMode.value);
    };

    const handleMouseMove = (event) => {
      // Throttle to 60fps for smoother performance
      const now = performance.now();
      if (now - lastUpdateTime < frameTimeMs) {
        return; // Skip this update to maintain target FPS
      }

      lastUpdateTime = now;

      // Update mouse position directly without additional requestAnimationFrame
      mouseX.value = event.clientX;
      mouseY.value = event.clientY;
    };

    onMounted(() => {
      // Check for saved theme preference or use system preference
      const savedTheme = localStorage.getItem("darkMode");

      if (savedTheme !== null) {
        isDarkMode.value = savedTheme === "true";
      } else {
        isDarkMode.value = checkSystemTheme();
      }

      setThemeClass(isDarkMode.value);

      // Listen for system theme changes
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (localStorage.getItem("darkMode") === null) {
          isDarkMode.value = e.matches;
        }
      });

      // Track mouse movement with passive option for better performance
      document.addEventListener("mousemove", handleMouseMove, { passive: true });
    });

    watch(isDarkMode, (newValue) => {
      setThemeClass(newValue);
    });

    return {
      isDarkMode,
      mouseX,
      mouseY,
      toggleTheme,
    };
  },
}).mount("#app");
