import { IEspecializacaoModel } from './especializacao-model';

export interface IMedicoModel {
  idUser: number;
  crm: string;
  especializacoes: IEspecializacaoModel[];
}
