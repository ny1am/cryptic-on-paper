import { RadioGroup } from '@headlessui/react';
import cn from 'clsx';
import React, { useContext, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { useHotkeys } from 'react-hotkeys-hook';

import { Button } from '@/components/Button';
import { useAutoAnimate } from '@/lib/auto-animate';

import { CiphersContext } from '../CiphersContext';
import {
  CipherKeyWhenRequiredOptions,
  CipherMeta,
  CiphersOptionsRegister,
  ciphersRegister,
} from '../config';
import { CipherOptionsForm } from './CipherOptionsForm';
import { areCipherOptionsRequired, pipeCfg } from './pipeConfig';

type CipherKey = keyof CiphersOptionsRegister;
const cipherKeys = Object.keys(ciphersRegister) as CipherKey[];

type AddCipherFormProps = {
  onDispose: () => void;
};

export function AddCipherForm({ onDispose }: AddCipherFormProps) {
  const { addCipher } = useContext(CiphersContext);

  const [selectedKey, setSelectedKey] = useState<CipherKey>(cipherKeys[0]);
  const [configForm, setConfigForm] = useState<CipherKeyWhenRequiredOptions>();

  useHotkeys(
    'esc',
    (e) => {
      if (configForm) {
        e.preventDefault();
        setConfigForm(undefined);
      }
    },
    { enableOnFormTags: true },
    [configForm]
  );

  const attemptAddCipher = (key: CipherKey) => {
    if (!areCipherOptionsRequired(key)) {
      onDispose();
      return addCipher({ key, options: undefined });
    }
    return setConfigForm(key);
  };

  const handleConfigSubmit = <
    K extends CipherKeyWhenRequiredOptions,
    O extends CiphersOptionsRegister[K]
  >(
    key: K,
    options: O
  ): void => {
    addCipher({ key, options } as CipherMeta);
    onDispose();
  };

  const [contentRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <div ref={contentRef}>
      {configForm && (
        <FocusLock>
          <h2 className="text-lg font-medium leading-6 mb-4">
            {configForm} configuration
          </h2>
          <CipherOptionsForm
            cipherKey={configForm}
            handleSubmit={handleConfigSubmit}
            handleCancel={() => setConfigForm(undefined)}
          />
        </FocusLock>
      )}
      {!configForm && (
        <FocusLock>
          <h2 className="text-lg font-medium leading-6 mb-4">Select Cipher</h2>
          <RadioGroup className="mt-8" value={selectedKey} onChange={setSelectedKey}>
            <RadioGroup.Label className="sr-only">Select Cipher</RadioGroup.Label>
            <div className="space-y-4">
              {cipherKeys
                .map((key) => ({
                  cipherKey: key,
                  htmlId: `c_${key.replace(/\W/g, '')}`,
                  description: pipeCfg[key].meta.description?.short,
                }))
                .map(({ cipherKey, htmlId, description }) => (
                  <RadioGroup.Option
                    key={htmlId}
                    value={cipherKey}
                    as="button"
                    onClick={() => attemptAddCipher(cipherKey)}
                    className={({ active }) =>
                      cn(
                        active ? 'border-indigo-500 ring-1 ring-indigo-500' : '',
                        'relative w-full text-left cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none flex justify-between'
                      )
                    }
                  >
                    <span className="flex items-center">
                      <span className="flex flex-col text-sm">
                        <RadioGroup.Label as="span" className="font-medium text-gray-900">
                          {cipherKey}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="text-xs text-gray-400 font-light mt-1"
                        >
                          {description}
                        </RadioGroup.Description>
                      </span>
                    </span>
                    {areCipherOptionsRequired(cipherKey) && (
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
          <div className="mt-10 flex justify-end">
            <Button type="button" onClick={onDispose}>
              Cancel
            </Button>
          </div>
        </FocusLock>
      )}
    </div>
  );
}
