import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Professor } from './professor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  baseUrl = "https://mac-courses.herokuapp.com/mac-courses/professor"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  create(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.baseUrl, professor);
  }

  read(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.baseUrl);
  }

  readById(id: string): Observable<Professor> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Professor>(url);
  }

  update(professor: Professor): Observable<Professor> {
    const url = `${this.baseUrl}/${professor.id}`;
    return this.http.put<Professor>(url, professor);
  }

  delete(professor: Professor): Observable<Professor> {
    const url = `${this.baseUrl}/${professor.id}`;
    return this.http.delete<Professor>(url);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
}