import { IEnderecoModel } from './endereco-model';
import { IMedicoModel } from './medico-model';

export interface IDadosUserModel {
    email?: any;
    senha?: any;
    idUser: number;
    nome: string;
    sexo: string;
    telefone: string;
    dtNascimento: string;
    perfil?: any;
    perfisCadastrados: string[];
    endereco: IEnderecoModel;
    cpf: string;
    medico?: IMedicoModel;
    paciente?: any;
}
