import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professor } from '../../professor-crud/professor.model';
import { ProfessorService } from '../../professor-crud/professor.service';
import { Materia } from '../materia.model';
import { MateriaService } from '../materia.service';

@Component({
  selector: 'app-materia-delete',
  templateUrl: './materia-delete.component.html',
  styleUrls: ['./materia-delete.component.css']
})
export class MateriaDeleteComponent implements OnInit {

  professor: Professor = {
    id: undefined,
    nome: "",
    cpf: "",
    dataNascimento: new Date,
    email: "",
    celular: "",
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

      this.professorService.readById(this.materia.professorId).subscribe(professor => {
        this.professor = professor;
      });
    });
  }

  delete(): void {
    this.materiaService.delete(this.materia).subscribe(() => {
      this.materiaService.showMessage("Materia excluida com sucesso");
      this.router.navigate(["/materia"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/materia"]);
  }
}