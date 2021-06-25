import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./components/views/login/login.component";
import { UsuarioComponent } from "./components/views/usuario/usuario.component";
import { HomeComponent } from './components/views/home/home.component';
import { AlunoComponent } from './components/views/aluno/aluno.component';
import { ProfessorComponent } from './components/views/professor/professor.component';
import { MateriaComponent } from './components/views/materia/materia.component';
import { AulaComponent } from './components/views/aula/aula.component';

import { UsuarioCreateComponent } from './components/usuario-crud/usuario-create/usuario-create.component';
import { CursoCreateComponent } from './components/curso-crud/curso-create/curso-create.component';
import { AlunoCreateComponent } from './components/aluno-crud/aluno-create/aluno-create.component';
import { ProfessorCreateComponent } from './components/professor-crud/professor-create/professor-create.component';
import { MateriaCreateComponent } from './components/materia-crud/materia-create/materia-create.component';
import { AulaCreateComponent } from './components/aula-crud/aula-create/aula-create.component';

import { UsuarioUpdateComponent } from "./components/usuario-crud/usuario-update/usuario-update.component";
import { CursoUpdateComponent } from './components/curso-crud/curso-update/curso-update.component';
import { AlunoUpdateComponent } from './components/aluno-crud/aluno-update/aluno-update.component';
import { ProfessorUpdateComponent } from './components/professor-crud/professor-update/professor-update.component';
import { MateriaUpdateComponent } from './components/materia-crud/materia-update/materia-update.component';
import { AulaUpdateComponent } from './components/aula-crud/aula-update/aula-update.component';

import { CursoDeleteComponent } from './components/curso-crud/curso-delete/curso-delete.component';
import { AlunoDeleteComponent } from './components/aluno-crud/aluno-delete/aluno-delete.component';
import { ProfessorDeleteComponent } from './components/professor-crud/professor-delete/professor-delete.component';
import { MateriaDeleteComponent } from './components/materia-crud/materia-delete/materia-delete.component';
import { AulaDeleteComponent } from './components/aula-crud/aula-delete/aula-delete.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{
  path: "login",
  component: LoginComponent
},
{
  path: "usuario",
  component: UsuarioComponent
},
{
  path: "usuario/novo",
  component: UsuarioCreateComponent
},
{
  path: "usuario/atualizar/:id",
  component: UsuarioUpdateComponent
},
{
  path: "curso",
  canActivate: [AuthGuard],
  component: HomeComponent
},
{
  path: "curso/novo",
  canActivate: [AuthGuard],
  component: CursoCreateComponent
},
{
  path: "curso/atualizar/:id",
  canActivate: [AuthGuard],
  component: CursoUpdateComponent
},
{
  path: "curso/excluir/:id",
  canActivate: [AuthGuard],
  component: CursoDeleteComponent
},
{
  path: "aluno",
  canActivate: [AuthGuard],
  component: AlunoComponent
},
{
  path: "aluno/novo",
  canActivate: [AuthGuard],
  component: AlunoCreateComponent
},
{
  path: "aluno/atualizar/:id",
  canActivate: [AuthGuard],
  component: AlunoUpdateComponent
},
{
  path: "aluno/excluir/:id",
  canActivate: [AuthGuard],
  component: AlunoDeleteComponent
},
{
  path: "professor",
  canActivate: [AuthGuard],
  component: ProfessorComponent
},
{
  path: "professor/novo",
  canActivate: [AuthGuard],
  component: ProfessorCreateComponent
},
{
  path: "professor/atualizar/:id",
  canActivate: [AuthGuard],
  component: ProfessorUpdateComponent
},
{
  path: "professor/excluir/:id",
  canActivate: [AuthGuard],
  component: ProfessorDeleteComponent
},
{
  path: "materia",
  canActivate: [AuthGuard],
  component: MateriaComponent
},
{
  path: "materia/nova",
  canActivate: [AuthGuard],
  component: MateriaCreateComponent
},
{
  path: "materia/atualizar/:id",
  canActivate: [AuthGuard],
  component: MateriaUpdateComponent
},
{
  path: "materia/excluir/:id",
  canActivate: [AuthGuard],
  component: MateriaDeleteComponent
},
{
  path: "aula",
  canActivate: [AuthGuard],
  component: AulaComponent
},
{
  path: "aula/nova",
  canActivate: [AuthGuard],
  component: AulaCreateComponent
},
{
  path: "aula/atualizar/:id",
  canActivate: [AuthGuard],
  component: AulaUpdateComponent
},
{
  path: "aula/excluir/:id",
  canActivate: [AuthGuard],
  component: AulaDeleteComponent
},
{
  path: "",
  redirectTo: "curso",
  pathMatch: "full"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
