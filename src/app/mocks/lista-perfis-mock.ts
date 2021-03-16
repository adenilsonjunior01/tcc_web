
export interface IListaPerfil {
  id: number;
  description: string;
}


export class ListaPerfilMock {

  constructor() {}

  public getListaPerfil(): Array<IListaPerfil> {
    return [
      {
        id: 3,
        description: 'Paciente'
      },
      {
        id: 4,
        description: 'Médico'
      },
      {
        id: 5,
        description: 'Auxiliar Admnistrativo'
      },
      {
        id: 6,
        description: 'Administrador'
      },
    ]
  }

  public getStatusAtivoInativo(): Array<IListaPerfil> {
    return [
      {
        id: 1,
        description: 'Ativo'
      },
      {
        id: 2,
        description: 'Inativo'
      }
    ]
  }
}
