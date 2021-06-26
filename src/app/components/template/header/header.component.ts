import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../views/login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mostrarLogout: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.mostrarMenuEmitter.subscribe(mostrarLogout => {
      this.mostrarLogout = mostrarLogout;
    });
  }
}