import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Aluno } from '../aluno-crud/aluno.model';
import { Aula } from './aula.model';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  baseUrl = "https://mac-courses.herokuapp.com/mac-courses/curso";
  cursoId = "";
  materiaId = "";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  create(aula: Aula): Observable<Aula> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${this.materiaId}/aula`;
    return this.http.post<Aula>(url, aula);
  }

  read(): Observable<Aula[]> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${this.materiaId}/aula`;
    return this.http.get<Aula[]>(url);
  }

  readById(id: string): Observable<Aula> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${this.materiaId}/aula/${id}`;
    return this.http.get<Aula>(url);
  }

  update(aula: Aula): Observable<Aula> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${this.materiaId}/aula/${aula.id}`;
    return this.http.put<Aula>(url, aula);
  }

  delete(aula: Aula): Observable<Aula> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${this.materiaId}/aula/${aula.id}`;
    return this.http.delete<Aula>(url);
  }

  findPresentStudents(aula: Aula): Observable<Aluno[]> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${this.materiaId}/aula/${aula.id}/alunos`;
    console.log(url)
    return this.http.get<Aluno[]>(url);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
}
