import { caesarConfig } from './caesarConfig';
import { nokia3310Config } from './nokia3310Config';
import { railFenceConfig } from './railFenceConfig';
import { reverseConfig } from './reverseConfig';
import { toggleCaseConfig } from './toggleCaseConfig';
import { trimConfig } from './trimConfig';

export const ciphersRegister = Object.freeze({
  'Reverse': reverseConfig,
  'Rail fence': railFenceConfig,
  'Caesar': caesarConfig,
  'Toggle case': toggleCaseConfig,
  'Trim': trimConfig,
  'Nokia 3310': nokia3310Config,
});
