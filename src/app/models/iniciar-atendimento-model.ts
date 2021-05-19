export interface IIniciarAtendimentoModel {
  id: number;
  consulta: Consulta;
  descProntuario?: any;
  temAlergia?: any;
  temDoencaCronica?: any;
  concordouTermos?: any;
  descSumario?: any;
  documentos?: any;
}

export interface TipoProcedimento {
  id: number;
  descTipoProcedimento: string;
  duracao: string;
}

export interface Especializaco {
  id: number;
  descEspecializacao: string;
}

export interface Medico {
  id: number;
  crm: string;
  hrEntrada?: any;
  hrSaida?: any;
  especializacoes: Especializaco[];
}

export interface Paciente {
  id: number;
  descConvenio: string;
  nuInscricaoConvenio: string;
  nuTelefone?: any;
  dadosmedicos?: any;
  compartilhaDados: boolean;
  documentos: any[];
}

export interface Consulta {
  id: number;
  tipoProcedimento: TipoProcedimento;
  medico: Medico;
  paciente: Paciente;
  dtFim: Date;
  statusConsulta: string;
  confirmada: boolean;
  observacao: string;
  dtIncio: Date;
}
