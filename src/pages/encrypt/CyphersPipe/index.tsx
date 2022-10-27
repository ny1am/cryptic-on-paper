import { useContext, useState } from 'react';

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
type SerializeType = CypherMeta['options'] extends infer R ? (opts: R) => string : never;

const cypherKeys = Object.keys(cyphersRegister) as CypherKey[];

export function CyphersPipe() {
  const { selectedCyphers, addCypher } = useContext(CiphersContext);
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

  const serializedCyphers = selectedCyphers.map((meta) => {
    const serialize = pipeCfg[meta.key].serialize as SerializeType;
    return serialize(meta.options);
  });

  return (
    <div>
      <div>
        <select
          value=""
          onChange={({ target: { value } }) =>
            value && handleAddCypher(value as CypherKey)
          }
        >
          <option value="">please select...</option>
          {cypherKeys.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
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
