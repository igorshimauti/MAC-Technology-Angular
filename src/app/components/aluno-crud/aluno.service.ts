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

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}