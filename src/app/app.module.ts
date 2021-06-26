import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { FooterComponent } from './components/template/footer/footer.component';
import { NavigationComponent } from './components/template/navigation/navigation.component';

import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/views/login/login.component';
import { AlunoComponent } from './components/views/aluno/aluno.component';
import { AlunoCreateComponent } from './components/aluno-crud/aluno-create/aluno-create.component';
import { AlunoReadComponent } from './components/aluno-crud/aluno-read/aluno-read.component';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CursoReadComponent } from './components/curso-crud/curso-read/curso-read.component';
import { CursoCreateComponent } from './components/curso-crud/curso-create/curso-create.component';
import { CursoUpdateComponent } from './components/curso-crud/curso-update/curso-update.component';
import { CursoDeleteComponent } from './components/curso-crud/curso-delete/curso-delete.component';
import { AlunoUpdateComponent } from './components/aluno-crud/aluno-update/aluno-update.component';
import { AlunoDeleteComponent } from './components/aluno-crud/aluno-delete/aluno-delete.component';
import { ProfessorComponent } from './components/views/professor/professor.component';
import { ProfessorReadComponent } from './components/professor-crud/professor-read/professor-read.component';
import { ProfessorCreateComponent } from './components/professor-crud/professor-create/professor-create.component';
import { ProfessorUpdateComponent } from './components/professor-crud/professor-update/professor-update.component';
import { ProfessorDeleteComponent } from './components/professor-crud/professor-delete/professor-delete.component';
import { MateriaComponent } from './components/views/materia/materia.component';
import { MateriaReadComponent } from './components/materia-crud/materia-read/materia-read.component';
import { MateriaCreateComponent } from './components/materia-crud/materia-create/materia-create.component';
import { MateriaUpdateComponent } from './components/materia-crud/materia-update/materia-update.component';
import { MateriaDeleteComponent } from './components/materia-crud/materia-delete/materia-delete.component';
import { AulaComponent } from './components/views/aula/aula.component';
import { AulaCreateComponent } from './components/aula-crud/aula-create/aula-create.component';
import { AulaReadComponent } from './components/aula-crud/aula-read/aula-read.component';
import { AulaUpdateComponent } from './components/aula-crud/aula-update/aula-update.component';
import { AulaDeleteComponent } from './components/aula-crud/aula-delete/aula-delete.component';
import { AuthService } from './components/views/login/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UsuarioCreateComponent } from './components/usuario-crud/usuario-create/usuario-create.component';
import { UsuarioReadComponent } from './components/usuario-crud/usuario-read/usuario-read.component';
import { UsuarioComponent } from './components/views/usuario/usuario.component';

import { NgxMaskModule } from "ngx-mask";
import { UsuarioAuthorizeComponent } from './components/usuario-crud/usuario-authorize/usuario-authorize.component';
import { LogoutComponent } from './components/views/logout/logout.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    AlunoComponent,
    AlunoCreateComponent,
    AlunoReadComponent,
    CursoReadComponent,
    CursoCreateComponent,
    CursoUpdateComponent,
    CursoDeleteComponent,
    AlunoUpdateComponent,
    AlunoDeleteComponent,
    ProfessorComponent,
    ProfessorReadComponent,
    ProfessorCreateComponent,
    ProfessorUpdateComponent,
    ProfessorDeleteComponent,
    MateriaComponent,
    MateriaReadComponent,
    MateriaCreateComponent,
    MateriaUpdateComponent,
    MateriaDeleteComponent,
    AulaComponent,
    AulaCreateComponent,
    AulaReadComponent,
    AulaUpdateComponent,
    AulaDeleteComponent,
    UsuarioCreateComponent,
    UsuarioReadComponent,
    UsuarioComponent,
    UsuarioAuthorizeComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    NgxMaskModule.forRoot({dropSpecialCharacters: false})
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  },
  AuthService,
  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
