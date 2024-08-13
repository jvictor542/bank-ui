import {IAgencia, ICliente} from "@app/shared";

export interface IContaCorrente {
  numero: string;
  id: bigint;
  saldo: number;
  agencia: IAgencia;
  cliente: ICliente
}
