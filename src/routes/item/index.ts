import { Router } from 'express';
import { getAll, } from './item'
const itemRouter = Router();

itemRouter.get('/',getAll);

export default itemRouter;
