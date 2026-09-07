import React from 'react';

import { poppins } from '@/fonts';
import {
  Dialog as D,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@/lib/headlessui';

type DialogProps = {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  ariaLabel: string;
};

export function Dialog({
  children,
  onClose,
  isOpen,
  ariaLabel,
}: React.PropsWithoutRef<DialogProps>) {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <D
        className={`${poppins.variable} relative z-10 font-sans`}
        open={true}
        onClose={onClose}
      >
        <DialogTitle className="sr-only">{ariaLabel}</DialogTitle>
        <TransitionChild
          as={React.Fragment}
          enter="duration-0"
          enterFrom="opacity-50"
          enterTo="opacity-100"
          leave="duration-0"
          leaveFrom="opacity-50"
          leaveTo="opacity-100"
        >
          <div
            className="fixed inset-0 bg-primary xs:bg-slate-700/90"
            aria-hidden="true"
          />
        </TransitionChild>
        <div className="fixed inset-0 z-10 w-screen overflow-y-scroll">
          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="relative min-w-[20rem] transform overflow-hidden bg-primary px-4 pt-5 pb-4 text-left transition-all xs:mx-auto xs:my-20 xs:w-full xs:max-w-lg xs:rounded-md xs:p-6 xs:shadow-xl">
              {children}
            </DialogPanel>
          </TransitionChild>
        </div>
      </D>
    </Transition>
  );
}
