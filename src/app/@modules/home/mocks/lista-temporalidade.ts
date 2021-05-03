export class ListaTemporalidade {
  constructor() {}

  public static getListaOpcoesTemporalidade(): Array<object> {
    return [
      {
        id: 1,
        text: 'Dia',
        value: 1,
      },
      {
        id: 2,
        text: 'Semanal',
        value: 2,
      },
      {
        id: 3,
        text: 'Mensal',
        value: 3,
      },
    ];
  }
}
