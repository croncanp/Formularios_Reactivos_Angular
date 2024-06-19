import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors} from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();
    if (value === 'strider')
    {
      return {
        noStrider: true
      }
    }
    return null;
  }

  public isValidField(form: FormGroup,fieldName: string){
    return form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  public getFieldError(form: FormGroup,fieldName: string): string | null {
    if (!form.contains(fieldName)) return null;
    const errors = form.controls[fieldName].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key){
        case 'required': return 'Este campo es requerido';
        case 'minlength': return `Este campo es debe terner minimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }

  isFieldOneEqualFieldTwo(field1: string, field2: string){
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value || '';
      const fieldValue2 = formGroup.get(field2)?.value || '';

      if(fieldValue1 !== fieldValue2){
        formGroup.get(field2)?.setErrors({notEqual: true});
        return {notEqual: true}
      }
      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }

}
