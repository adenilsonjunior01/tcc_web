export interface IPacientesPaginadoModel {
  content: Content[];
  pageable: Pageable;
  totalPages: number;
  last: boolean;
  totalElements: number;
  first: boolean;
  sort: Sort2;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export interface Content {
  idPaciente: number;
  descConvenio: string;
  nuInscricaoConvenio: string;
  nuTelefone: string;
  nome: string;
  idUser: number;
  cpf: string;
  telefone: string;
  sexo: string;
  compartilhaDados?: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort2 {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
