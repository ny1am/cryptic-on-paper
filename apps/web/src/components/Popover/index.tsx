import {
  autoUpdate,
  flip,
  FloatingFocusManager,
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
  const ref = useMergeRefs([refs.setReference, (children as any).ref]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref, ...children.props }))}
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            {...getFloatingProps({
              ref: refs.setFloating,
              style: { position: strategy, top: y ?? 0, left: x ?? 0 },
            })}
            aria-label={ariaLabel}
            className="border-primary bg-primary z-20 animate-zoom-in rounded-sm p-3 shadow-xl motion-reduce:animate-none"
          >
            {panel}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};
