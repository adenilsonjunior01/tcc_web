import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUpdatePaciente } from '../../class/form-update-paciente';
import { PacienteService } from '../../../../services/paciente.service';
import { Logger } from '../../../../@core/logger.service';

const log = new Logger('Update Paciente');

@Component({
  selector: 'app-form-update-paciente',
  templateUrl: './form-update-paciente.component.html',
  styleUrls: ['./form-update-paciente.component.scss'],
})
export class FormUpdatePacienteComponent implements OnInit {
  @Input() dados: any;

  public form: FormGroup;
  private readonly _formConfig = new FormUpdatePaciente();

  constructor(private readonly _pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.form = this._formConfig.initForm();
  }

  public updatePaciente(): void {
    this._pacienteService.updatePaciente(this.form.value).subscribe({
      next: () => {},
      error: (error) => {
        log.error(error);
      },
    });
  }
}
