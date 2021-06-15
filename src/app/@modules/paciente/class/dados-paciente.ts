export class DadosPaciente {
    constructor() {}

    public setDadosProntuarioLocalStorage(dados: any): void {
        localStorage.setItem('__dadosProntuario', JSON.stringify(dados));
    }

    public getDadosProntuarioLocalStorage(): any {
        return JSON.parse(localStorage.getItem('__dadosProntuario'));
    }

    public removeDadosProntuarioLocalStorage(): void {
        localStorage.removeItem('__dadosProntuario');
    }

    public setDadosPacienteLocalStorage(dados: any): void {
        localStorage.setItem('__dadosPaciente', JSON.stringify(dados));
    }

    public getDadosPacienteLocalStorage(): any {
        return JSON.parse(localStorage.getItem('__dadosPaciente'));
    }

    public removeDadosPacienteLocalStorage(): void {
        localStorage.removeItem('__dadosPaciente');
    }

    public setDadosMedicosLocalStorage(dados: any): void {
        localStorage.setItem('__dadosMedico', JSON.stringify(dados));
    }

    public getDadosMedicosLocalStorage(): any {
        return JSON.parse(localStorage.getItem('__dadosMedico'));
    }
}
