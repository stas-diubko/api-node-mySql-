import { RolesResponseModel } from '../../models/roles/rolesResponseModel';
import UserModel from '../users/user.model';
import { RolesRequestUpdateData } from '../../models/roles/rolesRequestUpdateData';

export default class RolesService {
    getByUserId = async (id: string): Promise<RolesResponseModel> => {
        const queryRole = await UserModel.Role.findOne({userId: id});
        if (queryRole) return queryRole;
    }

    update = async (roleData: RolesRequestUpdateData): Promise<void> => {
        await UserModel.Role.updateOne({ userId: roleData.userId }, roleData );
    }
}