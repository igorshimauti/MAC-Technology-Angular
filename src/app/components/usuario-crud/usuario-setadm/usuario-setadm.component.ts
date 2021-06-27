import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-setadm',
  templateUrl: './usuario-setadm.component.html',
  styleUrls: ['./usuario-setadm.component.css']
})
export class UsuarioSetadmComponent implements OnInit {

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

  setadm(): void {
    this.usuarioService.setadm(this.usuario).subscribe(() => {
      this.usuarioService.showMessage("Usuário agora é um administrador.");
      this.router.navigate(["/usuario"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/usuario"]);
  }
}
