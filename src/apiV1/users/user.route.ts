import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import verifyAdmin from '../../helpers/verifyAdmin';
import Controller from './user.controller';
import UserService from './user.service';

const userService = new UserService;
const user: Router = Router();
const controller = new Controller(userService);

// user.get('/', verifyToken, verifyAdmin, controller.findMany);

// user.get('/getOne', verifyToken, controller.findOne);

user.post('/', controller.create);

user.get('/:id', controller.getUserRole);

// user.post('/login', controller.logIn);

// user.patch('/', verifyToken, controller.update);

// user.patch('/role', verifyToken, verifyAdmin, controller.updateUsersRole);

// user.delete('/', verifyToken, controller.remove);

export default user;