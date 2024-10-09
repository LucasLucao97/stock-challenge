import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(user: NewUserDTO): Promise<UserDetails | null>;
    login(user: ExistingUserDTO): Promise<{
        token: string;
    } | null>;
    verifyJwt(payload: {
        jwt: string;
    }): Promise<{
        exp: number;
    }>;
}
