export interface IDadosEstatisticosPacienteModel {
  quantitativosPorTipoAlergia: IQuantitativosPorTipoAlergiaModel[];
  quantitativosPorTipoProcedimento: IQuantitativosPorTipoProcedimentoModel[];
  diagnosticosPorData: IDiagnosticosPorDataModel[];
  quantitativosPorTipoEspecializacao: IQuantitativosPorTipoEspecializacaoModel[];
  quantiativoMedicamentos: number;
  quantiativoAlergia: number;
  quantiativoDoencaCronica: number;
  quantitativoProcedimento: number;
}

export interface IQuantitativosPorTipoAlergiaModel {
  descricao: string;
  quantidade: number;
}

export interface IQuantitativosPorTipoProcedimentoModel {
  descricao: string;
  quantidade: number;
}

export interface IDiagnosticosPorDataModel {
  procedimento: string;
  data: Date;
  diagnostico: string;
}

export interface IQuantitativosPorTipoEspecializacaoModel {
  descricao: string;
  quantidade: number;
}
