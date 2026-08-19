import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { cx } from 'class-variance-authority';

import { IconButton } from '@/components/IconButton';
import { Popover } from '@/components/Popover';

import { ClearAfterCopyToggle } from './ClearAfterCopyToggle';

interface ClearAfterCopyMenuButtonProps {
  className?: string;
}

export function ClearAfterCopyMenuButton({ className }: ClearAfterCopyMenuButtonProps) {
  return (
    <Popover ariaLabel="Copy options" panel={<ClearAfterCopyToggle />}>
      <IconButton
        type="button"
        noTooltip
        title="Copy options"
        className={cx('w-4', className)}
        icon={<ChevronDownIcon className="h-4" />}
        data-test="btn-copy-options"
      />
    </Popover>
  );
}
