import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Materia } from './materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  cursoId: string = "";
  baseUrl = "https://mac-courses.herokuapp.com/mac-courses/curso";
  //baseUrl = "http://localhost:8080/mac-courses/curso";

  httpHeader = new HttpHeaders({
    "Authorization" : `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`
  });

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  create(materia: Materia): Observable<Materia> {
    console.log(materia);
    const url = `${this.baseUrl}/${this.cursoId}/materia`;
    return this.http.post<Materia>(url, materia, { headers: this.httpHeader });
  }

  read(): Observable<Materia[]> {
    const url = `${this.baseUrl}/${this.cursoId}/materia`;
    return this.http.get<Materia[]>(url, { headers: this.httpHeader });
  }

  readById(materiaId: string): Observable<Materia> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${materiaId}`;
    return this.http.get<Materia>(url, { headers: this.httpHeader });
  }

  update(materia: Materia): Observable<Materia> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${materia.id}`;
    return this.http.put<Materia>(url, materia, { headers: this.httpHeader });
  }

  delete(materia: Materia): Observable<Materia> {
    const url = `${this.baseUrl}/${this.cursoId}/materia/${materia.id}`;
    return this.http.delete<Materia>(url, { headers: this.httpHeader });
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}