import { BalanceBuilder } from '@moonbeam-network/xcm-builder';
import { AssetConfig, ChainConfig } from '@moonbeam-network/xcm-config';

import { bnc, vdot } from '../assets';
import { bifrost, hydraDX } from '../chains';
import { ExtrinsicBuilderV3 } from '../builders';

const toHydraDX: AssetConfig[] = [
  new AssetConfig({
    asset: bnc,
    balance: BalanceBuilder().substrate().system().account(),
    destination: hydraDX,
    destinationFee: {
      amount: 0.014645,
      asset: bnc,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV3().xTokens().transfer(),
  }),
  new AssetConfig({
    asset: vdot,
    balance: BalanceBuilder().substrate().tokens().accounts(),
    destination: hydraDX,
    destinationFee: {
      amount: 0.000555,
      asset: vdot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV3().xTokens().transfer(),
  }),
];

export const bifrostConfig = new ChainConfig({
  assets: [...toHydraDX],
  chain: bifrost,
});