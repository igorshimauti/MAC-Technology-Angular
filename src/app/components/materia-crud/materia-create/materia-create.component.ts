import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from '../../professor-crud/professor.model';
import { ProfessorService } from '../../professor-crud/professor.service';
import { Materia } from '../materia.model';
import { MateriaService } from '../materia.service';

@Component({
  selector: 'app-materia-create',
  templateUrl: './materia-create.component.html',
  styleUrls: ['./materia-create.component.css']
})
export class MateriaCreateComponent implements OnInit {

  
  materia: Materia = {
    id: undefined,
    professorId: "",
    nome: ""
  }

  professores: Professor[] = [];

  constructor(private professorService: ProfessorService, 
    private materiaService: MateriaService, 
    private router: Router) { }

  ngOnInit(): void {
    this.professorService.read().subscribe(professores => {
      this.professores = professores;
    });
  }

  create(): void {
    this.materiaService.create(this.materia).subscribe(() => {
      this.materiaService.showMessage("Materia cadastrada com sucesso");
      this.router.navigate(["/materia"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/materia"])
  }

}
