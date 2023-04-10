//to prevent circular dependencies, created a seperate file for exports

import { getModelForClass } from "@typegoose/typegoose";
import {Office} from "./Office";
import { Organization } from "./Organization";

export const OfficeModel = getModelForClass(Office);
export const OrganizationModel = getModelForClass(Organization);
