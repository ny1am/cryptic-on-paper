import { useEffect } from 'react';

import { useTheme } from './store';

export function ThemeLoader() {
  const [isDarkMode] = useTheme();
  useEffect(() => {
    const classList = document.documentElement.classList;
    isDarkMode ? classList.add('dark') : classList.remove('dark');
  }, [isDarkMode]);

  return null;
}
