import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDadosUserModel } from '../../../../../models/dados-user-model';
import { UsuarioService } from '../../../../../services/usuario/usuario.service';
import { untilDestroyed } from '../../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../../../@core/logger.service';
import { DadosMedicosService } from '../../../../../services/dados-medicos/dados-medicos.service';
import { IDadosMedicosPacienteModel } from '../../../../../models/dados-medicos-paciente';

const log = new Logger('Dados Home Paciente');

@Component({
  selector: 'app-box-info-paciente',
  templateUrl: './box-info-paciente.component.html',
  styleUrls: ['./box-info-paciente.component.scss'],
})
export class BoxInfoPacienteComponent implements OnInit, OnDestroy {
  public dadosUser: IDadosUserModel;
  public dadosMedicos: any;
  public loading = false;
  public messageError = '';

  constructor(
    private readonly _userService: UsuarioService,
    private readonly _dadosMedicosService: DadosMedicosService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getDadosUser();
    this.getDadosMedicos();
  }

  public getDadosUser(): void {
    this.loading = true;
    this._userService
      .getDadosUser()
      .pipe(
        untilDestroyed(this),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (body: IDadosUserModel) => {
          this.dadosUser = body;
        },
        error: (error) => {
          log.error(error);
        },
      });
  }

  public getDadosMedicos(): any {
    this._dadosMedicosService
      .getDadosMedicos()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (body: IDadosMedicosPacienteModel) => {
          this.dadosMedicos = body;
        },
        error: (error) => {
          log.error(error);
          this.messageError = error?.error?.message;
        },
      });
  }
}
