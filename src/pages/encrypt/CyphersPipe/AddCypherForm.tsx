import { useContext, useState } from 'react';
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
import { areCypherOptionsRequired } from './pipeConfig';

type CypherKey = keyof CyphersOptionsRegister;
const cypherKeys = Object.keys(cyphersRegister) as CypherKey[];

type AddCypherFormProps = {
  onDispose: () => void;
};

export function AddCypherForm({ onDispose }: AddCypherFormProps) {
  const { addCypher } = useContext(CiphersContext);

  const [selectedKey, setSelectedKey] = useState<CypherKey>(cypherKeys[0]);
  const [optionsForm, setOptionsForm] = useState<CypherKeyWhenRequiredOptions>();
  const closeOptionsForm = () => {
    setOptionsForm(undefined);
    onDispose();
  };

  const handleAddCypher = (key: CypherKey) => {
    if (!areCypherOptionsRequired(key)) {
      onDispose();
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

  if (optionsForm) {
    return (
      <FocusLock>
        <h2 className="text-lg font-medium leading-6 mb-6">{optionsForm} config</h2>
        <CypherOptionsForm
          cypherKey={optionsForm}
          handleSubmit={handleOptionsSubmit}
          handleCancel={closeOptionsForm}
        />
      </FocusLock>
    );
  }

  return (
    <>
      <h2 className="text-lg font-medium leading-6 mb-6">Select Cypher</h2>
      <form autoComplete="off" onSubmit={() => handleAddCypher(selectedKey)}>
        <fieldset>
          <legend className="sr-only">Cypher</legend>
          <div className="space-y-5">
            {cypherKeys
              .map((key) => ({ cypherKey: key, htmlId: `c_${key.replace(/\W/g, '')}` }))
              .map(({ cypherKey, htmlId }) => (
                <div key={htmlId} className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id={htmlId}
                      type="radio"
                      name="cypher"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      // aria-describedby={`${htmlId}-description`}
                      checked={cypherKey === selectedKey}
                      onClick={() => setSelectedKey(cypherKey)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor={htmlId} className="font-medium text-gray-700">
                      {cypherKey}
                    </label>
                    {/* <p id={`${htmlId}-description`} className="text-gray-400 font-light">
                      todo: add description
                    </p> */}
                  </div>
                </div>
              ))}
          </div>
        </fieldset>
        <div className="mt-8 flex justify-end gap-x-4">
          <Button
            type="submit"
            className="min-w-[120px]"
            {...(areCypherOptionsRequired(selectedKey)
              ? { secondary: true }
              : { primary: true })}
          >
            {areCypherOptionsRequired(selectedKey) ? `Configure` : `Submit`}
          </Button>
          <Button type="button" onClick={onDispose}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
