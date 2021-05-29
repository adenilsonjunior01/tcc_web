export interface IDadosEstatisticosAuxiliarModel {
  quantitativoUsuarios: IQuantitativoUsuarioModel[];
  consultaMensalPorStatus: IConsultaMensalPorStatusModel[];
}

export interface IConsultaMensalPorStatusModel {
  descricao: string;
  quantidade: number;
}

export interface IQuantitativoUsuarioModel {
  descricao: string;
  quantidade: number;
}
