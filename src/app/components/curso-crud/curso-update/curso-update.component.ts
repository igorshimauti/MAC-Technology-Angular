import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../curso.model';
import { CursoService } from '../curso.service';

@Component({
  selector: 'app-curso-update',
  templateUrl: './curso-update.component.html',
  styleUrls: ['./curso-update.component.css']
})
export class CursoUpdateComponent implements OnInit {

  curso: Curso = {
    id: undefined,
    nome: ""
  }

  constructor(private cursoService: CursoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.cursoService.readById(id ? id : '').subscribe(curso => {
      this.curso = curso;
    });
  }

  update(): void {
    this.cursoService.update(this.curso).subscribe(() => {
      this.cursoService.showMessage('Curso atualizado com sucesso.');
      this.router.navigate(['/curso']);
    });
  }

  cancel(): void {
    this.router.navigate(['/curso']);
  }
}