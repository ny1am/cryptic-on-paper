import React from 'react';

import { poppins } from '@/fonts';
import { Dialog as D, Transition } from '@/lib/headlessui';

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
        <D.Title className="sr-only">{ariaLabel}</D.Title>
        <Transition.Child
          as={React.Fragment}
          enter="duration-0"
          enterFrom="opacity-50"
          enterTo="opacity-100"
          leave="duration-0"
          leaveFrom="opacity-50"
          leaveTo="opacity-100"
        >
          <div
            className="bg-primary fixed inset-0 xs:bg-slate-700/90"
            aria-hidden="true"
          />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-scroll">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <D.Panel className="bg-primary relative min-w-[20rem] transform overflow-hidden px-4 pb-4 pt-5 text-left transition-all xs:mx-auto xs:my-20 xs:w-full xs:max-w-lg xs:rounded-md xs:p-6 xs:shadow-xl">
              {children}
            </D.Panel>
          </Transition.Child>
        </div>
      </D>
    </Transition>
  );
}
