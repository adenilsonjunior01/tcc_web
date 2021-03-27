import { IEspecializacaoModel } from './especializacao-model';

export interface IDadosTodosMedicosModel {
  id: number;
  crm: string;
  especializacoes: IEspecializacaoModel[];
  nome: string;
  telefone: string;
  cpf: string;
  idUser?: any;
}
