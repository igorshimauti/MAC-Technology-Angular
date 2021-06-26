import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

  usuario: Usuario = {
    id: undefined,
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    autorizado: undefined
  };

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.usuarioService.readById(id ? id : "").subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  update(): void {
    if (!this.usuarioService.cpfValido(this.usuario.cpf)) {
      this.usuarioService.showMessage("CPF inválido");
    } else if (!this.usuarioService.emailValido(this.usuario.email)) {
      this.usuarioService.showMessage("e-Mail inválido");
    } else {
      this.usuario.autorizado = (document.getElementById("autorizado") as HTMLInputElement).checked;
      this.usuarioService.update(this.usuario).subscribe(() => {
        this.usuarioService.showMessage("Usuário atualizado com sucesso");
        this.router.navigate(["/usuario"]);
      });
    }
  }

  cancel(): void {
    this.router.navigate(["/usuario"]);
  }
}
