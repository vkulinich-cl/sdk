import { Chain as EvmDef } from 'viem';
import { Chain, ChainAssetData, ChainParams, ChainType } from './Chain';
import { EvmClient, WormholeChain, WormholeDef } from '../evm';

export interface EvmChainParams extends ChainParams<ChainAssetData> {
  defEvm: EvmDef;
  defWormhole?: WormholeDef;
}

export class EvmChain extends Chain<ChainAssetData> implements WormholeChain {
  readonly defEvm: EvmDef;
  readonly defWormhole?: WormholeDef;

  constructor({ defEvm, defWormhole, ...others }: EvmChainParams) {
    super({ ...others });
    this.defEvm = defEvm;
    this.defWormhole = defWormhole;
  }

  get client(): EvmClient {
    return new EvmClient(this.defEvm);
  }

  getType(): ChainType {
    return ChainType.EvmChain;
  }

  getWormholeId(): number {
    if (this.defWormhole) {
      return this.defWormhole.id;
    }
    throw new Error('Wormhole configuration missing');
  }

  getTokenBridge(): string {
    if (this.defWormhole) {
      return this.defWormhole.tokenBridge;
    }
    throw new Error('Wormhole configuration missing');
  }

  getTokenRelayer(): string | undefined {
    if (this.defWormhole) {
      return this.defWormhole.tokenRelayer;
    }
    throw new Error('Wormhole configuration missing');
  }
}
