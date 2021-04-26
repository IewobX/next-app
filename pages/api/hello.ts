import { NextApiRequest, NextApiResponse } from 'next'

export default (_: NextApiRequest, res: NextApiResponse) => {
    setTimeout(() => {
        res.status(200).json({ 
            code: 200,
            data: {},
            message: 'ok'
        });
    }, 3000);
}