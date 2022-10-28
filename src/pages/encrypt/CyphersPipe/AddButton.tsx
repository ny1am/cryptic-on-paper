import { Menu, Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/20/solid';
import cn from 'clsx';
import React, { useContext, useState } from 'react';

import { CiphersContext } from '../CiphersContext';
import {
  CypherKeyWhenRequiredOptions,
  CypherMeta,
  CyphersOptionsRegister,
  cyphersRegister,
} from '../config';
import { CypherOptionsForm } from './CypherOptionsForm';
import { areCypherOptionsRequired } from './pipeConfig';

type CypherKey = keyof CyphersOptionsRegister;
const cypherKeys = Object.keys(cyphersRegister) as CypherKey[];

export function AddButton() {
  const { addCypher } = useContext(CiphersContext);

  const [optionsForm, setOptionsForm] = useState<CypherKeyWhenRequiredOptions>();
  const closeOptionsForm = () => setOptionsForm(undefined);

  const handleAddCypher = (key: CypherKey) => {
    if (!areCypherOptionsRequired(key)) {
      return addCypher({ key, options: undefined });
    }
    return setOptionsForm(key);
  };

  const handleOptionsSubmit = <
    K extends CypherKeyWhenRequiredOptions,
    O extends CyphersOptionsRegister[K]
  >(
    key: K,
    options: O
  ): void => {
    addCypher({ key, options } as CypherMeta);
    closeOptionsForm();
  };

  return (
    <>
      {optionsForm && (
        <CypherOptionsForm
          cypherKey={optionsForm}
          handleSubmit={handleOptionsSubmit}
          handleCancel={closeOptionsForm}
        />
      )}

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Cypher
          </Menu.Button>
        </div>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {cypherKeys.map((cypherKey) => (
                <Menu.Item key={cypherKey}>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => handleAddCypher(cypherKey)}
                      className={cn(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm w-full text-right'
                      )}
                    >
                      {cypherKey}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
