import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from '../aula.model';
import { AulaService } from '../aula.service';

@Component({
  selector: 'app-aula-delete',
  templateUrl: './aula-delete.component.html',
  styleUrls: ['./aula-delete.component.css']
})
export class AulaDeleteComponent implements OnInit {

  aula: Aula = {
    id: undefined,
    tema: "",
    data: undefined,
    alunos: []
  }

  constructor(private aulaService: AulaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.aulaService.readById(id ? id : "").subscribe(aula => {
      this.aula = aula;
    });
  }

  delete(): void {
    this.aulaService.delete(this.aula).subscribe(() => {
      this.aulaService.showMessage("Aula excluida com sucesso");
      this.router.navigate(["/aula"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/aula"]);
  }

}
