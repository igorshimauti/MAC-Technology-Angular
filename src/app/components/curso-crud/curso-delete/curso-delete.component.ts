import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../curso.model';
import { CursoService } from '../curso.service';

@Component({
  selector: 'app-curso-delete',
  templateUrl: './curso-delete.component.html',
  styleUrls: ['./curso-delete.component.css']
})
export class CursoDeleteComponent implements OnInit {

  curso: Curso = {
    id: undefined,
    nome: ""
  }

  constructor(private cursoService: CursoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.cursoService.readById(id ? id : '').subscribe(curso => {
      this.curso = curso;
    })
  }

  delete(): void {
    this.cursoService.delete(this.curso).subscribe(() => {
      this.cursoService.showMessage("Curso excluido com sucesso.");
      this.router.navigate(['/home']);
    });
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
