
import * as bcrypt from 'bcrypt';
import config from '../../config/config';
import UserModel from './user.model';
import { CreateUserRequestModel } from '../../models/users/createUserRequestModel';
import { UserResponseModel } from '../../models/users/userResponseModel';
import { RolesResponseModel } from '../../models/roles/rolesResponseModel';

const { v4: uuidv4 } = require('uuid');

export default class UserService {
    createUser = async (createUserData: CreateUserRequestModel): Promise<UserResponseModel> => {
        const salt: number = await bcrypt.genSalt(Number(config.SALT_ROUNDS));
        const hash: string = await bcrypt.hash(createUserData.password, salt);
        const user = {
            id: uuidv4(),
            name: createUserData.name,
            surname: createUserData.surname,
            email: createUserData.email,
            password: hash
        };
        const newUser: UserResponseModel = await UserModel.User.create(user);
        await UserModel.Role.create({
            isAdmin: false,
            userId: newUser.id
        })
        return newUser;
    };

    getUserRole = async (id: string): Promise<RolesResponseModel> => {
        const user = await UserModel.User.findByPk(id);
        const role: RolesResponseModel = await user.getRoles();
        return role;
    }
    
    getByEmail = async (userEmail: string): Promise<UserResponseModel> => {
        const queryUser: UserResponseModel = await UserModel.User.findOne({ where: { email: userEmail } });
        if (queryUser) return queryUser;
    };

}