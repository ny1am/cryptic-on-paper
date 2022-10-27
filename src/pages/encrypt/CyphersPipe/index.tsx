import { useContext, useState } from 'react';

import { CiphersContext } from '../CiphersContext';
import {
  CypherKeysWithRequiredOptions,
  CypherMeta,
  CyphersOptionsRegister,
  cyphersRegister,
} from '../config';
import { CypherOptionsForm } from './CypherOptionsForm';
import { areCypherOptionsRequired, pipeCfg } from './pipeConfig';

type SerializeType = CypherMeta['options'] extends infer R ? (opts: R) => string : never;

const cypherKeys = Object.keys(cyphersRegister) as Array<keyof typeof cyphersRegister>;

export function CyphersPipe() {
  const { selectedCyphers, addCypher } = useContext(CiphersContext);
  const [optionsForm, setOptionsForm] = useState<CypherKeysWithRequiredOptions>();
  const closeOptionsForm = () => setOptionsForm(undefined);

  const handleAddCypher = (key: keyof CyphersOptionsRegister) => {
    if (!areCypherOptionsRequired(key)) {
      return addCypher({ key, options: undefined });
    }
    return setOptionsForm(key);
  };

  const handleOptionsSubmit = <
    K extends CypherKeysWithRequiredOptions,
    O extends CyphersOptionsRegister[K]
  >(
    key: K,
    options: O
  ): void => {
    addCypher({ key, options } as CypherMeta);
    closeOptionsForm();
  };

  const serializedCyphers = selectedCyphers.map((meta) => {
    const serialize = pipeCfg[meta.key].serialize as SerializeType;
    return serialize(meta.options);
  });

  return (
    <div>
      <div>
        {cypherKeys.map((name) => (
          <button key={name} type="button" onClick={() => handleAddCypher(name)}>
            {name}
          </button>
        ))}
        {optionsForm && (
          <CypherOptionsForm
            cypherKey={optionsForm}
            handleSubmit={handleOptionsSubmit}
            handleCancel={closeOptionsForm}
          />
        )}
      </div>
      <div>
        <h2>Pipe:</h2>
        {selectedCyphers.length > 0 ? (
          <ul>
            {serializedCyphers.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        ) : (
          <div>empty</div>
        )}
      </div>
    </div>
  );
}
