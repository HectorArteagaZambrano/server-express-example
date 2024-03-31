import http from 'http';
import { Application } from 'express'
import { Bootstrap } from './base.bootstrap';

export default class extends Bootstrap {

    constructor(private readonly app: Application) {
        super()
    }

    initialize(): Promise<string | Error> {
        return new Promise<string | Error>((resolve, reject) => {
            const server = http.createServer(this.app)
            server
                .listen(3000)
                .on('listening', () => {
                    resolve('Promise resolve successfully')
                    console.log('listening on port 3000')
                })
                .on('error', (error: Error) => {
                    reject(error)
                    console.log('Error on port 3000', error)
                })
        })
    }

}