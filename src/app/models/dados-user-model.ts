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
  endereco?: any;
  cpf?: any;
  medico?: any;
  paciente?: any;
}
