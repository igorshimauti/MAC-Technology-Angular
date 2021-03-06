import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professor } from '../professor.model';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-professor-delete',
  templateUrl: './professor-delete.component.html',
  styleUrls: ['./professor-delete.component.css']
})
export class ProfessorDeleteComponent implements OnInit {

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

  constructor(private professorService: ProfessorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.professorService.readById(id ? id : "").subscribe(professor => {
      this.professor = professor;
    });
  }

  delete(): void {
    this.professorService.delete(this.professor).subscribe(() => {
      this.professorService.showMessage("Professor excluido com sucesso");
      this.router.navigate(["/professor"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/professor"]);
  }
}
