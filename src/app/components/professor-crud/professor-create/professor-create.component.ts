import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from '../professor.model';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-professor-create',
  templateUrl: './professor-create.component.html',
  styleUrls: ['./professor-create.component.css']
})
export class ProfessorCreateComponent implements OnInit {

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

  constructor(private professorService: ProfessorService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.professorService.create(this.professor).subscribe(() => {
      this.professorService.showMessage("Professor cadastrado com sucesso");
      this.router.navigate(["/professor"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/professor"]);
  }
}
