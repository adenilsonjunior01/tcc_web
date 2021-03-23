import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MedicoService } from '@app/services/medico/medico.service';
import { FormUpdateMedico } from '../../class/form-update-medico';
import { untilDestroyed } from '../../../../@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { Logger } from '../../../../@core/logger.service';

const log = new Logger('Update Médico');

@Component({
  selector: 'app-form-update-medico',
  templateUrl: './form-update-medico.component.html',
  styleUrls: ['./form-update-medico.component.scss'],
})
export class FormUpdateMedicoComponent implements OnInit, OnDestroy {
  @Input() dados: any;
  public form: FormGroup;
  public readonly _formConfig = new FormUpdateMedico();
  public loading = false;
  public errorMessage = '';

  constructor(private readonly _medicoService: MedicoService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.form = this._formConfig.initForm();
  }

  public updateMedico() {
    this._medicoService
      .updateMedico(this.form.value)
      .pipe(
        finalize(() => (this.loading = false)),
        untilDestroyed(this)
      )
      .subscribe({
        next: () => {},
        error: (error) => {
          log.error(error);
        },
      });
  }
}
