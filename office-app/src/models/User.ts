import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'users' } })
export class User {
  @prop({required: true})
  name!: string;

  @prop({required: true})
  password!: string;

  @prop({enum: ['USER', 'ADMIN', 'SUPER_ADMIN'], required: true})
  role!: string;

  constructor(name: string, password: string, role: string) {
    this.name = name;
    this.password = this.password;
    this.role = role;
  }
}

export const UserModel = getModelForClass(User);