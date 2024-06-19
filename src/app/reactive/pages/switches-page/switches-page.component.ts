import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {defaultGatherDiagnostics} from '@angular/compiler-cli';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit{

  constructor(private formBuilder: FormBuilder)  {

  }

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  public myForm: FormGroup = this.formBuilder.group({
    gender: ['M', Validators.required],
    wantNotifications:[true, Validators.required],
    termsAndConditions:[false, Validators.requiredTrue]
  });

  public person = {
    gender: 'F',
    wantNotifications: false
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    }
    const {termsAndConditions, ... newPerson} = this.myForm.value;
    this.person = newPerson;
  }

  isValidField(fieldName: string): null | boolean {
    return this.myForm.controls[fieldName].errors && this.myForm.controls[fieldName].touched;
  }

  // Manejo de errores del formulario utilizando ValidationErrors
  getFieldError(fieldName: string): string | null {
    if (!this.myForm.contains(fieldName)) return null;
    const errors = this.myForm.controls[fieldName].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key){
        case 'required': return 'Este campo es requerido';
        case 'minlength': return `Este campo es debe terner minimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }

}
