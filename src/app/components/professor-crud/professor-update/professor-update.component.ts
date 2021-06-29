import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professor } from '../professor.model';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-professor-update',
  templateUrl: './professor-update.component.html',
  styleUrls: ['./professor-update.component.css']
})
export class ProfessorUpdateComponent implements OnInit {

  professor: Professor = {
    id: undefined,
    nome: "",
    cpf: "",
    dataNascimento: undefined,
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

  consultaCep() {
    this.professorService.consultaCep(this.professor.enderecoResidencial.cep).subscribe(endereco => {
      this.professor.enderecoResidencial.uf = endereco.uf;
      this.professor.enderecoResidencial.cidade = endereco.localidade;
      this.professor.enderecoResidencial.bairro = endereco.bairro;
      this.professor.enderecoResidencial.logradouro = endereco.logradouro;
      this.professor.enderecoResidencial.complemento = endereco.complemento;
    });    
  }

  update(): void {
    if (!this.professorService.cpfValido(this.professor.cpf)) {
      this.professorService.showMessage("CPF inválido");
      return;
    }
    
    if (!this.professorService.emailValido(this.professor.email)) {
      this.professorService.showMessage("e-Mail inválido");
      return;
    }

    this.professorService.update(this.professor).subscribe(() => {
      this.professorService.showMessage("Professor atualizado com sucesso");
      this.router.navigate(["/professor"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/professor"]);
  }
}
