import { ThemeSelector } from '@/components/Theme';
import { Tooltip } from '@/components/Tooltip';
import { GitHubIcon } from '@/icons/GitHubIcon';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="mx-auto flex w-full max-w-7xl shrink-0 justify-end px-4 lg:px-6">
        <div className="absolute py-4">
          <ThemeSelector />
        </div>
      </header>
      <main className="grow">{children}</main>
      <footer className="mx-auto flex w-full max-w-7xl shrink-0 justify-end px-4 py-4 lg:px-6">
        <Tooltip label="GitHub source code">
          <a
            href="https://github.com/ny1am/cryptic-on-paper"
            target="_blank"
            className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-sm opacity-50 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2"
            rel="noreferrer"
          >
            <span className="sr-only">GitHub source code</span>
            <GitHubIcon className="h-5" aria-hidden={true} />
          </a>
        </Tooltip>
      </footer>
    </>
  );
}
