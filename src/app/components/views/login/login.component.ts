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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  logar(): void {
    this.authService.logar(this.login).subscribe(loginResponse => {
      this.loginResponse = loginResponse;

      if (this.loginResponse.token != "") {
        const dados = tokenService.parseJwt(this.loginResponse.token);
        console.log(dados);
        const usuario = {
          id: dados.id,
          nome: dados.nome,
          cpf: dados.cpf,
          email: dados.email,
          senha: dados.senha
        };

        this.authService.mostrarMenuEmitter.emit(true);
        this.authService.usuarioAutenticado = true;
        this.authService.setUser(usuario);
        this.authService.setToken(this.loginResponse.token);
        this.authService.setTipoToken(this.loginResponse.tipo);
        this.router.navigate(["/curso"]);
      }
    });
  }

  cadastrar(): void {

  }
}
