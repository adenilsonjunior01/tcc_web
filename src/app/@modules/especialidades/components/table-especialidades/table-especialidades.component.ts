import { Component, OnInit, OnDestroy, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';
import { ModalAnimationComponent } from '@app/@shared/modal-animation/modal-animation.component';
import { ListaPacientesMock } from '../../../../mocks/lista-pacientes-mock';
import { IEspecializacaoModel } from '../../../../models/especializacao-model';
import { UtilitariosService } from '../../../../services/utilitarios/utilitarios.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { SweetalertService } from '../../../../@shared/sweetalert/sweetalert.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EspecilidadeService } from '../../../../services/especilidade/especilidade.service';

@Component({
  selector: 'app-table-especialidades',
  templateUrl: './table-especialidades.component.html',
  styleUrls: ['./table-especialidades.component.scss'],
})
export class TableEspecialidadesComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(ModalAnimationComponent) modal: any;
  @Input() recarregarLista: any;

  private readonly listaPacientesMock = new ListaPacientesMock();
  especialidades: IEspecializacaoModel[] = [];
  public loading = false;
  public form: FormGroup;

  constructor(
    private readonly _especialidades: UtilitariosService,
    private readonly _fb: FormBuilder,
    private readonly _sweetAlert: SweetalertService,
    private readonly _especialidadeService: EspecilidadeService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.recarregarLista) {
      this.getEspecialidades();
    }
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getEspecialidades();
    this.initForm();
  }

  public getEspecialidades(): void {
    this.loading = true;
    this._especialidades
      .getEspecializacoes()
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (body: IEspecializacaoModel[]) => {
          this.especialidades = body;
        },
      });
  }

  // SE FOR DESATIVAR, O TEXTO MUDARÁ INFORMANDO O USUÁRIO QUE ELE PODE REATIVAR
  public confirmModal(id: number) {
    Swal.fire({
      icon: 'info',
      title: 'Deseja continuar?',
      text: 'Esta ação não poderá ser revertida.',
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Não`,
    }).then((result) => {
      // CHAMAR END-POINT DE EXCLUSÃO
      if (result.isConfirmed) {
        this.delete(id);
      }
    });
  }

  private sweetAlertConfirm(): void {
    Swal.fire('Item deletado com sucesso!', '', 'success');
  }

  public initForm() {
    this.form = this._fb.group({
      id: [null],
      descEspecializacao: [null, Validators.required],
    });
  }

  public clearForm(): void {
    this.form.get('descEspecializacao').reset();
  }

  public openModal(especializacao: any): void {
    this.form.get('id').setValue(especializacao.id);
    this.form.get('descEspecializacao').setValue(especializacao.descEspecializacao);
    this.modal.show('editar-especialidade');
  }

  public update(): void {
    this.loading = true;
    this._especialidadeService
      .editarEspecializacao(this.form.value, this.form.get('id').value)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: () => {
          this._sweetAlert.openToasty('Especialização atualizada com sucesso!', 'success');
          this.getEspecialidades();
          this.modal.close('editar-especialidade');
        },
      });
  }

  public delete(id: number): void {
    this.loading = true;
    this._especialidadeService
      .deletarEspecializacao(id)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: () => {
          this._sweetAlert.openToasty('Especialização excluída com sucesso!', 'success');
          this.getEspecialidades();
        },
      });
  }
}
