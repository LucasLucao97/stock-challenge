import { ExistingUserDTO } from './../user/dtos/existing-user.dto';
import { UserDetails } from './../user/user-details.interface';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    hashPassword(password: string): Promise<string>;
    register(user: Readonly<NewUserDTO>): Promise<UserDetails | any>;
    doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
    validateUser(email: string, password: string): Promise<UserDetails | null>;
    login(existingUser: ExistingUserDTO): Promise<{
        token: string;
    } | null>;
    verifyJwt(jwt: string): Promise<{
        exp: number;
    }>;
}
