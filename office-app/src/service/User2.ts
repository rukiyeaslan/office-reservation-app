import UserModel, { User } from "../models/User2";

export function createUser(input: Partial<User>){
    return UserModel.create(input)
}