import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from '../aluno.model';
import { AlunoService } from '../aluno.service';
import { Curso } from '../../curso-crud/curso.model';
import { CursoService } from '../../curso-crud/curso.service';


@Component({
  selector: 'app-aluno-create',
  templateUrl: './aluno-create.component.html',
  styleUrls: ['./aluno-create.component.css']
})
export class AlunoCreateComponent implements OnInit {

  aluno: Aluno = {
    id: undefined,
    nome: "",
    cpf: "",
    dataNascimento: undefined,
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
  }

  cursos: Curso[] = [];
  displayedColumns = ['id', 'nome', 'matriculado'];

  matriculas: number[] = [];

  constructor(private alunoService: AlunoService, 
    private cursoService: CursoService,
    private router: Router) { }

  ngOnInit(): void {
    this.cursoService.read().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  create(): void {
    for (let curso of this.cursos) {
      let idCurso = curso.id ? curso.id : 0;
      let checkbox = document.getElementById(idCurso.toString()) as HTMLInputElement;
      if (checkbox.checked) {
        this.matriculas.push(idCurso);
      }
    }

    this.aluno.cursos = this.matriculas;
    this.alunoService.create(this.aluno).subscribe(() => {
      this.alunoService.showMessage('Aluno cadastrado com sucesso.');
      this.router.navigate(['/aluno']);
    })
  }

  cancel(): void {
    this.router.navigate(['/aluno']);
  }
}
