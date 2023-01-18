import { ApiCryptoService, CryptoCurrency } from './../../services/api-crypto.service';
import { Component, Input, ɵɵsetComponentScope } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {
  constructor(
    private cryptoService: ApiCryptoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  query = '';
  cryptoCurrencies = new Array<CryptoCurrency>();

  //#region LIFE CYCLE
  ngOnInit() {
    this.fetchCryptoCurrencies();
  }
  //#endregion

  // #region HELPERS
  fetchCryptoCurrencies() {
    this.cryptoService.getCryptoCurrencies()
      .subscribe((data: any) => {
        this.cryptoCurrencies = data;
      })
  }
  //#endregion

  // #region HANDLERS
  onKey(event: any) {
    this.query = event.target.value;
  }

  handleClick(crypto: CryptoCurrency) {
    console.log('clicked: ', crypto)
    this.router.navigate([`${crypto.id}`], { relativeTo: this.route})
  }
  //#endregion
}
