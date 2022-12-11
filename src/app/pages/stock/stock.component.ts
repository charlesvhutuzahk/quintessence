import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { StockValuesService } from 'src/app/services/stock-values.service';
import { StockService } from 'src/app/services/stock.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  exportAsConfig: ExportAsConfig = {
    type: 'json', 
    elementIdOrContent: 'stock-values', 
  }
  stockList: any[] = [];
  stockValuesList: any[] = [];
  selectedStockId?: number;
  stockFilter: any = { $or: [{stock: ''}, {industry: ''}, {sector: ''}, {currency_code: ''}] };
  activeRow: string = "";
  active: string = "pointer active";
  notActive: string = "pointer";
  stockSelected: boolean = false;
  ascending: boolean = false;
  constructor(
    private stockService: StockService,
    private stockValueService: StockValuesService,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit(): void {
    this.loadStocks();
  }
  loadStocks() {
    this.stockService.get().subscribe(
      data => {
        this.stockList = data;
        console.log(data);
      }
    )
  }
  loadStockValues(stockId: number) {
    this.selectedStockId = stockId;
    this.stockValuesList = [];
    let stringStockId = this.selectedStockId.toString();
    this.stockValueService.getUrl(stringStockId).subscribe(
      data => {
        this.stockValuesList = data;
        console.log(data);
      }
    )
  }
  exportStockValues() {
    let fileName = this.stockValuesList[0].stock + ' JSON Export';
    this.exportAsService.save(this.exportAsConfig, fileName).subscribe(() => {
      // save started
    });
  }
  selectRow(stock: string) {
    if(this.activeRow === stock) {
      this.deSelectRow()
    } else {
      this.activeRow = stock;
      this.stockSelected = true
    }
  }
  deSelectRow() {
    this.activeRow = "";
    this.stockSelected = false;
  }
  sortStockValues(column: string) {
    if(column === 'stock') {
      this.stockValuesList = this.sortByString(this.stockValuesList, column);
    } else if(column === 'date') {
      this.stockValuesList = this.sortByDate(this.stockValuesList, column); 
    } else {
      this.stockValuesList = this.sortByNumber(this.stockValuesList, column);
    }
  }
  sortByDate(value: any[], column: string) {   
    if(this.ascending === true) {     
      value.sort((a, b) => moment(a[column]).unix() - moment(b[column]).unix());
      this.ascending = false;
    } else {
      value.sort((a, b) => moment(b[column]).unix() - moment(a[column]).unix());
      this.ascending = true;
    } 
    return value; 
  }
  sortByNumber(value: any[], column: string) {
    if(this.ascending === true) {     
      value.sort((a, b) => {
        return a[column] - b[column];
    });
      this.ascending = false;
    } else {
      value.sort((a, b) => {
        return b[column] - a[column];
    });
      this.ascending = true;
    } 
    return value; 
  }
  sortByString(value: any[], column: string) {
    if(this.ascending === true) { 
      value.sort((a, b) => a[column].localeCompare(b[column]));
      this.ascending = false;
    }
    else {
      value.sort((a, b) => b[column].localeCompare(a[column]));
      this.ascending = true;
    }
    return value;
  }
  sortStock(column: string) {
    this.stockList = this.sortByString(this.stockList, column);
  }
}
