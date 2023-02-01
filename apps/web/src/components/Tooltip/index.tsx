import {
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { cloneElement, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { mergeRefs } from 'react-merge-refs';

import { AUTO_ANIMATE_DURATION } from '@/lib/auto-animate';

interface TooltipProps {
  label: string;
  placement?: Placement;
  children: JSX.Element;
}

export const Tooltip = ({ children, label, placement = 'top' }: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(4), flip(), shift({ padding: 14 })],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { delay: { open: AUTO_ANIMATE_DURATION + 100 } }), //delay should be bigger then auto-animate duration
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  // Preserve the consumer's ref
  const ref = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => mergeRefs([reference, (children as any).ref]),
    [reference, children]
  );

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({
          ref,
          ...children.props,
          ...(children.props?.onClick && {
            onClick: (e) => {
              flushSync(() => void setOpen(false));
              return children.props.onClick(e);
            },
          }),
        })
      )}
      {open && (
        <div
          {...getFloatingProps({
            ref: floating,
            style: {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            },
          })}
          className="border-primary pointer-events-none animate-zoom-in whitespace-nowrap rounded-sm bg-[#fcfcff] px-2 py-1 text-xs dark:bg-[#030300]"
        >
          {label}
        </div>
      )}
    </>
  );
};
