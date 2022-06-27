import { Sequelize } from 'sequelize-typescript'
import { Tasks } from '../model/task.model';
require('dotenv').config()

export const connect = () => {
    
    const hostName = process.env.DB_HOST;
    const userName = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;
    const port : any  = process.env.DB_PORT;
    const dialect: any = process.env.DIALECT;

    const operatorsAliases: any = 0;

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        port:port,
        dialect,
        operatorsAliases,
        repositoryMode: true,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    sequelize.addModels([Tasks]);

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    
    return db;

}