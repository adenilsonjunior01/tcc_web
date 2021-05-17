import { Pageable, Sort2 } from './pacientes-paginado-model';
import { IPacienteModel } from './paciente-model';
import { IMedicoModel } from './medico-model';
import { IProcedimentoModel } from './procedimento-model';

export interface IConsultasModel {
  content: IConsultaModel[];
  pageable: Pageable;
  totalPages: number;
  last: boolean;
  totalElements: number;
  first: boolean;
  sort: Sort2;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export interface IConsultaModel {
  id: number;
  paciente: IPacienteModel;
  medico: IMedicoModel;
  dtInicio: string;
  dtFim: Date;
  procedimento: IProcedimentoModel;
  observacao: string;
  idTipoProcedimento?: any;
  idPaciente?: any;
  idMedico?: any;
  status?: string;
}
