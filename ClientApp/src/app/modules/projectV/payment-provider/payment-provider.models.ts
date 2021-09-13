export class PaymentProviderList {
  id: number;
  name: string;
  isEnabled: boolean;
  configureUrl: string
}

export class FlutteraveConfigForm {
  isSanbox: boolean;
  publicKey: string;
  secretKey: string
  encryptionKey: string
  paymentFee: number;
  paymentOptions: string[]
  environment: string
}
