import { IMedicamentoModel } from './medicamento-model';
import { IAlergiaModel } from './alergia-model';
import { ITipoSanguineoModel } from './tipo-sanguineo-model';

export interface IDadosMedicosPacienteModel {
  id: number;
  tipoSanguineo: ITipoSanguineoModel;
  dtAtualizacao: string;
  doencasCronicas: any[];
  medicamentos: IMedicamentoModel[];
  peso?: any;
  altura?: any;
  vlImc?: any;
  descImc?: any;
  alergias: IAlergiaModel[];
  idade: number;
  nomeProfissionalSaude?: any;
}
