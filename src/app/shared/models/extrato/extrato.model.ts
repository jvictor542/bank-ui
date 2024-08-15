import {IContaCorrente} from "@app/shared";
import {Operacao} from "@shared/enums";

export interface IExtrato {
  dataHoraMovimento: Date;
  valor: number;
  contaCorrenteId: number;
  contaDestinoId: number;
  operacao: Operacao;
}
