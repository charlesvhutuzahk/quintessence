import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StockService extends ApiService<any> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, 'stocks');
  }
}
