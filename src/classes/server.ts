
import {Routes} from "../routes/routes";
import express from 'express'
import * as http from "http";

export class Server {
    public app: express.Application;
    private httpServer: http.Server | null = null;

    constructor() {
        this.app = express();
        Routes.register(this.app);
    }

    public async start() {
        //database connections go here:
        await this.startHttp();
    }

    private async startHttp() {
        return new Promise<void>((resolve, reject) => {
            this.httpServer = http.createServer(this.app);
            this.httpServer.listen(3001);
            this.httpServer.on('error', (error: any) => {
                if (error.syscall !== 'listen') {
                    throw error;
                }
                switch (error.code) {
                    case 'EACCES':
                        console.error('Server', 'Requires elevated privileges');
                        process.exit(1);
                        break;
                    case 'EADDRINUSE':
                        console.error('Server', 'Address is already in use');
                        process.exit(1);
                        break;
                    default:
                        throw error;
                }
                reject(error);
            });
            this.httpServer.on('listening', () => {
                if (this.httpServer) {
                    console.log(
                        'Server running at ' +
                        'http://localhost:3001'
                    );
                    resolve();
                }
            });
        });
    }
}
