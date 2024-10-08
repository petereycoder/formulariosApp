import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit{


  constructor( private fb: UntypedFormBuilder) { }

  ngOnInit(){
    this.miFormulario.reset({
      nombre: 'Xbox 360',
      precio: 1200
    });
  }

  /*
  miFormulario: FormGroup = new FormGroup({
    nombre: new FormControl('Xbox 360'),
    precio: new FormControl(1500),
    existencias: new FormControl(5),
  })
  */

  miFormulario: UntypedFormGroup = this.fb.group({
    nombre: [ , [ Validators.required, Validators.minLength(3) ] ],
    precio: [ , [ Validators.required, Validators.min(0) ] ],
    existencias: [ , [ Validators.required, Validators.min(0) ] ],
  })

  campoNoEsValido( campo: string ){
    return this.miFormulario.controls[campo].errors &&
           this.miFormulario.controls[campo].touched;
  }

  guardar(){

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();

  }

}
