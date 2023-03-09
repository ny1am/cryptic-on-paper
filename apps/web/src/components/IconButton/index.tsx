import { cx } from 'class-variance-authority';
import React, { cloneElement, forwardRef, ReactElement } from 'react';

import { ConditionalWrapper } from '@/components/ConditionalWrapper';
import { Tooltip } from '@/components/Tooltip';

type As = 'button' | 'a';

type IconButtonProps<P extends As = 'button'> = React.ComponentProps<P> & {
  as?: P;
  title: string;
  icon: ReactElement;
  noTooltip?: boolean;
};

function IconButtonInner<T extends As = 'button'>(
  { as, title, icon, noTooltip, className, ...rest }: IconButtonProps<T>,
  ref: React.Ref<HTMLElementTagNameMap[T]>
) {
  const Primitive = (as ?? 'button') as React.ElementType;

  return (
    <ConditionalWrapper
      condition={!noTooltip}
      wrapper={(children) => <Tooltip label={title}>{children}</Tooltip>}
    >
      <Primitive
        ref={ref}
        className={cx(
          'inline-flex h-8 w-8 items-center justify-center rounded-sm opacity-70 hover:opacity-100 focus:opacity-100',
          className
        )}
        {...rest}
      >
        {cloneElement(icon, { 'aria-hidden': true })}
        <span className="sr-only">{title}</span>
      </Primitive>
    </ConditionalWrapper>
  );
}

export const IconButton = forwardRef(IconButtonInner);
