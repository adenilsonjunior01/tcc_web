import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { FormClinica } from '../../class/form-clinica';
import { ListaUtilitarioMock } from '../../../../mocks/lista-utilitario-mock';
import { ClinicaService } from '@app/services/clinica/clinica.service';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../../@core/logger.service';
import { SweetalertService } from '@app/@shared/sweetalert/sweetalert.service';

const log = new Logger('Update Clinica');

@Component({
    selector: 'app-form-dados-clinica',
    templateUrl: './form-dados-clinica.component.html',
    styleUrls: ['./form-dados-clinica.component.scss'],
})
export class FormDadosClinicaComponent implements OnInit, OnChanges, OnDestroy {
    @Input() type: any;
    @Input() dados: any;
    @Output() closeModal = new EventEmitter<string>();
    @Output() reload = new EventEmitter<boolean>();

    public file = new FormControl([], FileUploadValidators.filesLimit(1));
    public base64: any;
    public animationFile = false;
    public dadosClinica: any;
    public form: FormGroup;
    public _configForm = new FormClinica();
    private readonly utilitariosMock = new ListaUtilitarioMock();
    public listaEstados: any[];
    public loading = false;

    isFileDragDropAvailable: boolean;
    public readonly controlUpload = new FileUploadControl({ accept: ['image/*'] });

    constructor(private readonly _clinicaService: ClinicaService, private readonly _sweetAlert: SweetalertService) {}

    ngOnDestroy(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        this.setDadosClinica();
    }

    ngOnInit(): void {
        this.form = this._configForm.iniForm();
        this.listaEstados = this.utilitariosMock.getEstados();
    }

    public converBase64() {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(this.file.value[0]);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        }).then((value) => (this.base64 = value));
    }

    public removeImg() {
        this.file.setValue([]);
    }

    private setDadosClinica() {
        if (this.dados) {
            this.form.get('id').setValue(this.dados.id);
            this.form.get('nome').setValue(this.dados.nome);
            this.form.get('dtAbertura').setValue(this.dados.dtAbertura);
            this.form.get('dtEncerramento').setValue(this.dados.dtEncerramento);
            this.form.get('missao').setValue(this.dados.descMissao);
            this.form.get('visao').setValue(this.dados.descVisao);
            this.form.get('valores').setValue(this.dados.descValores);

            this.form.controls['endereco']
                .get('id')
                .setValue(this.dados?.endereco?.id !== null ? this.dados?.endereco?.id : null);
            this.form.controls['endereco'].get('nuCep').setValue(this.dados?.endereco?.nuCep);
            this.form.controls['endereco'].get('descBairro').setValue(this.dados?.endereco?.descBairro);
            this.form.controls['endereco'].get('descRua').setValue(this.dados?.endereco?.descRua);
            this.form.controls['endereco']
                .get('descComplemento')
                .setValue(
                    this.dados?.endereco?.descComplemento !== null ? this.dados?.endereco?.descComplemento : null
                );
            this.form.controls['endereco'].get('numero').setValue(this.dados?.endereco?.numero);
            this.form.controls['endereco'].get('noCidade').setValue(this.dados?.endereco?.noCidade);
            this.form.controls['endereco'].get('noEstado').setValue(this.dados?.endereco?.noEstado);
        }
    }

    public updateClinica() {
        this.loading = true;
        this._clinicaService
            .updateClinica(this.form.value, this.form.get('id').value)
            .pipe(
                untilDestroyed(this),
                finalize(() => (this.loading = false))
            )
            .subscribe({
                next: () => {
                    this.closeModal.emit('configuracoes');
                    this.reload.emit(true);
                    this._sweetAlert.openToasty('Dados atualizados com sucesso', 'success');
                },
                error: (error: any) => {
                    log.error(error);
                },
            });
    }
}
