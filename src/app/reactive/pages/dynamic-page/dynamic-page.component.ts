import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  constructor(private formBuilder: FormBuilder) {
  }

  public form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  });

  public newFavorite: FormControl = new FormControl('',[Validators.required]);

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    (this.form.controls['favoriteGames'] as FormArray) = this.formBuilder.array([]);
    this.form.reset();
  }

  get favoriteGamesControls() {
    return this.form.get('favoriteGames') as FormArray;
  }

  isValidField(fieldName: string): null | boolean {
    return this.form.controls[fieldName].errors && this.form.controls[fieldName].touched;
  }

  // Manejo de errores del formulario utilizando ValidationErrors
  getFieldError(fieldName: string): string | null {
    if (!this.form.contains(fieldName)) return null;
    const errors = this.form.controls[fieldName].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key){
        case 'required': return 'Este campo es requerido';
        case 'minlength': return `Este campo es debe terner minimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  onDeleteFavorite(index: number):void{
    this.favoriteGamesControls.removeAt(index);
  }

  onAddToFavorites():void {
    if(this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;
    this.favoriteGamesControls.push(
      this.formBuilder.control(newGame, Validators.required)
    );
    this.newFavorite.reset();
  }
}
