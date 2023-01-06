import { ApiPromise, WsProvider } from '@polkadot/api';

export enum ApiUrl {
  Basilisk = 'wss://rpc.basilisk.cloud',
  Basilisk_UK = 'wss://basilisk-mainnet-rpc-07.basilisk.cloud',
  Basilisk_Dev = 'wss://rpc01.hydration.dev',
  Basilisk_Rococo = 'wss://rococo-basilisk-rpc.hydration.dev',
  Basilisk_Rococo_UK = 'wss://rococo-basilisk-rpc04.hydration.dev',
  Hydra_Dev = 'wss://hydradx-devnet-rpc.play.hydration.cloud',
  Hydra_Rococo = 'wss://hydradx-rococo-rpc.play.hydration.cloud',
  Hydra = 'wss://rpc.hydradx.cloud',
}

export abstract class PolkadotExecutor {
  protected readonly apiUrl: ApiUrl;
  protected readonly desc: string;
  protected readonly pretty: boolean;

  constructor(apiUrl: ApiUrl, desc: string, pretty?: boolean) {
    this.apiUrl = apiUrl;
    this.desc = desc;
    this.pretty = pretty || false;
  }

  async run() {
    try {
      const provider = new WsProvider(this.apiUrl);
      const api = new ApiPromise({
        provider: provider,
      });

      api
        .on('connected', () => console.log('API connected'))
        .on('disconnected', () => console.log('API disconnected'))
        .on('error', () => console.log('API error'))
        .on('ready', () => {
          console.log('API ready');
          console.log('Running script...');
          console.log(this.desc);
          this.script(api)
            .then((output: any) => {
              if (this.pretty) {
                console.log(output ? JSON.stringify(output, null, 2) : '');
              } else {
                console.log(output);
              }
              return null;
            })
            .catch((e) => console.log(e))
            .finally(() => api.disconnect());
        });
    } catch (error) {
      console.log(error);
    }
  }

  abstract script(api: ApiPromise): Promise<any>;
}
