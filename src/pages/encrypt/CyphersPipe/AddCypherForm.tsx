import { RadioGroup } from '@headlessui/react';
import cn from 'clsx';
import React, { useContext, useState } from 'react';
import FocusLock from 'react-focus-lock';

import { Button } from '@/components/Button';

import { CiphersContext } from '../CiphersContext';
import {
  CypherKeyWhenRequiredOptions,
  CypherMeta,
  CyphersOptionsRegister,
  cyphersRegister,
} from '../config';
import { CypherOptionsForm } from './CypherOptionsForm';
import { areCypherOptionsRequired, pipeCfg } from './pipeConfig';

type CypherKey = keyof CyphersOptionsRegister;
const cypherKeys = Object.keys(cyphersRegister) as CypherKey[];

type AddCypherFormProps = {
  onDispose: () => void;
};

export function AddCypherForm({ onDispose }: AddCypherFormProps) {
  const { addCypher } = useContext(CiphersContext);

  const [selectedKey, setSelectedKey] = useState<CypherKey>(cypherKeys[0]);
  const [configForm, setConfigForm] = useState<CypherKeyWhenRequiredOptions>();
  const closeConfigForm = () => {
    setConfigForm(undefined);
    onDispose();
  };

  const attemptAddCypher = (key: CypherKey) => {
    if (!areCypherOptionsRequired(key)) {
      onDispose();
      return addCypher({ key, options: undefined });
    }
    return setConfigForm(key);
  };

  const handleConfigSubmit = <
    K extends CypherKeyWhenRequiredOptions,
    O extends CyphersOptionsRegister[K]
  >(
    key: K,
    options: O
  ): void => {
    addCypher({ key, options } as CypherMeta);
    closeConfigForm();
  };

  if (configForm) {
    return (
      <FocusLock>
        <h2 className="text-lg font-medium leading-6 mb-4">{configForm} configuration</h2>
        <CypherOptionsForm
          cypherKey={configForm}
          handleSubmit={handleConfigSubmit}
          handleCancel={closeConfigForm}
        />
      </FocusLock>
    );
  }

  return (
    <>
      <h2 className="text-lg font-medium leading-6 mb-4">Select Cypher</h2>
      <RadioGroup className="mt-8" value={selectedKey} onChange={setSelectedKey}>
        <RadioGroup.Label className="sr-only">Select Cypher</RadioGroup.Label>
        <div className="space-y-4">
          {cypherKeys
            .map((key) => ({
              cypherKey: key,
              htmlId: `c_${key.replace(/\W/g, '')}`,
              description: pipeCfg[key].meta.description?.short,
            }))
            .map(({ cypherKey, htmlId, description }) => (
              <RadioGroup.Option
                key={htmlId}
                value={cypherKey}
                as="button"
                onClick={() => attemptAddCypher(cypherKey)}
                className={({ active }) =>
                  cn(
                    active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                    'relative w-full text-left cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none flex justify-between'
                  )
                }
              >
                <span className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <RadioGroup.Label as="span" className="font-medium text-gray-900">
                      {cypherKey}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="text-xs text-gray-400 font-light mt-1"
                    >
                      {description}
                    </RadioGroup.Description>
                  </span>
                </span>
                {areCypherOptionsRequired(cypherKey) && (
                  <RadioGroup.Description
                    as="span"
                    className="mt-0 ml-4 text-xs text-indigo-500 text-right"
                  >
                    configurable
                  </RadioGroup.Description>
                )}
              </RadioGroup.Option>
            ))}
        </div>
      </RadioGroup>
      <div className="mt-10 flex justify-end gap-x-4">
        <Button type="button" onClick={onDispose}>
          Cancel
        </Button>
      </div>
    </>
  );
}
