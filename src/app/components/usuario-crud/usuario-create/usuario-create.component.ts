import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  usuario: Usuario = {
    id: undefined,
    nome: "",
    cpf: "",
    email: "",
    senha: ""
  };

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    if (!this.usuarioService.cpfValido(this.usuario.cpf)) {
      this.usuarioService.showMessage("CPF inválido");
    } else if (!this.usuarioService.emailValido(this.usuario.email)) {
      this.usuarioService.showMessage("e-Mail inválido");
    } else if (this.usuario.senha != (document.getElementById("repetirSenha") as HTMLInputElement).value) {
      this.usuarioService.showMessage("As senhas digitadas não conferem");
    } else {
      this.usuarioService.create(this.usuario).subscribe(() => {
        this.usuarioService.showMessage("Usuário cadastrado com sucesso. Por favor, solicite a liberação do administrador do sistema para começar a utilizar.");
        this.router.navigate(["/login"]);
      });
    }
  }

  cancel(): void {
    this.router.navigate(["/login"]);
  }
}