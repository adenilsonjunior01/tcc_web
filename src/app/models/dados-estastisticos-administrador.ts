export interface IDadosEstatisticosModel {
    medicoAtendimento: IMedicoAtendimentoModel[];
    pacienteConsulta: IPacienteConsultaModel[];
    consultaMensalPorStatus: IConsultaMensalPorStatusModel[];
    especializacoesMes: IEspecializacoesMedicosModel[];
    quantitativoUsuarios: IQuantitativoUsuariosModel[];
}

export interface IMedicoAtendimentoModel {
    descricao: string;
    quantidade: number;
}

export interface IPacienteConsultaModel {
    descricao: string;
    quantidade: number;
}

export interface IConsultaMensalPorStatusModel {
    descricao: string;
    quantidade: number;
}

export interface IEspecializacoesMedicosModel {
    descricao: string;
    quantidade: number;
}

export interface IQuantitativoUsuariosModel {
    descricao: string;
    quantidade: number;
}
