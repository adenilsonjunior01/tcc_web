import { ITipoAlergiaModel } from './tipo-alergia-model';
export interface IAlergiaModel {
    id?: number;
    descAlergia: string;
    idTipoAlergia?: number;
    tipoAlergia?: ITipoAlergiaModel;
    profissionalSaude?: any;
}
