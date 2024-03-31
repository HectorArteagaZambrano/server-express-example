import { Request, Response } from 'express'

export default class {
    static notFound(req: Request, res: Response) {
        res.status(400).send('Not Found')
    }
}