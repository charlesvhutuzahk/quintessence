import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StockValuesService extends ApiService<any> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, 'stocks-values');
  }
}