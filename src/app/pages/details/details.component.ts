import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        console.log('CryptoDetails', this.cryptoDetails)
      });
    this.cryptoService.getCryptoChart(id as string)
      .subscribe((data: any) => {
        this.cryptoChart = data;
        console.log('CryptoChart', this.cryptoChart)
      });
  }
  // #endregion
}
