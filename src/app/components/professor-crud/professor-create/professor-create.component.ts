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

  consultaCep() {
    this.professorService.consultaCep(this.professor.enderecoResidencial.cep).subscribe(endereco => {
      this.professor.enderecoResidencial.uf = endereco.uf;
      this.professor.enderecoResidencial.cidade = endereco.localidade;
      this.professor.enderecoResidencial.bairro = endereco.bairro;
      this.professor.enderecoResidencial.logradouro = endereco.logradouro;
      this.professor.enderecoResidencial.complemento = endereco.complemento;
    });    
  }

  create(): void {
    if (!this.professorService.cpfValido(this.professor.cpf)) {
      this.professorService.showMessage("CPF inválido");
    } else if (!this.professorService.emailValido(this.professor.email)) {
      this.professorService.showMessage("e-Mail inválido");
    } else {
      this.professorService.create(this.professor).subscribe(() => {
        this.professorService.showMessage("Professor cadastrado com sucesso");
        this.router.navigate(["/professor"]);
      });
    }
  }

  cancel(): void {
    this.router.navigate(["/professor"]);
  }
}
