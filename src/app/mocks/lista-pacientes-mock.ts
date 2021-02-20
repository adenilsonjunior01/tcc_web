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
        perfil: 'Paciente',
        tipoSanguineo: 'B+',
        sexo: 'M',
        idade: 45,
      },
      {
        id: 2,
        name: 'Lebron Wayde',
        perfil: 'Paciente',
        tipoSanguineo: 'A+',
        sexo: 'M',
        idade: 52,
      },
      {
        id: 3,
        name: 'Brad Simomns',
        perfil: 'Paciente',
        tipoSanguineo: 'O+',
        sexo: 'M',
        idade: 23,
      },
      {
        id: 4,
        name: 'Welida Lebron',
        perfil: 'Paciente',
        tipoSanguineo: 'A',
        sexo: 'F',
        idade: 60,
      },
      {
        id: 5,
        name: 'Natali Trump',
        perfil: 'Paciente',
        tipoSanguineo: 'A-',
        sexo: 'F',
        idade: 33,
      },
    ];
  }
}
