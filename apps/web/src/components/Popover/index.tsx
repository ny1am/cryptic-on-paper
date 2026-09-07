import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import React, { cloneElement, useState } from 'react';

import { poppins } from '@/fonts';

interface PopoverProps {
  /** trigger element, receives the reference props */
  children: React.JSX.Element;
  panel: React.ReactNode;
  ariaLabel: string;
  placement?: Placement;
}

export const Popover = ({
  children,
  panel,
  ariaLabel,
  placement = 'bottom-end',
}: PopoverProps) => {
  const [open, setOpen] = useState(false);

  const { x, y, refs, strategy, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(6), flip(), shift({ padding: 14 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const role = useRole(context, { role: 'dialog' });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, role, dismiss]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useMergeRefs([refs.setReference, (children.props as any)?.ref]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ...children.props, ref }))}
      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              {...getFloatingProps({
                ref: refs.setFloating,
                style: { position: strategy, top: y ?? 0, left: x ?? 0 },
              })}
              aria-label={ariaLabel}
              className={`${poppins.variable} z-20 animate-zoom-in rounded-xs border-primary bg-primary p-3 font-sans shadow-xl motion-reduce:animate-none`}
            >
              {panel}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
