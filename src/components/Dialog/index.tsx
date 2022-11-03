import { Dialog as D } from '@headlessui/react';
import React from 'react';

type DialogProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export function Dialog({ children, onClose }: React.PropsWithoutRef<DialogProps>) {
  return (
    <D className="relative z-10" open={true} onClose={onClose}>
      <div className="fixed inset-0 bg-gray-500/75" aria-hidden="true" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <D.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all min-w-[20rem] xs:my-20 xs:w-full xs:max-w-lg xs:p-6 xs:mx-auto">
          {children}
        </D.Panel>
      </div>
    </D>
  );
}
