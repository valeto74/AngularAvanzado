import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('chartLabels') doughnutChartLabels: string[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input('chartData') doughnutChartData: number[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input('chartType') doughnutChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
