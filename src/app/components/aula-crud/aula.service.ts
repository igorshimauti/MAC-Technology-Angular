import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Aluno } from '../aluno-crud/aluno.model';
import { Aula } from './aula.model';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  //baseUrl = "https://mac-courses.herokuapp.com/mac-courses/curso";
  baseUrl = "http://localhost:8080/mac-courses/curso";
  cursoId = "";
  materiaId = "";

  httpHeader = new HttpHeaders({
    "Authorization" : `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`
  });

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  create(aula: Aula): Observable<Aula> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${this.materiaId}/aula`;
    return this.http.post<Aula>(url, aula, { headers: this.httpHeader });
  }

  read(): Observable<Aula[]> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${this.materiaId}/aula`;
    return this.http.get<Aula[]>(url, { headers: this.httpHeader });
  }

  readById(id: string): Observable<Aula> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${this.materiaId}/aula/${id}`;
    return this.http.get<Aula>(url, { headers: this.httpHeader });
  }

  update(aula: Aula): Observable<Aula> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${this.materiaId}/aula/${aula.id}`;
    return this.http.put<Aula>(url, aula, { headers: this.httpHeader });
  }

  delete(aula: Aula): Observable<Aula> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${this.materiaId}/aula/${aula.id}`;
    return this.http.delete<Aula>(url, { headers: this.httpHeader });
  }

  findPresentStudents(aula: Aula): Observable<Aluno[]> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${this.materiaId}/aula/${aula.id}/alunos`;
    return this.http.get<Aluno[]>(url, { headers: this.httpHeader });
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
}
