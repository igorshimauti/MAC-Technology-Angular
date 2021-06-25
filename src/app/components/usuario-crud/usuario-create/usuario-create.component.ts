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
    this.usuarioService.create(this.usuario).subscribe(() => {
      this.usuarioService.showMessage("Usuário cadastrado com sucesso. Por favor, solicite a liberação do administrador do sistema para começar a utilizar.");
      this.router.navigate(["/login"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/login"]);
  }
}