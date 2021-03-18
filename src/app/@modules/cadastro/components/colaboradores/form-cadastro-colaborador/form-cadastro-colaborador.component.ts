import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { ListaUtilitarioMock } from '../../../../../mocks/lista-utilitario-mock';
import { ModalAnimationComponent } from '../../../../../@shared/modal-animation/modal-animation.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ListaPerfilMock } from '../../../../../mocks/lista-perfis-mock';
import { CredentialsService, Token } from '../../../../../auth/credentials.service';
import { FormPreCadastroPaciente } from '../../../../home/class/form-pre-cadastro-paciente';
import { UsuarioService } from '../../../../../services/usuario/usuario.service';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '../../../../../@core/until-destroyed';
import { IUsuarioModel } from '@app/models/usuario-model';
import Swal from 'sweetalert2';
import { SweetalertService } from '../../../../../@shared/sweetalert/sweetalert.service';

@Component({
  selector: 'app-form-cadastro-colaborador',
  templateUrl: './form-cadastro-colaborador.component.html',
  styleUrls: ['./form-cadastro-colaborador.component.scss'],
})
export class FormCadastroColaboradorComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(ModalAnimationComponent) modal: any;
  @Input() type: any;

  private readonly utilitariosMock = new ListaUtilitarioMock();
  private readonly utils = new ListaPerfilMock();
  public readonly _formPreCadastro = new FormPreCadastroPaciente();
  public form: FormGroup;
  public radioForm = new FormControl();
  public listaSexo: any[];
  public listaPerfis: any[];
  public listaEstados: any[];
  public credentials: Token;
  public perfil: any;
  public isAdmin: boolean;
  public errorRequest = '';
  public loading = false;
  public modalID = 'form-cadastro-colaborador';
  public messageError = '';

  constructor(
    private readonly _credentials: CredentialsService,
    private readonly _service: UsuarioService,
    private readonly _sweetAlert: SweetalertService
  ) {}

  ngOnDestroy(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.type.firstChange) {
      this.type = changes?.type.currentValue;
      console.log(this.type);
    }
  }

  ngOnInit(): void {
    this.form = this._formPreCadastro.initFormPreCadastroPaciente();
    this.getCredentials();
    this.radioForm.setValue('1');
    this.listaSexo = this.utilitariosMock.getListaSexos();
    this.listaEstados = this.utilitariosMock.getEstados();
    this.getListaPerfis();
  }

  private getCredentials(): void {
    this.credentials = this._credentials.decodeToken();
    this.perfil = this.credentials.perfis.filter((value) => value.includes('ADMINISTRADOR'));
    this.verifyProfile();
  }

  private verifyProfile(): void {
    if (this.perfil.length > 0) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  private getListaPerfis(): void {
    this.listaPerfis = this.utils.getListaPerfilColaborador();
    this.form.get('perfil').setValue(4);
    if (!this.isAdmin) {
      this.listaPerfis.pop();
    }
  }

  public submitUser(): void {
    this.messageError = '';
    if (this.form.valid) {
      this.loading = true;
      const values = this._formPreCadastro.parseFormColaborador(this.form.value);
      this._service
        .saveNewUser(values)
        .pipe(
          finalize(() => (this.loading = false)),
          untilDestroyed(this)
        )
        .subscribe({
          next: (response: IUsuarioModel) => {
            this._sweetAlert.openToasty('Cadastro realizado com sucesso!', 'success');
            this.form.reset();
            this.modal.close(this.modalID);
          },
          error: (error) => {
            this.messageError = error?.error?.message;
          },
        });
    }
  }

  public closeModal(idModal: string) {
    Swal.fire({
      icon: 'info',
      title: 'Deseja continuar?',
      text: 'Ao continuar, esse cadastro será desconsiderado.',
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.form.reset();
        this.modal.close(idModal);
      }
    });
  }

  public clearForm(): void {
    this.form.get('nome').reset();
    this.form.get('cpf').reset();
    this.form.get('email').reset();
    this.form.get('telefone').reset();
    this.form.get('sexo').reset();
    this.form.get('dtNascimento').reset();

    this.form.controls['endereco'].get('descBairro').reset();
    this.form.controls['endereco'].get('descRua').reset();
    this.form.controls['endereco'].get('noEstado').reset();
    this.form.controls['endereco'].get('noCidade').reset();
    this.form.controls['endereco'].get('nuCep').reset();
    this.form.controls['endereco'].get('numero').reset();
  }
}
