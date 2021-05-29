import { Pageable, Sort2 } from './pacientes-paginado-model';

export interface IMedicamentosReceitadosModel {
  content: IContentMedicamentosModel[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  sort: Sort2;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export interface IContentMedicamentosModel {
  id: number;
  descMedicamento: string;
  dtRegistro: string;
  duracaoTratamento: string;
  dosagem: string;
}
