import { Abi } from '@galacticcouncil/xcm-core';
import { EvmTransfer } from './EvmTransfer';

export class TokenBridge extends EvmTransfer {
  get abi() {
    return Abi.TokenBridge;
  }

  get asset(): string {
    const { args } = this.config;
    const [asset] = args;
    return asset;
  }
}
