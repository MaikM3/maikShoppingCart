import { Router } from 'express';
import { getAll, getOne, add, update, remove } from './tax'
const taxRouter = Router();

taxRouter.get('/',getAll);
taxRouter.get('/:id/',getOne);
taxRouter.post('/', add);
taxRouter.put('/:id', update);
taxRouter.delete('/:id', remove);

export default taxRouter;
