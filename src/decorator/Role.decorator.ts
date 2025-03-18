import { SetMetadata } from "@nestjs/common"
import { Role } from "src/authorizatsiya/schema/authorizatsiya.schema";

export const Roles = (...role: Role[])=> SetMetadata("role",role);