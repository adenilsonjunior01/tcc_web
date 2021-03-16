import { IEnderecoModel } from './endereco-model';

export interface IClinicaModel {
  id?: number;
  nome: string;
  dtAbertura: string;
  dtEncerramento: string;
  endereco?: IEnderecoModel;
}
