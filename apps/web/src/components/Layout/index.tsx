import { IconButton } from '@/components/IconButton';
import { GitHubIcon } from '@/icons/GitHubIcon';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="grow">{children}</main>
      <footer className="mx-auto flex w-full max-w-7xl shrink-0 justify-end px-4 py-4 lg:px-6">
        <IconButton
          as="a"
          title="GitHub source code"
          icon={<GitHubIcon className="h-5" />}
          href="https://github.com/ny1am/cryptic-on-paper"
          target="_blank"
          rel="noreferrer"
        />
      </footer>
    </>
  );
}
