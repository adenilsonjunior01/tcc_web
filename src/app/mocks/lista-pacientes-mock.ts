export class ListaPacientesMock {
  constructor() {}

  public listaPacientes(): Array<object> {
    return [
      {
        id: 1,
        name: 'Brad Simomns',
        perfil: 'Paciente',
        sexo: 'M',
        documento: '000.000.000-00',
        email: 'teste@teste.com',
        telefone: '0 0000 0000',
        ddd: '00',
        status: 'A',
        dadosMedicos: {
          id: 1,
          tipoSanguineo: 'B+',
          idade: 45,
          altura: 1.70,
          peso: 80
        },
      },
      {
        id: 2,
        name: 'Jessie Clarcson',
        perfil: 'Paciente',
        sexo: 'F',
        documento: '000.000.000-00',
        email: 'teste@teste.com',
        telefone: '0 0000 0000',
        ddd: '00',
        status: 'I',
        dadosMedicos: {
          id: 1,
          tipoSanguineo: 'B+',
          idade: 45,
          altura: 1.70,
          peso: 80
        },
      },
      {
        id: 3,
        name: 'Lebron Wayde',
        perfil: 'Paciente',
        sexo: 'M',
        documento: '000.000.000-00',
        email: 'teste@teste.com',
        telefone: '0 0000 0000',
        ddd: '00',
        status: 'A',
        dadosMedicos: {
          id: 1,
          tipoSanguineo: 'B+',
          idade: 45,
          altura: 1.70,
          peso: 80
        },
      },
      {
        id: 4,
        name: 'Wayde Lebron',
        perfil: 'Paciente',
        sexo: 'M',
        documento: '000.000.000-00',
        email: 'teste@teste.com',
        telefone: '0 0000 0000',
        ddd: '00',
        status: 'I',
        dadosMedicos: [
          {
            id: 1,
            tipoSanguineo: 'B+',
            idade: 45,
            altura: 1.70,
            peso: 80
          },
        ],
      },
      {
        id: 5,
        name: 'Natali Trump',
        perfil: 'Paciente',
        sexo: 'F',
        documento: '000.000.000-00',
        email: 'teste@teste.com',
        telefone: '0 0000 0000',
        ddd: '00',
        status: 'A',
        dadosMedicos: {
          id: 1,
          tipoSanguineo: 'B+',
          idade: 45,
          altura: 1.70,
          peso: 80
        },
      },
    ];
  }

  public listaPacientesMedico(): Array<object> {
    return [
      {
        id: 1,
        name: 'Brad Simomns',
        perfil: 'Medico',
        tipoSanguineo: 'B+',
        email: "brad@email.com",
        documento: '000.000.000-00',
        sexo: 'M',
        idade: 45,
        status: 'A',
      },
      {
        id: 2,
        name: 'Lebron Wayde',
        perfil: 'Assistente',
        tipoSanguineo: 'A+',
        email: "brad@email.com",
        documento: '000.000.000-00',
        sexo: 'M',
        idade: 52,
        status: 'A',
      },
      {
        id: 3,
        name: 'Brad Simomns',
        perfil: 'Assistente',
        tipoSanguineo: 'O+',
        email: "brad@email.com",
        documento: '000.000.000-00',
        sexo: 'M',
        idade: 23,
        status: 'I',
      },
      {
        id: 4,
        name: 'Welida Lebron',
        perfil: 'Medico',
        tipoSanguineo: 'A',
        email: "brad@email.com",
        documento: '000.000.000-00',
        sexo: 'F',
        idade: 60,
        status: 'I',
      },
      {
        id: 5,
        name: 'Natali Trump',
        perfil: 'Assistente',
        tipoSanguineo: 'A-',
        email: "brad@email.com",
        documento: '000.000.000-00',
        sexo: 'F',
        idade: 33,
        status: 'A',
      },
    ];
  }
}
