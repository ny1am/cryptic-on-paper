import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useMemo } from 'react';

export type Theme = 'system' | 'light' | 'dark';

const themeAtom = atomWithStorage<Theme>('theme', 'system');

export function useTheme(): [boolean, Theme, (update: Theme) => void] {
  const [theme, setTheme] = useAtom(themeAtom);
  const isDarkMode = useMemo(
    () =>
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme:dark)').matches),
    [theme]
  );
  return [isDarkMode, theme, setTheme];
}
