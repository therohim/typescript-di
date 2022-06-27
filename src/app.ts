import * as bodyParser from "body-parser";
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import { TaskController } from "./controller/task.controller";
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import taskRouter from "./routes/task.router";
// import taskRouter from "./routes/task.router";
require('dotenv').config()

class App {

    public express: express.Application;
    public logger: APILogger;
    // public taskController: TaskController;

    /* Swagger files start */
    private swaggerFile: any = ("./swagger/swagger.json");
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private swaggerDocument = JSON.parse(this.swaggerData);
    /* Swagger files end */

    private publicRoutes: any = "/api/task"

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new APILogger();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get(`${this.publicRoutes}/health-check`, (req, res)=>{
            res.json({
                'message': 'Health check success'
            }).status(200)
        })

        this.express.use(`${this.publicRoutes}/v0/tasks`, taskRouter)


var options = {
    explorer: true,
    swaggerOptions: {
      urls: [
        {
          url: 'http://petstore.swagger.io/v2/swagger.json',
          name: 'Spec1'
        },
        {
          url: 'http://petstore.swagger.io/v2/swagger.json',
          name: 'Spec2'
        }
      ]
    }
  }
  
        // swagger docs
        this.express.use(`${this.publicRoutes}/docs`, swaggerUi.serve,
            swaggerUi.setup(this.swaggerDocument, null, null));

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.json({
                "message":"Make sure url is correct!!!"
            }).status(500)
        });
    }
}

export default new App().express;