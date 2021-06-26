import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = "https://mac-courses.herokuapp.com/mac-courses/usuario";
  //baseUrl = "http://localhost:8080/mac-courses/usuario";

  constructor(private snackBar: MatSnackBar, 
    private http: HttpClient) { }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, usuario);
  }

  read(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  readById(id: string): Observable<Usuario> {
    const httpHeader = new HttpHeaders({
      "Authorization" : `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`
    });

    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Usuario>(url, { headers: httpHeader });
  }

  authorize(usuario: Usuario): Observable<Usuario> {
    const httpHeader = new HttpHeaders({
      "Authorization" : `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`
    });

    const url = `${this.baseUrl}/${usuario.id}/autorizar`;
    return this.http.post<Usuario>(url, {headers: httpHeader});
  }

  cpfValido(cpf: string): boolean {
    if (cpf == null || cpf == "") {
      return false;
    }

    cpf = cpf.replace(".","").replace(".","").replace("-","");

    if (cpf.length != 11) {
      return false;
    }

    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
      return false;
    }
    
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);

    for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
            return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }

    resto = somatorio % 11;
    digito1 = 11 - resto;

    if (digito1 > 9) {
        digito1 = 0;
    }

    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;

    for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }

    resto = somatorio % 11;
    digito2 = 11 - resto;

    if (digito2 > 9) {
        digito2 = 0;
    }

    cpfAux = cpfAux + digito2;

    if (cpf != cpfAux) {
      return false;
    } else {
      return true;
    }
  }

  emailValido(email: string): boolean {
    if (email.indexOf("@") <= 0) {
      return false;
    }

    if (email.indexOf(".") <= 0) {
      return false;
    }

    if (email.indexOf("org") <= 0 && email.indexOf("com") <= 0) {
      return false;
    }

    return true;
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
}