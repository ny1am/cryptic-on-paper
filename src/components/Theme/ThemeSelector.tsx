import { Listbox, Transition } from '@headlessui/react';
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import cn from 'clsx';
import { Fragment } from 'react';

import { IconButton } from '../IconButton';
import { useTheme } from './hooks';

const themes = [
  { name: 'Light', value: 'light', icon: SunIcon },
  { name: 'Dark', value: 'dark', icon: MoonIcon },
  { name: 'System', value: 'system', icon: ComputerDesktopIcon },
];

export function ThemeSelector() {
  const [isDarkMode, theme, setTheme] = useTheme();

  const selectedTheme = themes.find((t) => t.value === theme);
  const SelectedIcon = isDarkMode ? MoonIcon : SunIcon;

  return (
    <Listbox as="div" className="relative" value={theme} onChange={setTheme}>
      <Listbox.Label className="sr-only">Theme</Listbox.Label>
      <Listbox.Button
        as={IconButton}
        title={`${selectedTheme?.name} theme`}
        className="bg-white dark:bg-slate-900"
        icon={<SelectedIcon className="w-5" />}
        noTooltip
      />
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
      >
        <Listbox.Options className="absolute top-full right-0 mt-3 w-36 space-y-1 rounded-sm bg-white p-3 text-sm font-medium shadow-md border-primary focus:outline-none dark:bg-slate-800">
          {themes.map((theme) => (
            <Listbox.Option
              key={theme.value}
              value={theme.value}
              className={({ active, selected }) =>
                cn(
                  'flex cursor-pointer select-none items-center rounded-[0.625rem] p-1',
                  {
                    'text-indigo-500 dark:text-indigo-400': selected,
                    'text-slate-900 dark:text-white': active && !selected,
                    'text-slate-700 dark:text-slate-400': !active && !selected,
                    'bg-slate-100 dark:bg-slate-900/40': active,
                  }
                )
              }
            >
              <div className="rounded-md bg-white p-1 shadow-md ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5">
                <theme.icon className="w-4" />
              </div>
              <div className="ml-3">{theme.name}</div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
