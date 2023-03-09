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
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import { cloneElement, useState } from 'react';
import { flushSync } from 'react-dom';

import { AUTO_ANIMATE_DURATION } from '@/lib/auto-animate';

interface TooltipProps {
  label: string;
  placement?: Placement;
  children: JSX.Element;
}

export const Tooltip = ({ children, label, placement = 'top' }: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const { x, y, refs, strategy, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(4), flip(), shift({ padding: 14 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { delay: { open: AUTO_ANIMATE_DURATION + 100 } }); //delay should be bigger then auto-animate duration
  const focus = useFocus(context);
  const role = useRole(context, { role: 'tooltip' });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    role,
    dismiss,
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useMergeRefs([refs.setReference, (children as any).ref]);

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
            ref: refs.setFloating,
            style: { position: strategy, top: y ?? 0, left: x ?? 0 },
          })}
          className="border-primary pointer-events-none animate-zoom-in whitespace-nowrap rounded-sm bg-[#030300] px-2 py-1 text-xs motion-reduce:animate-none"
        >
          {label}
        </div>
      )}
    </>
  );
};
