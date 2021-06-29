import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from '../../aluno-crud/aluno.model';
import { CursoService } from '../../curso-crud/curso.service';
import { Aula } from '../aula.model';
import { AulaService } from '../aula.service';

@Component({
  selector: 'app-aula-create',
  templateUrl: './aula-create.component.html',
  styleUrls: ['./aula-create.component.css']
})
export class AulaCreateComponent implements OnInit {

  aula: Aula = {
    id: undefined,
    tema: "",
    data: undefined,
    alunos: []
  }

  alunos: Aluno[] = [];
  displayedColumns = ['id', 'nome', 'presente'];

  constructor(private cursoService: CursoService,
    private aulaService: AulaService, 
    private router: Router) { }

  ngOnInit(): void {
    this.cursoService.findEnrolledStudents().subscribe(alunos => {
      this.alunos = alunos;
    });
  }

  create(): void {
    let presencas: number[] = [];

    for (let aluno of this.alunos) {
      let alunoId = aluno.id ? aluno.id : 0;
      let checkbox = document.getElementById(alunoId.toString()) as HTMLInputElement;
      if (checkbox.checked) {
        presencas.push(alunoId);
      }
    }

    this.aula.alunos = presencas;
    this.aulaService.create(this.aula).subscribe(() => {
      this.aulaService.showMessage("Aula cadastrada com sucesso");
      this.router.navigate(["/aula"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/aula"]);
  }
}
