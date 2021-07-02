import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../curso-crud/curso.model';
import { Aluno } from './aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  baseUrl = "https://mac-courses.herokuapp.com/mac-courses/aluno";
  //baseUrl = "http://localhost:8080/mac-courses/aluno";

  httpHeader = new HttpHeaders({
    "Authorization" : `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`
  });

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  create(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.baseUrl, aluno, { headers: this.httpHeader });
  }

  read(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.baseUrl, { headers: this.httpHeader });
  }

  readById(id: string): Observable<Aluno> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Aluno>(url, { headers: this.httpHeader });
  }

  update(aluno: Aluno): Observable<Aluno> {
    const url = `${this.baseUrl}/${aluno.id}`;
    return this.http.put<Aluno>(url, aluno, { headers: this.httpHeader });
  }

  delete(aluno: Aluno): Observable<Aluno> {
    const url = `${this.baseUrl}/${aluno.id}`;
    return this.http.delete<Aluno>(url, { headers: this.httpHeader });
  }

  findEnrolledCourses(aluno: Aluno): Observable<Curso[]> {
    const url = `${this.baseUrl}/${aluno.id}/matricula`;
    return this.http.get<Curso[]>(url, { headers: this.httpHeader });
  }

  cpfValido(cpf: string): boolean {
    if (cpf == null) {
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

  consultaCep(cep: string): Observable<any> {
    const url = `https://viacep.com.br/ws/${cep}/json`;
    return this.http.get<any>(url);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}