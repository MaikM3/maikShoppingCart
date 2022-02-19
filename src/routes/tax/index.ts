import { Router } from 'express';
import { getAll, getOne, add, update, remove } from './tax'
const taxRouter = Router();

taxRouter.get('/',getAll);
taxRouter.get('/:id/',getOne);
taxRouter.post('/', add);
taxRouter.put('/', update);
taxRouter.delete('/', remove);

export default taxRouter;
