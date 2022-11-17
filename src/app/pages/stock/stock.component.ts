import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { StockValuesService } from 'src/app/services/stock-values.service';
import { StockService } from 'src/app/services/stock.service';

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
}
