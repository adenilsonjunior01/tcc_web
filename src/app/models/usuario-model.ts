import { IEnderecoModel } from './endereco-model';

export interface IUsuarioModel {
  email: string;
  nome: string;
  dtNascimento: Date;
  sexo: string;
  senha?: string;
  telefone: string;
  endereco?: IEnderecoModel;
  perfil?: number;
}
