import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../../aluno-crud/aluno.model';
import { CursoService } from '../../curso-crud/curso.service';
import { Aula } from '../aula.model';
import { AulaService } from '../aula.service';

@Component({
  selector: 'app-aula-update',
  templateUrl: './aula-update.component.html',
  styleUrls: ['./aula-update.component.css']
})
export class AulaUpdateComponent implements OnInit {

  aula: Aula = {
    id: undefined,
    tema: "",
    data: undefined,
    alunos: []
  }

  alunos: Aluno[] = [];
  displayedColumns = ['id', 'nome', 'presente'];

  presencas: number[] = [];

  constructor(private cursoService: CursoService,
    private aulaService: AulaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.aulaService.readById(id ? id : "").subscribe(aula => {
      this.aula = aula;

      this.cursoService.findEnrolledStudents().subscribe(alunos => {
        this.alunos = alunos;

        this.aulaService.findPresentStudents(this.aula).subscribe(presents => {
          this.markPresentStudents(presents);
        });
      });
    });
  }

  markPresentStudents(presents: Aluno[]) {
    for (let present of presents) {
      let alunoId = present.id ? present.id : 0;
      let checkbox = document.getElementById(alunoId.toString()) as HTMLInputElement;
      checkbox.checked = true;
    }
  }

  update(): void {
    for (let aluno of this.alunos) {
      let alunoId = aluno.id ? aluno.id : 0;
      let checkbox = document.getElementById(alunoId.toString()) as HTMLInputElement;
      if (checkbox.checked) {
        this.presencas.push(alunoId);
      }
    }

    this.aula.alunos = this.presencas;
    this.aulaService.update(this.aula).subscribe(() => {
      this.aulaService.showMessage("Aula atualizada com sucesso");
      this.router.navigate(["/aula"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/aula"]);
  }
}