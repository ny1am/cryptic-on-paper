import { caesarConfig } from './caesarConfig';
import { railFenceConfig } from './railFenceConfig';
import { reverseConfig } from './reverseConfig';
import { toggleCaseConfig } from './toggleCaseConfig';

export const ciphersRegister = Object.freeze({
  'Reverse': reverseConfig,
  'Rail fence': railFenceConfig,
  'Caesar': caesarConfig,
  'Toggle case': toggleCaseConfig,
});
