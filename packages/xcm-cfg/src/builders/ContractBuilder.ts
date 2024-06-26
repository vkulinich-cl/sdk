import { Batch } from './contracts/Batch';
import { Erc20 } from './contracts/Erc20';
import { TokenBridge } from './contracts/TokenBridge';
import { TokenRelayer } from './contracts/TokenRelayer';
import { Xtokens } from './contracts/Xtokens';

export function ContractBuilder() {
  return {
    Batch,
    Erc20,
    TokenBridge,
    TokenRelayer,
    Xtokens,
  };
}
