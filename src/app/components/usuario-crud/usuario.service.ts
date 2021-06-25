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

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

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

  update(usuario: Usuario): Observable<Usuario> {
    const httpHeader = new HttpHeaders({
      "Authorization" : `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`
    });

    const url = `${this.baseUrl}/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario, { headers: httpHeader });
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
}