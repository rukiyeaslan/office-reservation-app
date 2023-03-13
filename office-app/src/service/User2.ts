import UserModel, { User } from "../models/User2";

export function createUser(input: Partial<User>){
    return UserModel.create(input)
}

export function findUserById(id: string){
    return UserModel.findById(id);
}

export function findByEmail(email: string){
    return UserModel.findOne({email});
}