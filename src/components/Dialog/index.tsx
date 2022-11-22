import { Dialog as D, Transition } from '@headlessui/react';
import React from 'react';

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
      <D className="relative z-10" open={true} onClose={onClose}>
        <D.Title className="sr-only">{ariaLabel}</D.Title>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-gray-500/75 dark:bg-gray-500/90 dark:blur-xl"
            aria-hidden="true"
          />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <D.Panel className="relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all min-w-[20rem] dark:bg-slate-900 xs:my-20 xs:w-full xs:max-w-lg xs:p-6 xs:mx-auto xs:rounded-md">
              {children}
            </D.Panel>
          </Transition.Child>
        </div>
      </D>
    </Transition>
  );
}
