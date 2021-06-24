import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from '../../curso-crud/curso.model';
import { CursoService } from '../../curso-crud/curso.service';
import { Materia } from '../materia.model';
import { MateriaService } from '../materia.service';

@Component({
  selector: 'app-materia-read',
  templateUrl: './materia-read.component.html',
  styleUrls: ['./materia-read.component.css']
})
export class MateriaReadComponent implements OnInit {

  cursos: Curso[] = [];
  materias: Materia[] = [];
  displayedColumns = ['id', 'nome', 'actions'];

  cursoId: string = "";

  constructor(private cursoService: CursoService, 
    private materiaService: MateriaService,
    private router: Router) { }

  ngOnInit(): void {
    this.cursoService.read().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  navigateToNovaMateria(): void {
    if (this.cursoId == "")
      this.materiaService.showMessage("Selecione o curso que deseja cadastrar uma nova matéria");
    else
      this.router.navigate(["materia/nova"]);
  }

  getMaterias(): void {
    this.materiaService.cursoId = this.cursoId;
    this.materiaService.read().subscribe(materias => {
      this.materias = materias;
    });
  }
}
