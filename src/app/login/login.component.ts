import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  constructor( public router: Router ) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar(forma: NgForm) {

    // this.router.navigate([ '/dashboard' ]);

  }

}
