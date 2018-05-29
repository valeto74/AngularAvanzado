import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  constructor( private router: Router ) {
    this.router.events
      .subscribe( event => {
        console.log( event );
      });
  }

  ngOnInit() {
  }

}
