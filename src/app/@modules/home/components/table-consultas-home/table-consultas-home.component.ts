import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IConsultasModel } from '@app/models/consultas-model';
import { ClinicaService } from '@app/services/clinica/clinica.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../../@core/logger.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IConsultaModel } from '../../../../models/consultas-model';
import { AnimationOptions } from 'ngx-lottie';
import { ListaTemporalidade } from '../../mocks/lista-temporalidade';
import { FormControl } from '@angular/forms';

const log = new Logger('Consultas');

@Component({
  selector: 'app-table-consultas-home',
  templateUrl: './table-consultas-home.component.html',
  styleUrls: ['./table-consultas-home.component.scss'],
})
export class TableConsultasHomeComponent implements OnInit, OnDestroy {
  @Input() perfil: string;
  @Input() idMedico: number;

  constructor(private readonly _clinicaService: ClinicaService) {}

  public consultas: IConsultaModel[] = [];
  public loading = false;

  public itemsPerPage = 10;
  public currentPage: number;
  public totalItems: number;
  public page = 0;
  public temporalidadeControl = new FormControl();

  public opcoesTemporalidade: any[] = [];

  ngOnDestroy(): void {}

  date: any;

  ngOnInit(): void {
    this.date = new Date().toString();
    // this.getAllConsultas();
    this.opcoesTemporalidade = ListaTemporalidade.getListaOpcoesTemporalidade();
    this.temporalidadeControl.setValue(this.opcoesTemporalidade[0].value);

    this.verifyProfile();
  }

  public options: AnimationOptions = {
    path: '/assets/lottie/lottie-search.json',
  };

  public verifyProfile(): void {
    if (this.perfil.toUpperCase() === 'MEDICO') {
      this.getAllConsultasMedico();
    } else {
      this.getAllConsultas();
    }
  }

  public getAllConsultas(page = 0): void {
    this.loading = true;
    this.consultas = [];
    this._clinicaService
      .getAllConsultas(this.itemsPerPage, page)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (body: IConsultasModel) => {
          this.consultas = body.content;
          this.page = page + 1;
          this.totalItems = body.totalElements;
        },
        error: (error: HttpErrorResponse) => {
          log.error(error);
        },
      });
  }

  public getAllConsultasMedico(page = 0): void {
    this.loading = true;
    this.consultas = [];
    this._clinicaService
      .getAllConsultasMedico(this.itemsPerPage, page, this.idMedico, this.temporalidadeControl.value)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (body: IConsultasModel) => {
          this.consultas = body.content;
          this.page = page + 1;
          this.totalItems = body.totalElements;
        },
        error: (error: HttpErrorResponse) => {
          log.error(error);
        },
      });
  }

  public pageChanged(event: number): void {
    if (this.perfil.toUpperCase() === 'MEDICO') {
      this.getAllConsultasMedico(event - 1);
    } else {
      this.getAllConsultas(event - 1);
    }
    this.page = event;
  }
}
