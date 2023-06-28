import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO } from './create_user.dto';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}    //user의 모든 정보가 포함되어 있을 필요는 없다
