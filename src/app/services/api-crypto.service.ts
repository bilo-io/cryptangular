import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

// reference: https://remotestack.io/angular-httpclient-service-example-tutorial/#:~:text=Angular%2014%20HttpClient%20Service%20Example%201%20Create%20an,Get%208%20Receive%20the%20Http%20Response%20More%20items

export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
}

export interface CryptoChart {
  market_caps: number[][];
  prices: number[][];
  total_volumes: number[][];
}

export interface CryptoDetails {
  id: string;
  name: string;
  symbol: string;
  links: {
    homepage?: string[],
  };
  image: {
    large?: string;
    small?: string;
    thumb?: string;
  };
  market_data: {
    max_supply: number;
    price_change_1y: {[key in string]: number};
    price_change_1y_in_currency: {[key in string]: number}
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiCryptoService {
  endpoint = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getCryptoCurrencies(): Observable<CryptoCurrency> {
    return this.http.get<CryptoCurrency>(`${this.endpoint}/coins`)
      .pipe(
        retry(2),
        catchError(this.httpError)
      );
  }

  getCryptoDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/coins/${id}`)
      .pipe(
        retry(2),
        catchError(this.httpError)
      );
  }

  getCryptoChart(id: string): Observable<any | any[]> {
    // TODO: make parameters configurable from UI
    // - vs_currency (fiat)
    // - days
    return this.http.get<any>(`${this.endpoint}/coins/${id}/market_chart?vs_currency=usd&days=365`)
  }

  httpError(error: any) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
