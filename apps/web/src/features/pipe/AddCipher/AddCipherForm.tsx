import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import FocusLock from 'react-focus-lock';
import { useHotkeys } from 'react-hotkeys-hook';
import { keys } from 'remeda';

import { Button } from '@/components/Button';
import {
  CipherMeta,
  CipherMetaWithRequiredOptions,
  ciphersRegister,
} from '@/features/config';
import { Description, Label, Radio, RadioGroup, Transition } from '@/lib/headlessui';

import { usePipeActions } from '../store';
import { CipherOptionsForm } from './CipherOptionsForm';

const cipherKeys = keys(ciphersRegister);

function areCipherOptionsRequired(
  key: CipherMeta['key']
): key is CipherMetaWithRequiredOptions['key'] {
  return typeof ciphersRegister[key].form !== 'undefined';
}

type AddCipherFormProps = {
  onDispose: () => void;
};

export function AddCipherForm({ onDispose }: AddCipherFormProps) {
  const { add: addCipher } = usePipeActions();

  const [selectedKey, setSelectedKey] = useState(cipherKeys[0]);
  const [configForm, setConfigForm] = useState<CipherMetaWithRequiredOptions['key']>();

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

  const attemptAddCipher = (key: (typeof cipherKeys)[number]) => {
    if (!areCipherOptionsRequired(key)) {
      onDispose();
      return void addCipher({ key, options: undefined });
    }
    setConfigForm(key);
  };

  const handleConfigSubmit = <T extends CipherMeta>(
    key: T['key'],
    options: T['options']
  ): void => {
    addCipher({ key, options } as T);
    onDispose();
  };

  return (
    <>
      {configForm && (
        <StepWrapper>
          <h2 className="mb-4 text-lg leading-6 font-medium">{configForm} keys</h2>
          <CipherOptionsForm
            cipherKey={configForm}
            handleSubmit={handleConfigSubmit}
            handleCancel={() => void setConfigForm(undefined)}
          />
        </StepWrapper>
      )}
      {!configForm && (
        <StepWrapper>
          <h2 className="mb-4 text-lg leading-6 font-medium">Select a cipher</h2>
          <RadioGroup className="mt-8" value={selectedKey} onChange={setSelectedKey}>
            <div className="space-y-4">
              {cipherKeys
                .map((key) => ({
                  cipherKey: key,
                  htmlId: `c_${key.replace(/\W/g, '')}`,
                  description: ciphersRegister[key].meta.description?.short,
                  hasKeys: areCipherOptionsRequired(key),
                }))
                .map(({ cipherKey, htmlId, description, hasKeys }) => (
                  <Radio
                    key={htmlId}
                    value={cipherKey}
                    as="button"
                    onClick={() => void attemptAddCipher(cipherKey)}
                    className="relative flex w-full cursor-pointer justify-between rounded-xs border-primary py-4 pr-2 pl-6 text-left"
                    data-test={`btn-attempt-add-cipher-${cipherKey}`}
                  >
                    <span className="flex items-center">
                      <span className="flex flex-col text-sm">
                        <Label as="span" className="font-medium">
                          {cipherKey}
                        </Label>
                        <Description
                          as="span"
                          className="mt-1 text-xs font-light text-gray-400"
                        >
                          {description}
                        </Description>
                      </span>
                    </span>
                    {hasKeys && (
                      <Description
                        as="span"
                        className="mt-0 ml-4 text-right text-xs text-gray-500"
                      >
                        <span className="sr-only">has keys</span>
                        <Cog8ToothIcon className="w-5" />
                      </Description>
                    )}
                  </Radio>
                ))}
            </div>
          </RadioGroup>
          <div className="mt-10 flex justify-end">
            <Button onClick={onDispose} intent="cancel">
              Cancel
            </Button>
          </div>
        </StepWrapper>
      )}
    </>
  );
}

function StepWrapper({ children }: React.PropsWithChildren) {
  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <FocusLock>{children}</FocusLock>
    </Transition>
  );
}
