import {IContaCorrente} from "@app/shared";
import {Operacao} from "@shared/enums";

export interface IExtrato {
  id: bigint;
  dataHoraMovimento: Date;
  valor: number;
  contaCorrete: IContaCorrente;
  contaDestino: IContaCorrente;
  operacao: Operacao;
}
