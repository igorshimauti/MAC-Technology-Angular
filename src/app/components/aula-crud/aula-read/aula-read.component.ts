import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from '../../aluno-crud/aluno.model';
import { Curso } from '../../curso-crud/curso.model';
import { CursoService } from '../../curso-crud/curso.service';
import { Materia } from '../../materia-crud/materia.model';
import { MateriaService } from '../../materia-crud/materia.service';
import { Aula } from '../aula.model';
import { AulaService } from '../aula.service';

@Component({
  selector: 'app-aula-read',
  templateUrl: './aula-read.component.html',
  styleUrls: ['./aula-read.component.css']
})
export class AulaReadComponent implements OnInit {

  cursos: Curso[] = [];
  materias: Materia[] = [];
  alunos: Aluno[] = [];
  aulas: Aula[] = [];
  displayedColumns = ["tema", "actions"]

  cursoId: string = "";
  materiaId: string = "";

  constructor(private cursoService: CursoService,
    private materiaService: MateriaService,
    private aulaService: AulaService,
    private router: Router) { }

  ngOnInit(): void {
    this.cursoService.read().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  getMateriasAndAlunos(): void {
    this.materiaService.cursoId = this.cursoId;
    this.materiaService.read().subscribe(materias => {
      this.materias = materias;
    });

    this.cursoService.cursoId = this.cursoId;
    this.cursoService.findEnrolledStudents().subscribe(alunos => {
      this.alunos = alunos;
    });
  }

  getAulas(): void {
    this.aulaService.cursoId = this.cursoId;
    this.aulaService.materiaId = this.materiaId;
    this.aulaService.read().subscribe(aulas => {
      this.aulas = aulas;
    });
  }

  navigateToNovaAula(): void {
    if (this.cursoId == "" || this.materiaId == "")
      this.aulaService.showMessage("Selecione o curso e a matéria que deseja cadastrar uma nova aula");
    else  
      this.router.navigate(["/aula/nova"]);
  }
}
