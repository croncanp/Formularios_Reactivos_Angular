import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from 'express';

const initializateForm = {
  name: '',
  price: 0,
  inStorage: 0
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{

  // Esta es una de las maneras para trabajar con los formularios reactivos
  /*public myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0)
  });*/
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm.reset(initializateForm);
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

  // Esta es otra manera de trabajar con formularios reactivos y se incluyen las validaciones con el obj validators

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })

  onSave():void{
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset({price: 0, inStorage: 0});
  }

}
