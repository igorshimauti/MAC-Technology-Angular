import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Tarefa } from './tarefa.model';
import { TipoTarefa } from './tipoTarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  baseUrl = "https://mac-courses.herokuapp.com/mac-courses";
  //baseUrl = "http://localhost:8080/mac-courses";
  cursoId = "";
  materiaId = "";

  httpHeader = new HttpHeaders({
    "Authorization" : `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`
  });

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  create(tarefa: Tarefa): Observable<Tarefa> {
    const url = `${this.baseUrl}/curso/${this.cursoId}/materia/${this.materiaId}/tarefa`;
    return this.http.post<Tarefa>(url, tarefa, { headers: this.httpHeader });
  }

  read(): Observable<Tarefa[]> {
    const url = `${this.baseUrl}/curso/${this.cursoId}/materia/${this.materiaId}/tarefa`;
    return this.http.get<Tarefa[]>(url, { headers: this.httpHeader });
  }

  readById(id: string): Observable<Tarefa> {
    const url = `${this.baseUrl}/curso/${this.cursoId}/materia/${this.materiaId}/tarefa/${id}`;
    return this.http.get<Tarefa>(url, { headers: this.httpHeader });
  }

  findTiposTarefa(): Observable<TipoTarefa[]> {
    const url = `${this.baseUrl}/tipo_tarefa`;
    return this.http.get<TipoTarefa[]>(url, { headers: this.httpHeader });
  }

  update(tarefa: Tarefa): Observable<Tarefa> {
    const url = `${this.baseUrl}/curso/${this.cursoId}/materia/${this.materiaId}/tarefa/${tarefa.id}`;
    return this.http.put<Tarefa>(url, tarefa, { headers: this.httpHeader });
  }

  delete(tarefa: Tarefa): Observable<Tarefa> {
    const url = `${this.baseUrl}/curso/${this.cursoId}/materia/${this.materiaId}/tarefa/${tarefa.id}`;
    return this.http.delete<Tarefa>(url, { headers: this.httpHeader });
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
}