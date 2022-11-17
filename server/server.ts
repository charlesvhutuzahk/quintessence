import * as express from 'express';
import {Application} from "express";
import {getAllStocks, getAllStockValues, getStockValuelistByStockId} from "./stocks-routes";
const bodyParser = require('body-parser');
var cors = require('cors');
var corsOptions = {
    origin: '*'
}

const app: Application = express();
app.use(cors(corsOptions))

app.use(bodyParser.json());

app.route('/api/stocks').get(getAllStocks);

app.route('/api/stocks-values').get(getAllStockValues);

app.route('/api/stocks-values/:stockId').get(getStockValuelistByStockId);

const httpServer:any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});




