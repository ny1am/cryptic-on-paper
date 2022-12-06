import { RadioGroup } from '@headlessui/react';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import FocusLock from 'react-focus-lock';
import { useHotkeys } from 'react-hotkeys-hook';
import { keys } from 'remeda';

import { Button } from '@/components/Button';
import { useAutoAnimate } from '@/lib/auto-animate';

import { CipherMeta, CipherMetaWithRequiredOptions, ciphersRegister } from '../config';
import { usePipeActions } from '../store';
import { CipherOptionsForm } from './CipherOptionsForm';
import { pipeCfg } from './pipeConfig';

const cipherKeys = keys.strict(ciphersRegister);

function areCipherOptionsRequired(
  key: CipherMeta['key']
): key is CipherMetaWithRequiredOptions['key'] {
  return typeof pipeCfg[key].form !== 'undefined';
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

  const attemptAddCipher = (key: typeof cipherKeys[number]) => {
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

  const [contentRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <div ref={contentRef}>
      {configForm && (
        <FocusLock>
          <h2 className="text-lg font-medium leading-6 mb-4">{configForm} keys</h2>
          <CipherOptionsForm
            cipherKey={configForm}
            handleSubmit={handleConfigSubmit}
            handleCancel={() => void setConfigForm(undefined)}
          />
        </FocusLock>
      )}
      {!configForm && (
        <FocusLock>
          <h2 className="text-lg font-medium leading-6 mb-4">Select a cipher</h2>
          <RadioGroup className="mt-8" value={selectedKey} onChange={setSelectedKey}>
            <div className="space-y-4">
              {cipherKeys
                .map((key) => ({
                  cipherKey: key,
                  htmlId: `c_${key.replace(/\W/g, '')}`,
                  description: pipeCfg[key].meta.description?.short,
                  hasKeys: areCipherOptionsRequired(key),
                }))
                .map(({ cipherKey, htmlId, description, hasKeys }) => (
                  <RadioGroup.Option
                    key={htmlId}
                    value={cipherKey}
                    as="button"
                    onClick={() => void attemptAddCipher(cipherKey)}
                    className="relative w-full text-left cursor-pointer rounded-sm border-primary pl-6 pr-2 py-4 flex justify-between"
                    data-test={`btn-attempt-add-cipher-${cipherKey}`}
                  >
                    <span className="flex items-center">
                      <span className="flex flex-col text-sm">
                        <RadioGroup.Label as="span" className="font-medium">
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
                    {hasKeys && (
                      <RadioGroup.Description
                        as="span"
                        className="mt-0 ml-4 text-xs text-gray-500 text-right"
                      >
                        <span className="sr-only">has keys</span>
                        <Cog8ToothIcon className="w-5" />
                      </RadioGroup.Description>
                    )}
                  </RadioGroup.Option>
                ))}
            </div>
          </RadioGroup>
          <div className="mt-10 flex justify-end">
            <Button onClick={onDispose} intent="cancel">
              Cancel
            </Button>
          </div>
        </FocusLock>
      )}
    </div>
  );
}
