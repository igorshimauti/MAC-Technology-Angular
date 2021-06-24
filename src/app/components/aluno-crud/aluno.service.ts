import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../curso-crud/curso.model';
import { Aluno } from './aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  baseUrl = "https://mac-courses.herokuapp.com/mac-courses/aluno";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  create(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.baseUrl, aluno);
  }

  read(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.baseUrl);
  }

  readById(id: string): Observable<Aluno> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Aluno>(url);
  }

  update(aluno: Aluno): Observable<Aluno> {
    const url = `${this.baseUrl}/${aluno.id}`;
    return this.http.put<Aluno>(url, aluno);
  }

  delete(aluno: Aluno): Observable<Aluno> {
    const url = `${this.baseUrl}/${aluno.id}`;
    return this.http.delete<Aluno>(url);
  }

  findEnrolledCourses(aluno: Aluno): Observable<Curso[]> {
    const url = `${this.baseUrl}/${aluno.id}/matricula`;
    return this.http.get<Curso[]>(url);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}