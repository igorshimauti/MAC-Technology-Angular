import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarefa } from '../tarefa.model';
import { TarefaService } from '../tarefa.service';
import { TipoTarefa } from '../tipoTarefa.model';

@Component({
  selector: 'app-tarefa-update',
  templateUrl: './tarefa-update.component.html',
  styleUrls: ['./tarefa-update.component.css']
})
export class TarefaUpdateComponent implements OnInit {

  tarefa: Tarefa = {
    id: undefined,
    tipoTarefaId: "",
    descricao: "",
    data: undefined,
    dataEntrega: undefined
  }

  tipos: TipoTarefa[] = [];

  constructor(private tarefaService: TarefaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tarefaService.findTiposTarefa().subscribe(tipos => {
      this.tipos = tipos;

      const id = this.route.snapshot.paramMap.get("id");
      this.tarefaService.readById(id ? id : "").subscribe(tarefa => {
        this.tarefa = tarefa;
      });
    });
  }

  update(): void {
    this.tarefaService.update(this.tarefa).subscribe(() => {
      this.tarefaService.showMessage("Tarefa atualizada com sucesso");
      this.router.navigate(["/tarefa"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/tarefa"]);
  }
}
