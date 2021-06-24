import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from '../curso.model';
import { CursoService } from '../curso.service';


@Component({
  selector: 'app-curso-create',
  templateUrl: './curso-create.component.html',
  styleUrls: ['./curso-create.component.css']
})
export class CursoCreateComponent implements OnInit {

  curso: Curso = {
    id: undefined,
    nome: ""
  }

  constructor(private cursoService: CursoService, private router: Router) { }

  ngOnInit(): void {
    
  }

  create(): void {
    this.cursoService.create(this.curso).subscribe(() => {
      this.cursoService.showMessage('Curso cadastrado com sucesso.');
      this.router.navigate(['/home']);
    })
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
