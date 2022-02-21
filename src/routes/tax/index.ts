import { Router } from 'express';
import { getAll, getOne, add, update, remove } from './tax'

import { body } from 'express-validator';

const taxRouter = Router();

taxRouter.get('/',getAll);
taxRouter.get('/:id/',getOne);
taxRouter.post('/', body('name').isLength({ min: 5 }),  add);
taxRouter.put('/:id', update);
taxRouter.delete('/:id', remove);

export default taxRouter;
