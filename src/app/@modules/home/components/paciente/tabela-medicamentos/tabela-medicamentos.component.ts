import { Component, OnInit, OnDestroy } from '@angular/core';
import { PacienteService } from '@app/services/paciente/paciente.service';
import { AnimationOptions } from 'ngx-lottie';
import {
  IContentMedicamentosModel,
  IMedicamentosReceitadosModel,
} from '../../../../../models/medicamentos-receitados-model';
import { untilDestroyed } from '../../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../../../@core/logger.service';

const log = new Logger('Tabela de Medicamentos Receitados - Paciente');

@Component({
  selector: 'app-tabela-medicamentos',
  templateUrl: './tabela-medicamentos.component.html',
  styleUrls: ['./tabela-medicamentos.component.scss'],
})
export class TabelaMedicamentosComponent implements OnInit, OnDestroy {
  public loading = false;

  public itemsPerPage = 8;
  public currentPage: number;
  public totalItems: number;
  public page = 0;
  public medicamentos: IContentMedicamentosModel[] = [];

  constructor(private readonly _pacienteService: PacienteService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getMedicamentosReceitados();
  }

  public options: AnimationOptions = {
    path: '/assets/lottie/lottie-search.json',
  };

  public getMedicamentosReceitados(page = 0): void {
    this.loading = true;
    this.medicamentos = [];
    this._pacienteService
      .getMedicamentosReceitados(this.itemsPerPage, page)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (body: IMedicamentosReceitadosModel) => {
          this.medicamentos = body.content;
          this.page = page + 1;
          this.totalItems = body.totalElements;
        },
        error: (error) => {
          log.error(error);
        },
      });
  }

  public pageChanged(event: number): void {
    this.getMedicamentosReceitados(event - 1);
    this.page = event;
  }
}
