import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import UserService from './user.service';
import RoleService from '../roles/roles.service';
import { UserResponseModel } from '../../models/users/userResponseModel';
import { RolesResponseModel } from '../../models/roles/rolesResponseModel';

export default class UserController {
    
    constructor(
        private userService: UserService,
        private roleService: RoleService
    ){
        
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const queryUser: UserResponseModel = await this.userService.getByEmail(req.body.email);
            if(queryUser) {
                return res.status(409).send('User exists!');
            };
            const newUser: UserResponseModel = await this.userService.createUser(req.body);
            return res.status(200).send(newUser);
        } catch (error) {
            return res.status(500).send(error.toString());
        };
    }

    getUserRole = async (req: Request, res: Response): Promise<Response> => {
        try {
            const role: RolesResponseModel = await this.userService.getUserRole(req.params.id);
            return res.status(200).send(role);
        } catch (error) {
            return res.status(500).send(error.toString());
        };
    }

}