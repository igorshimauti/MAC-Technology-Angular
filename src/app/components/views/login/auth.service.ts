import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Login, LoginResponse } from './login.model';
import { Observable } from 'rxjs';
import { Usuario } from '../../usuario-crud/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "https://mac-courses.herokuapp.com/mac-courses/usuario";

	usuario: any;
	token: string | undefined;
  tipoToken: string | undefined;

  usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  logar(login: Login): Observable<LoginResponse> {
    const url = `${this.baseUrl}/logar`;
    return this.http.post<LoginResponse>(url, login);
  }

  logout(): void {
		localStorage.removeItem("token");
    localStorage.removeItem("tipoToken");
		localStorage.removeItem("usuario");
		delete this.usuario;
		delete this.token;
    this.mostrarMenuEmitter.emit(false);
  }

  estaAutenticado() {
    return this.usuarioAutenticado;
  }

	setUser(usuario: Usuario | null): void {
		this.usuario = usuario;
		localStorage.setItem("usuario", JSON.stringify(usuario));
	}

	setToken(token: string): void {
		this.token = token;
		localStorage.setItem("token", token);
	}

	setTipoToken(tipoToken: string): void {
		this.tipoToken = tipoToken;
		localStorage.setItem("tipoToken", tipoToken);
	}
  
  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}