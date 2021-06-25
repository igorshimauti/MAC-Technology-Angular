import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curso } from './curso.model';

import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Aluno } from '../aluno-crud/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursoId: string = "";

  baseUrl = "https://mac-courses.herokuapp.com/mac-courses/curso";

  httpHeader = new HttpHeaders({
    "Authorization" : `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`
  });

  constructor(private snackBar: MatSnackBar, 
    private http: HttpClient) { }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Erro efetuar a operação.", true);
    return EMPTY;
  }

  create(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.baseUrl, curso, { headers: this.httpHeader }).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  read(): Observable<Curso[]> {
    console.log(this.httpHeader)
    return this.http.get<Curso[]>(this.baseUrl, { headers: this.httpHeader });
  }

  readById(id: string): Observable<Curso> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Curso>(url, { headers: this.httpHeader });
  }

  update(curso: Curso): Observable<Curso> {
    const url = `${this.baseUrl}/${curso.id}`;
    return this.http.put<Curso>(url, curso, { headers: this.httpHeader });
  }

  delete(curso: Curso): Observable<Curso> {
    const url = `${this.baseUrl}/${curso.id}`;
    return this.http.delete<Curso>(url, { headers: this.httpHeader });
  }

  findEnrolledStudents(): Observable<Aluno[]> {
    const url = `${this.baseUrl}/${this.cursoId}/alunos`;
    return this.http.get<Aluno[]>(url, { headers: this.httpHeader });
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }
}
