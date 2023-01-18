import { CryptoChart } from './../../services/api-crypto.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ApiCryptoService } from 'src/app/services/api-crypto.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent {
  constructor(
    private cryptoService: ApiCryptoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  // #region CHART
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      // 'January',
      // 'February',
      // 'March',
      // 'April',
      // 'May',
      // 'June',
      // 'July',
      // 'August',
      // 'September',
      // 'October',
      // 'November',
      // 'December'
    ],
    datasets: [
      {
        // data: [65, 59, 80, 81, 56, 55, 40, 21, 30, 99],
        data: [],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'rgba(100,100,255,0.7)',
        backgroundColor: 'rgba(100,100,255,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    elements: {
      point: {
        radius: 0
      }
    }

  };
  public lineChartLegend = true;
  public cryptoSummary = '';
  // #endregion

  // #region FIELDS
  cryptoDetails = {}
  cryptoChart = new Array<any>();
  // #endregion

  //#region LIFE CYCLE
  ngOnInit() {
    this.fetchCryptoDetails();
  }
  // #endregion

  // #region HELPERS
  fetchCryptoDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('mounted details page', id);

    this.cryptoService.getCryptoDetails(id as string)
      .subscribe((data: any) => {
        this.cryptoDetails = data;
        console.log('CryptoDetails', this.cryptoDetails);
        this.cryptoSummary = `${data.name} (${data.symbol.toUpperCase()})`;
      });

    this.cryptoService.getCryptoChart(id as string)
      .subscribe((data: any) => {
        this.cryptoChart = data;
        console.log('CryptoChart', this.cryptoChart);
        this.setChartData(data)
      });
  }

  setChartData(chartData: CryptoChart) {
    this.lineChartData = {
      labels: chartData.prices
        // .filter((p, i) => i % 30 === 0) // get a date timestamp for every 30 days
        .map(p => new Date(p[0]).toISOString().split('T')[0]),
      datasets: [
        {
          data: chartData.prices.map(p => p[1]),
          label: 'Series A',
          fill: true,
          tension: 0.5,
          borderColor: 'rgba(100,100,255,0.7)',
          backgroundColor: 'rgba(100,100,255,0.3)'
        }
      ]
    }
  }
  // #endregion
}
