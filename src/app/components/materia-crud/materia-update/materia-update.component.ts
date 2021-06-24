import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professor } from '../../professor-crud/professor.model';
import { ProfessorService } from '../../professor-crud/professor.service';
import { Materia } from '../materia.model';
import { MateriaService } from '../materia.service';

@Component({
  selector: 'app-materia-update',
  templateUrl: './materia-update.component.html',
  styleUrls: ['./materia-update.component.css']
})
export class MateriaUpdateComponent implements OnInit {

  professores: Professor[] = [];
  materia: Materia = {
    id: undefined,
    professorId: "",
    nome: ""
  }

  constructor(private professorService: ProfessorService,
    private materiaService: MateriaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let materiaId = this.route.snapshot.paramMap.get("id");
    materiaId = materiaId ? materiaId : "";

    this.materiaService.readById(materiaId).subscribe(materia => {
      this.materia = materia;
    });

    this.professorService.read().subscribe(professores => {
      this.professores = professores;
    });
  }

  update(): void {
    this.materiaService.update(this.materia).subscribe(() => {
      this.materiaService.showMessage("Materia atualizada com sucesso");
      this.router.navigate(["/materia"]);
    });    
  }

  cancel(): void {
    this.router.navigate(["/materia"]);
  }
}