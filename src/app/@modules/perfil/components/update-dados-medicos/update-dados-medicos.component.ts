import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalAnimationComponent } from '@app/@shared/modal-animation/modal-animation.component';
import { SweetalertService } from '@app/@shared/sweetalert/sweetalert.service';
import { DadosMedicosService } from '../../../../services/dados-medicos/dados-medicos.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { Logger } from '../../../../@core/logger.service';
import { FormGroup } from '@angular/forms';
import { ITipoSanguineoModel } from '../../../../models/tipo-sanguineo-model';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { FormUpdateDadosMedicos } from '../../class/form-update-dados-medicos';
import { finalize } from 'rxjs/operators';
import { IDoencaCronicaModel } from '../../../../models/doenca-cronica-model';
import { IMedicamentoModel } from '../../../../models/medicamento-model';
import { IAlergiaModel } from '../../../../models/alergia-model';
import { IDadosMedicosPacienteModel } from '../../../../models/dados-medicos-paciente';

const log = new Logger('Perfil - Dados Médicos');

@Component({
  selector: 'app-update-dados-medicos',
  templateUrl: './update-dados-medicos.component.html',
  styleUrls: ['./update-dados-medicos.component.scss'],
})
export class UpdateDadosMedicosComponent implements OnInit, OnDestroy {
  @ViewChild(ModalAnimationComponent) modal: any;

  public dadosMedicos: any;
  public tiposSanguineo: ITipoSanguineoModel[];
  public messageError = '';
  public form: FormGroup;
  public loading = false;
  private readonly _formConfig = new FormUpdateDadosMedicos();
  step = 0;
  public doencasCronicas: IDoencaCronicaModel[] = [];
  public medicamentos: IMedicamentoModel[] = [];
  public alergias: IAlergiaModel[] = [];

  constructor(
    private readonly _dadosMedicosService: DadosMedicosService,
    private readonly _sweetAlert: SweetalertService,
    private readonly _usuarioService: UsuarioService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getDadosMedicos();
    this.getTiposSanguineo();
    this.form = this._formConfig.initForm();
  }

  public getDadosMedicos(): any {
    this._dadosMedicosService
      .getDadosMedicos()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (body: IDadosMedicosPacienteModel) => {
          this.dadosMedicos = body;
          this.setDadosMedicos(body);
        },
        error: (error) => {
          log.error(error);
          this.messageError = error?.error?.message;
        },
      });
  }

  private setDadosMedicos(dadosMedicos: IDadosMedicosPacienteModel): void {
    this.doencasCronicas = dadosMedicos.doencasCronicas;
    this.medicamentos = dadosMedicos.medicamentos;
    this.alergias = dadosMedicos.alergias;

    this.form.get('altura').setValue(dadosMedicos.altura);
    this.form.get('peso').setValue(dadosMedicos.peso);
    this.form.get('tipoSanguineo').setValue(dadosMedicos.tipoSanguineo.id);
  }

  public getTiposSanguineo(): void {
    this._usuarioService
      .getTiposSanguineo()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (body: ITipoSanguineoModel[]) => {
          this.tiposSanguineo = body;
        },
        error: (error) => {
          log.error(error);
          this.messageError = error?.error?.message;
        },
      });
  }

  public updateDadosMedicos(): void {
    if (this.form.valid) {
      this.loading = true;
      const values = this._formConfig.parserForm(this.form.value);
      this._dadosMedicosService
        .updateDadosMedicos(values)
        .pipe(
          untilDestroyed(this),
          finalize(() => (this.loading = false))
        )
        .subscribe({
          next: (body: any) => {
            this._sweetAlert.openToasty('Dados atualizados com sucesso', 'success');
            this.getDadosMedicos();
          },
          error: (error) => {
            log.error(error);
            this.messageError = error?.error?.message;
          },
        });
    }
  }

  public clearForm() {
    this.form.reset();
  }

  public setStep(index: number) {
    this.step = index;
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }
}
