import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Login, LoginResponse } from './login.model';
import { tokenService } from "../../../shared/localStorage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = {
    email: "",
    senha: ""
  };

  loginResponse: LoginResponse = {
    token: "",
    tipo: ""
  };

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

  }

  logar(): void {
    this.authService.logar(this.login).subscribe(loginResponse => {
      this.loginResponse = loginResponse;
      
      if (this.loginResponse == null) {
        this.authService.showMessage("Ocorreu um erro ao efetuar login");
      } else if (this.loginResponse.token != "") {
        const dados = tokenService.parseJwt(this.loginResponse.token);
        const usuario = {
          "id": dados.jti,
          "nome": dados.sub,
          "admin": dados.iss
        }

        this.authService.usuarioAutenticado = true;
        this.authService.setToken(this.loginResponse.token);
        this.authService.setTipoToken(this.loginResponse.tipo);
        this.authService.setUser(usuario);
        this.authService.mostrarMenuUsuarioEmitter.emit(this.authService.usuario.admin == "true");
        this.authService.mostrarMenuEmitter.emit(this.authService.usuario.id > 0);        
        this.router.navigate(["/curso"]);
      } else {
        this.authService.showMessage("Usuário não encontrado ou senha incorreta.");
      }
    });
  }

  cadastrar(): void {
    this.router.navigate(["/usuario/novo"]);
  }
}
