import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../../curso-crud/curso.model';
import { CursoService } from '../../curso-crud/curso.service';
import { Aluno } from '../aluno.model';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-aluno-update',
  templateUrl: './aluno-update.component.html',
  styleUrls: ['./aluno-update.component.css']
})
export class AlunoUpdateComponent implements OnInit {

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

  cursos: Curso[] = [];
  displayedColumns = ['id', 'nome', 'matriculado'];

  matriculas: number[] = [];

  constructor(private alunoService: AlunoService, 
    private cursoService: CursoService,          
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.alunoService.readById(id ? id : '').subscribe(aluno => {
      this.aluno = aluno;

      this.cursoService.read().subscribe(cursos => {
        this.cursos = cursos;

        this.alunoService.findEnrolledCourses(aluno).subscribe(matriculados => {
          this.markEnrolledCourses(matriculados);
        });
      });
    });
  }

  consultaCep() {
    this.alunoService.consultaCep(this.aluno.enderecoResidencial.cep).subscribe(endereco => {
      this.aluno.enderecoResidencial.uf = endereco.uf;
      this.aluno.enderecoResidencial.cidade = endereco.localidade;
      this.aluno.enderecoResidencial.bairro = endereco.bairro;
      this.aluno.enderecoResidencial.logradouro = endereco.logradouro;
      this.aluno.enderecoResidencial.complemento = endereco.complemento;
    });    
  }

  markEnrolledCourses(matriculados: Curso[]){
    for (let matriculado of matriculados) {
      let idCurso = matriculado.id ? matriculado.id : 0;
      let checkbox = document.getElementById(idCurso.toString()) as HTMLInputElement;
      checkbox.checked = true;
    }
  }

  update(): void {
    if (this.aluno.email !== "" && this.aluno.email !== undefined) {
      if (!this.alunoService.emailValido(this.aluno.email)) {
        this.alunoService.showMessage("e-Mail inválido");
      }
    } else if (!this.alunoService.cpfValido(this.aluno.cpf)) {
      this.alunoService.showMessage("CPF inválido");
    } else {
      for (let curso of this.cursos) {
        let idCurso = curso.id ? curso.id : 0;
        let checkbox = document.getElementById(idCurso.toString()) as HTMLInputElement;
        if (checkbox.checked) {
          this.matriculas.push(idCurso);
        }
      }
  
      this.aluno.cursos = this.matriculas;
      this.alunoService.update(this.aluno).subscribe(() => {
        this.alunoService.showMessage("Aluno atualizado com sucesso");
        this.router.navigate(['/aluno']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/aluno']);
  }
}