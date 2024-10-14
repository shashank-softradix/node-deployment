
const express = require('express');
const  bodyParser =  require('body-parser');
const DB =  require('../src/helpers/db.js');
const Routes =  require("../src/index.js")
const swaggerUi = require('swagger-ui-express')

const swaggerDocument = require('../config/swagger.json')

//const swaggerSpec = require('../config/swagger')

import swaggerSpec  from '../config/swagger'

class Server {
    constructor(){
        this.app = null;
        this.db = null;
    }
    
    async initServer (){
        try{
            
            this.app = await express();
            this.app.use(bodyParser.json());
            this.app.use(
                bodyParser.urlencoded({
                    extended:true
                }),
            );
            // this.db = new DB();
            // await this.db.init();
            await this.healthCheckRoute();
            // await this.healthyDB();
            // await this.configureRoutes(this.db);

            // this.app.use('/api-docs', swaggerUi.serve);
            // this.app.get('/api-docs', swaggerUi.setup(swaggerDocument));

            this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


                return this.app
        }catch (err){
            throw err;
        }
    }
    
    async healthCheckRoute(){
        try{
            this.app.get("/",(req,res)=>{
                res.json({ 
                    status:"Healthy",
                    msg:"This works perfectly fine",
                });
            });
        }catch (err){
            throw err;
        }
    }
 
    async healthyDB(){
        try{
            if(await this.db.checkConnection()){
                this.app.get('/health',(req,res)=>{
                    res.json({
                        msg:"DB Connection Successfull",
                    });
                });
                return;
            }
            throw new Error('Error connecting to DB')
        }catch(err){
            throw err;
        }
    }

    async configureRoutes(db){
        this.router = express.Router();
        const routes =  new Routes(this.router,db);
        await routes.routesRegistration();
        this.app.use(this.router);
     }
}

module.exports = Server