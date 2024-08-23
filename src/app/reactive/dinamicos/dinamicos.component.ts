import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  constructor( private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
  }

  miFormulario: UntypedFormGroup = this.fb.group({
    nombre: [ '' , [Validators.required, Validators.minLength(3) ] ],
    favoritos: this.fb.array( [
      [ 'Metal Slug', Validators.required ],
      [ 'The king of fither', Validators.required ],
    ], Validators.required )
  })

  nuevoFavorito: UntypedFormControl = this.fb.control('', Validators.required);

  get favoritosArray(){
    return this.miFormulario.get('favoritos') as UntypedFormArray;
  }

  campoNoEsValido( campo: string ){
    return this.miFormulario.controls[campo].errors &&
           this.miFormulario.controls[campo].touched;
  }

  agregarFavorito(){

    if( this.nuevoFavorito.invalid ){ return; }

    //this.favoritosArray.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );
    this.favoritosArray.push( this.fb.control( this.nuevoFavorito.value, Validators.required) );

    this.nuevoFavorito.reset();
  }

  borrar(i: number){
    
    this.favoritosArray.removeAt(i);
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
