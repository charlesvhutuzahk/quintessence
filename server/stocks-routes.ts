import {Request, Response} from 'express';
import {STOCKS, STOCKVALUES} from "./db-data";

export function getAllStocks(req: Request, res: Response) {

    console.log("Retrieving stocks data ...");

    setTimeout(() => {

      res.status(200).json(STOCKS);

    }, 1000);

}

export function getAllStockValues(req: Request, res: Response) {
  
  console.log("Retrieving stocks values data ...");

  setTimeout(() => {

    res.status(200).json(STOCKVALUES);

  }, 1000);

}
export function getStockValuelistByStockId(req: Request, res: Response) {
  const stockId = +req.params["stockId"];
  const stockValue = STOCKS.find(stock=> stock.id === stockId);
  const stockValues = STOCKVALUES;
  const stock = stockValues.filter(stockValue => stockValue.stock_id === stockId);
  for(let i = 0; i < stock.length; i++) {
    stock[i]['stock'] = stockValue?.stock
  }
  setTimeout(() => {

     res.status(200).json(stock);

  }, 1000);
}
