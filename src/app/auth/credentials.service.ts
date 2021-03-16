import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface Credentials {
  email: string;
  token: string;
}

export interface Token {
  perfil: string[];
  sub: string;
  dtCadastro: Date;
  nome: string;
  export: number;
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
    }
  }

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

  setCredentials(credentials?: Credentials, remember?: boolean) {
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
    return this._jwtHelper.decodeToken(this.credentials.token);
  }
}
