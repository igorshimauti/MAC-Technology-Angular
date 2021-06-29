import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from '../../curso-crud/curso.service';
import { Tarefa } from '../tarefa.model';
import { TarefaService } from '../tarefa.service';
import { TipoTarefa } from '../tipoTarefa.model';

@Component({
  selector: 'app-tarefa-create',
  templateUrl: './tarefa-create.component.html',
  styleUrls: ['./tarefa-create.component.css']
})
export class TarefaCreateComponent implements OnInit {

  tarefa: Tarefa = {
    id: undefined,
    tipoTarefaId: "",
    descricao: "",
    data: undefined,
    dataEntrega: undefined
  }

  tipos: TipoTarefa[] = [];

  constructor(private tarefaService: TarefaService, 
    private router: Router) { }

  ngOnInit(): void {
    this.tarefaService.findTiposTarefa().subscribe(tipos => {
      this.tipos = tipos;
    });
  }

  create(): void {
    this.tarefaService.create(this.tarefa).subscribe(() => {
      this.tarefaService.showMessage("Tarefa cadastrada com sucesso");
      this.router.navigate(["/tarefa"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/tarefa"]);
  }
}