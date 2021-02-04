import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from '../class/form-validations';

@Component({
  selector: 'app-error-control-message',
  templateUrl: './error-control-message.component.html',
  styleUrls: ['./error-control-message.component.scss']
})
export class ErrorControlMessageComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() message: string;

  constructor() { }

  ngOnInit(): void { }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched) {
          return FormValidations.getErrorMessage(this.label, propertyName, this.control.errors[propertyName]);
        }
    }
    return null;
  }

}
