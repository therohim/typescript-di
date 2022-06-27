import { Router } from 'express';
import { TaskController } from '../controller/task.controller';

const routes = Router();
const taskController = new TaskController()

routes.get('/', (req, res) => {
  taskController.getTasks()
    .then(data =>{
    })
  return res.json({ message: 'Hello World' });
});

routes.post('/', (req, res) => {
    console.log(req.body);
    taskController.createTask(req.body.task).then(data => res.json(data));
});

routes.put('/api/task', (req, res) => {
    taskController.updateTask(req.body.task).then(data => res.json(data));
});

routes.delete('/:id', (req, res) => {
    taskController.deleteTask(req.params.id).then(data => res.json(data));
});

export default routes;
