export class ListaTemporalidade {
    constructor() {}

    public static getListaOpcoesTemporalidade(): Array<object> {
        return [
            {
                id: 1,
                text: 'Dia',
                value: 0,
            },
            {
                id: 2,
                text: 'Semanal',
                value: 1,
            },
            {
                id: 3,
                text: 'Mensal',
                value: 2,
            },
        ];
    }

    public static getListaOpcoesTemporalidadeHome(): Array<object> {
        return [
            {
                id: 1,
                text: 'Dia',
                value: 0,
            },
            {
                id: 2,
                text: 'Semanal',
                value: 1,
            },
            {
                id: 3,
                text: 'Mensal',
                value: 2,
            },
            {
                id: 4,
                text: 'Todos',
                value: 3,
            },
        ];
    }
}
