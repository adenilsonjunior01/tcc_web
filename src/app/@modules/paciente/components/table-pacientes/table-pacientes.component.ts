import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from '@app/services/paciente/paciente.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../../@core/logger.service';
import { IPacientesPaginadoModel, Content } from '../../../../models/pacientes-paginado-model';

const log = new Logger('Pacientes');

@Component({
  selector: 'app-table-pacientes',
  templateUrl: './table-pacientes.component.html',
  styleUrls: ['./table-pacientes.component.scss'],
})
export class TablePacientesComponent implements OnInit, OnDestroy, OnChanges {
  @Input() paciente: any;
  @Input() reload: any;
  pacientes: Content[];
  loading = false;

  constructor(private readonly _router: Router, private readonly _pacienteService: PacienteService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.paciente.length > 0) {
      this.pacientes = this.paciente;
    }

    if (this.reload == true) {
      this.getAllPacientes();
    }
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getListaPacientes();
    this.getAllPacientes(5);
  }

  public getAllPacientes(size = 5): void {
    this.loading = true;
    this._pacienteService
      .getAllPacientes(size)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (body: IPacientesPaginadoModel) => {
          this.pacientes = body.content;
        },
        error: (error) => {
          log.error(error);
        },
      });
  }

  public verificaSexoUsuario(sexo: string): string {
    if (sexo == 'M') return './assets/profile/boy-1.svg';
    return './assets/profile/girl-1.svg';
  }

  public getListaPacientes(): void {
    // this.pacientes = this.listaPacientesMock.listaPacientes();
  }

  public openDetails(paciente: any): void {
    this._router.navigate(['/pacientes/detalhes'], { state: paciente });
  }
}
