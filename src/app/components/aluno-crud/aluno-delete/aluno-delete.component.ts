import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../aluno.model';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-aluno-delete',
  templateUrl: './aluno-delete.component.html',
  styleUrls: ['./aluno-delete.component.css']
})
export class AlunoDeleteComponent implements OnInit {

  aluno: Aluno = {
    id: undefined,
    nome: "",
    cpf: "",
    dataNascimento: new Date,
    email: "",
    celular: "",
    cursos: [],
    enderecoResidencial: {
      cep: "",
      uf: "",
      cidade: "",
      bairro: "",
      logradouro: "",
      numero: "",
      complemento: ""
    }
  };

  constructor(private alunoService: AlunoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.alunoService.readById(id ? id : "").subscribe(aluno => {
      this.aluno = aluno;
    });
  }

  delete(): void {
    this.alunoService.delete(this.aluno).subscribe(() => {
      this.alunoService.showMessage("Aluno excluido com sucesso");
      this.router.navigate(["/aluno"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/aluno"]);
  }
}
