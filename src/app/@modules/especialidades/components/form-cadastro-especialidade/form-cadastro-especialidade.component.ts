import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cadastro-especialidade',
  templateUrl: './form-cadastro-especialidade.component.html',
  styleUrls: ['./form-cadastro-especialidade.component.scss'],
})
export class FormCadastroEspecialidadeComponent implements OnInit {
  public form: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  public initForm() {}

  public closeDialog() {}

  /**
   * @description: Verifica se é uma nova Especialidade ou atualização e se o
   * form é válido
   */
  public verifyFormSubmit() {
    if (this.form.get('id').value === null && this.form.valid) this.save();
    this.update();
  }

  private save() {}

  private update() {}
}
