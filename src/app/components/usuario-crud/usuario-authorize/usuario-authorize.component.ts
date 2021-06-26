import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-authorize',
  templateUrl: './usuario-authorize.component.html',
  styleUrls: ['./usuario-authorize.component.css']
})
export class UsuarioAuthorizeComponent implements OnInit {

  usuario: Usuario = {
    id: undefined,
    nome: "",
    cpf: "",
    email: "",
    senha: ""
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

  authorize(): void {
    this.usuarioService.authorize(this.usuario).subscribe(() => {
      this.usuarioService.showMessage("Usuário autorizado com sucesso.");
      this.router.navigate(["/usuario"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/usuario"]);
  }

}
