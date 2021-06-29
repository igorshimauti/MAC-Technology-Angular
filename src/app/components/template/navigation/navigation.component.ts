import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../views/login/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  mostrarMenu: boolean = false;
  mostrarMenuUsuario: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.mostrarMenuEmitter.subscribe(mostrarMenu => {
      this.mostrarMenu = mostrarMenu;
    });

    this.authService.mostrarMenuUsuarioEmitter.subscribe(mostrarMenuUsuario => {
      this.mostrarMenuUsuario = mostrarMenuUsuario;
    });
  }
}