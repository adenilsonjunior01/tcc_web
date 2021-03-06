import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';

/**
 * @description: Type 1: Edição de Logo, Type 2: edição História, Type 3: edição missão, valores, visão
 */
@Component({
  selector: 'app-form-dados-clinica',
  templateUrl: './form-dados-clinica.component.html',
  styleUrls: ['./form-dados-clinica.component.scss']
})
export class FormDadosClinicaComponent implements OnInit {
  public type: any;
  public file = new FormControl([], FileUploadValidators.filesLimit(1));
  public base64: any;
  public animationFile = false;

  isFileDragDropAvailable: boolean;
  public readonly controlUpload = new FileUploadControl({ accept: ['image/*'] });


  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any,) {}

  ngOnInit(): void {
    this.type = this.dataDialog.type;
  }

  public converBase64() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(this.file.value[0]);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }).then(value => this.base64 = value);
  }

  public removeImg() {
    this.file.setValue([]);
  }
}
