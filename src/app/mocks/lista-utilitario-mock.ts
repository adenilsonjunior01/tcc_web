export class ListaUtilitarioMock {
    constructor() {}

    public getListaPerfil(): Array<object> {
        return [
            {
                id: 1,
                name: 'Administrador',
            },
            {
                id: 2,
                name: 'Funcionário',
            },
            {
                id: 3,
                name: 'Médico',
            },
        ];
    }

    public getListaStatus(): Array<object> {
        return [
            {
                id: 1,
                status: 'Ativo',
            },
            {
                id: 2,
                status: 'Inativo',
            },
        ];
    }

    public getListaSexos(): Array<object> {
        return [
            {
                id: 1,
                name: 'Masculino',
                value: 'M',
            },
            {
                id: 2,
                name: 'Feminino',
                value: 'F',
            },
        ];
    }

    public getEstados(): Array<object> {
        return [
            {
                id: 12,
                countryId: 1058,
                name: 'Acre',
                abbreviation: 'AC',
                region: 'Norte',
                principalCity: 'Rio Branco',
                latitude: -9.0237964,
                longitude: -70.8119953,
            },
            {
                id: 27,
                countryId: 1058,
                name: 'Alagoas',
                abbreviation: 'AL',
                region: 'Nordeste',
                principalCity: 'Maceió',
                latitude: -9.5713058,
                longitude: -36.7819505,
            },
            {
                id: 16,
                countryId: 1058,
                name: 'Amapá',
                abbreviation: 'AP',
                region: 'Norte',
                principalCity: 'Macapá',
                latitude: 0.9019925,
                longitude: -52.0029565,
            },
            {
                id: 13,
                countryId: 1058,
                name: 'Amazonas',
                abbreviation: 'AM',
                region: 'Norte',
                principalCity: 'Manaus',
                latitude: -3.4168427,
                longitude: -65.8560646,
            },
            {
                id: 29,
                countryId: 1058,
                name: 'Bahia',
                abbreviation: 'BA',
                region: 'Nordeste',
                principalCity: 'Salvador',
                latitude: -12.579738,
                longitude: -41.7007272,
            },
            {
                id: 23,
                countryId: 1058,
                name: 'Ceará',
                abbreviation: 'CE',
                region: 'Nordeste',
                principalCity: 'Fortaleza',
                latitude: -5.4983977,
                longitude: -39.3206241,
            },
            {
                id: 53,
                countryId: 1058,
                name: 'Distrito Federal',
                abbreviation: 'DF',
                region: 'Centro-Oeste',
                principalCity: 'Brasília',
                latitude: -15.7997654,
                longitude: -47.8644715,
            },
            {
                id: 32,
                countryId: 1058,
                name: 'Espírito Santo',
                abbreviation: 'ES',
                region: 'Sudeste',
                principalCity: 'Vitória',
                latitude: -19.1834229,
                longitude: -40.3088626,
            },
            {
                id: 52,
                countryId: 1058,
                name: 'Goiás',
                abbreviation: 'GO',
                region: 'Centro-Oeste',
                principalCity: 'Goiânia',
                latitude: -15.8270369,
                longitude: -49.8362237,
            },
            {
                id: 21,
                countryId: 1058,
                name: 'Maranhão',
                abbreviation: 'MA',
                region: 'Nordeste',
                principalCity: 'São Luís',
                latitude: -4.9609498,
                longitude: -45.2744159,
            },
            {
                id: 51,
                countryId: 1058,
                name: 'Mato Grosso',
                abbreviation: 'MT',
                region: 'Centro-Oeste',
                principalCity: 'Cuiabá',
                latitude: -12.6818712,
                longitude: -56.921099,
            },
            {
                id: 50,
                countryId: 1058,
                name: 'Mato Grosso do Sul',
                abbreviation: 'MS',
                region: 'Centro-Oeste',
                principalCity: 'Campo Grande',
                latitude: -20.7722295,
                longitude: -54.7851531,
            },
            {
                id: 31,
                countryId: 1058,
                name: 'Minas Gerais',
                abbreviation: 'MG',
                region: 'Sudeste',
                principalCity: 'Belo Horizonte',
                latitude: -18.512178,
                longitude: -44.5550308,
            },
            {
                id: 15,
                countryId: 1058,
                name: 'Pará',
                abbreviation: 'PA',
                region: 'Norte',
                principalCity: 'Belém',
                latitude: -1.9981271,
                longitude: -54.9306152,
            },
            {
                id: 25,
                countryId: 1058,
                name: 'Paraíba',
                abbreviation: 'PB',
                region: 'Nordeste',
                principalCity: 'João Pessoa',
                latitude: -7.2399609,
                longitude: -36.7819505,
            },
            {
                id: 41,
                countryId: 1058,
                name: 'Paraná',
                abbreviation: 'PR',
                region: 'Sul',
                principalCity: 'Curitiba',
                latitude: -25.2520888,
                longitude: -52.0215415,
            },
            {
                id: 26,
                countryId: 1058,
                name: 'Pernambuco',
                abbreviation: 'PE',
                region: 'Nordeste',
                principalCity: 'Recife',
                latitude: -8.8137173,
                longitude: -36.954107,
            },
            {
                id: 22,
                countryId: 1058,
                name: 'Piauí',
                abbreviation: 'PI',
                region: 'Nordeste',
                principalCity: 'Teresina',
                latitude: -7.7183401,
                longitude: -42.7289236,
            },
            {
                id: 33,
                countryId: 1058,
                name: 'Rio de Janeiro',
                abbreviation: 'RJ',
                region: 'Sudeste',
                principalCity: 'Rio de Janeiro',
                latitude: -22.9068467,
                longitude: -43.1728965,
            },
            {
                id: 24,
                countryId: 1058,
                name: 'Rio Grande do Norte',
                abbreviation: 'RN',
                region: 'Nordeste',
                principalCity: 'Natal',
                latitude: -5.4025803,
                longitude: -36.954107,
            },
            {
                id: 43,
                countryId: 1058,
                name: 'Rio Grande do Sul',
                abbreviation: 'RS',
                region: 'Sul',
                principalCity: 'Porto Alegre',
                latitude: -30.0346316,
                longitude: -51.2176986,
            },
            {
                id: 11,
                countryId: 1058,
                name: 'Rondônia',
                abbreviation: 'RO',
                region: 'Norte',
                principalCity: 'Porto Velho',
                latitude: -11.5057341,
                longitude: -63.580611,
            },
            {
                id: 14,
                countryId: 1058,
                name: 'Roraima',
                abbreviation: 'RR',
                region: 'Norte',
                principalCity: 'Boa Vista',
                latitude: 2.7375971,
                longitude: -62.0750998,
            },
            {
                id: 42,
                countryId: 1058,
                name: 'Santa Catarina',
                abbreviation: 'SC',
                region: 'Sul',
                principalCity: 'Florianópolis',
                latitude: -27.2423392,
                longitude: -50.2188556,
            },
            {
                id: 35,
                countryId: 1058,
                name: 'São Paulo',
                abbreviation: 'SP',
                region: 'Sudeste',
                principalCity: 'São Paulo',
                latitude: -23.5505199,
                longitude: -46.6333094,
            },
            {
                id: 28,
                countryId: 1058,
                name: 'Sergipe',
                abbreviation: 'SE',
                region: 'Nordeste',
                principalCity: 'Aracaju',
                latitude: -10.5740934,
                longitude: -37.3856581,
            },
            {
                id: 17,
                countryId: 1058,
                name: 'Tocantins',
                abbreviation: 'TO',
                region: 'Norte',
                principalCity: 'Palmas',
                latitude: -10.17528,
                longitude: -48.2982474,
            },
        ];
    }

    public getMedicos(): Array<object> {
        return [
            {
                id: 1,
                nomeCompleto: 'Marcelo Santos',
                crm: '4152658',
                especialidade: 'Teste',
                area: 'Teste',
            },
            {
                id: 2,
                nomeCompleto: 'Augusto Pereira',
                crm: '4152658',
                especialidade: 'Teste',
                area: 'Teste',
            },
            {
                id: 3,
                nomeCompleto: 'Joana Souza',
                crm: '4152658',
                especialidade: 'Teste',
                area: 'Teste',
            },
            {
                id: 4,
                nomeCompleto: 'Ana Maria Silva',
                crm: '4152658',
                especialidade: 'Teste',
                area: 'Teste',
            },
            {
                id: 5,
                nomeCompleto: 'Cleiton Soares',
                crm: '4152658',
                especialidade: 'Teste',
                area: 'Teste',
            },
        ];
    }

    /**
     * @description fonte: https://www.educamaisbrasil.com.br/educacao/carreira/saiba-quais-sao-as-especializacoes-da-medicina-e-suas-funcoes
     */
    public listaEspecializacoes(): Array<object> {
        return [
            {
                id: 1,
                description: 'Acupuntura',
            },
            {
                id: 2,
                description: 'Alergia e imunologia',
            },
            {
                id: 3,
                description: 'Anestesiologia',
            },
            {
                id: 4,
                description: 'Angiologia',
            },
            {
                id: 5,
                description: 'Cancerologia',
            },
            {
                id: 6,
                description: 'Cirurgia cardiovascular',
            },
            {
                id: 7,
                description: 'Cirurgia da mão',
            },
            {
                id: 8,
                description: 'Cirurgia de cabeça e pescoço',
            },
            {
                id: 9,
                description: 'Cirurgia do aparelho digestivo',
            },
            {
                id: 10,
                description: 'Cirurgia geral',
            },
        ];
    }
}
