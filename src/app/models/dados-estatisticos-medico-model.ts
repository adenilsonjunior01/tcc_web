import { IConsultaMensalPorStatusModel } from './dados-estatisticos-auxiliar-home';
import { IPacienteConsultaModel } from './dados-estastisticos-administrador';

export interface IDadosEstatisticosMedicoModel {
    pacienteConsulta: IPacienteConsultaModel[];
    consultaMensalPorStatus: IConsultaMensalPorStatusModel[];
}
