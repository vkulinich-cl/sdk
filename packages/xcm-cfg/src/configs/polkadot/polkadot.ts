import { AssetConfig, ChainConfig } from '@galacticcouncil/xcm-core';

import { dot } from '../../assets';
import { assetHub, bifrost, hydraDX, polkadot } from '../../chains';
import { BalanceBuilder, ExtrinsicBuilder } from '../../builders';

const xcmDeliveryFeeAmount = 0.047;

const toHydraDX: AssetConfig[] = [
  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().system().account(),
    destination: hydraDX,
    destinationFee: {
      amount: 0.002172,
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilder()
      .xcmPallet()
      .limitedReserveTransferAssets(0)
      .here(),
    fee: {
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),
];

const toBifrost: AssetConfig[] = [
  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().system().account(),
    destination: bifrost,
    destinationFee: {
      amount: 0.001,
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilder()
      .xcmPallet()
      .limitedReserveTransferAssets(0)
      .here(),
    fee: {
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),
];

const toAssetHub: AssetConfig[] = [
  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().system().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0.00014,
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilder().xcmPallet().limitedTeleportAssets(0).here(),
    fee: {
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),
];

export const polkadotConfig = new ChainConfig({
  assets: [...toHydraDX, ...toBifrost, ...toAssetHub],
  chain: polkadot,
});
