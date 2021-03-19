import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ICredentialsModel } from '../models/credentials-model';

export interface Credentials {
  email: string;
  token: string;
}

export interface Token {
  perfis: string[];
  sub: string;
  dtCadastro: Date;
  nome: string;
  export: number;
  id: number;
  idPerfil: number;
}

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private _credentials: Credentials | null = null;
  private readonly _jwtHelper = new JwtHelperService();

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
      this.decodeToken();
      this.verifyProfilePaciente();
      this.verifyProfileAdm();
      this.verifyProfileAssitente();
      this.verifyProfileMedico();
    }
  }

  public tokenDecode: Token;
  public perfil: string;
  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * @return Retorna credencais do usuário.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  get profile(): string | null {
    return localStorage.getItem('perfil');
  }

  setCredentials(credentials?: ICredentialsModel, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  public isTokenExpired(): boolean {
    return this._jwtHelper.isTokenExpired(this._credentials.token);
  }

  public expirationDate(): any {
    return this._jwtHelper.getTokenExpirationDate(this.credentials.token);
  }

  public decodeToken(): Token {
    this.tokenDecode = this._jwtHelper.decodeToken(this.credentials.token);
    return this.tokenDecode;
  }

  private verifyProfileMedico() {
    const status = this.tokenDecode.perfis.filter((v: string) => v === 'MEDICO');
    if (status.length > 0) {
      this.perfil = status[0];
      this.setProfileLocalStorage(this.perfil);
    }
  }
  private verifyProfilePaciente() {
    const status = this.tokenDecode.perfis.filter((v: string) => v === 'PACIENTE');
    if (status.length > 0) {
      this.perfil = status[0];
      this.setProfileLocalStorage(this.perfil);
    }
  }
  private verifyProfileAssitente() {
    const status = this.tokenDecode.perfis.filter((v: string) => v === 'AUXILIAR');
    if (status.length > 0) {
      this.perfil = status[0];
      this.setProfileLocalStorage(this.perfil);
    }
  }
  private verifyProfileAdm() {
    const status = this.tokenDecode.perfis.filter((v: string) => v === 'ADMINISTRADOR');
    if (status.length > 0) {
      this.perfil = status[0];
      this.setProfileLocalStorage(this.perfil);
    }
  }

  private setProfileLocalStorage(perfil: string) {
    localStorage.setItem('perfil', perfil);
  }
}
