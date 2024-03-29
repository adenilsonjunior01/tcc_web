import { IEnderecoModel } from './endereco-model';

export interface IUsuarioModel {
    id?: number;
    email: string;
    nome: string;
    dtNascimento: Date;
    sexo: string;
    senha?: string;
    cpf?: string;
    telefone: string;
    endereco?: IEnderecoModel;
    perfil?: number;
    idPaciente?: number;
}
