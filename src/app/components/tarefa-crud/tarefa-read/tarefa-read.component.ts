import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from '../../curso-crud/curso.model';
import { CursoService } from '../../curso-crud/curso.service';
import { Materia } from '../../materia-crud/materia.model';
import { MateriaService } from '../../materia-crud/materia.service';
import { Tarefa } from '../tarefa.model';
import { TarefaService } from '../tarefa.service';

@Component({
  selector: 'app-tarefa-read',
  templateUrl: './tarefa-read.component.html',
  styleUrls: ['./tarefa-read.component.css']
})
export class TarefaReadComponent implements OnInit {

  cursos: Curso[] = [];
  materias: Materia[] = [];
  tarefas: Tarefa[] = [];
  displayedColumns = ["descricao", "data", "dataEntrega", "actions"]

  cursoId: string = "";
  materiaId: string = "";

  constructor(private cursoService: CursoService,
    private materiaService: MateriaService,
    private tarefaService: TarefaService,
    private router: Router) { }

  ngOnInit(): void {
    this.cursoService.read().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  getMaterias(): void {
    this.materiaService.cursoId = this.cursoId;
    this.materiaService.read().subscribe(materias => {
      this.materias = materias;
    });

    /*this.cursoService.cursoId = this.cursoId;
    this.cursoService.findEnrolledStudents().subscribe(alunos => {
      this.alunos = alunos;
    });*/
  }

  getTarefas(): void {
    this.tarefaService.cursoId = this.cursoId;
    this.tarefaService.materiaId = this.materiaId;
    this.tarefaService.read().subscribe(tarefas => {
      this.tarefas = tarefas;
    });
  }

  navigateToNovaTarefa(): void {
    if (this.cursoId == "" || this.materiaId == "")
      this.tarefaService.showMessage("Selecione o curso e a matéria que deseja cadastrar uma nova aula");
    else  
      this.router.navigate(["/tarefa/nova"]);
  }
}