import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Token} from "../../commons/models/token.model";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt: Token | null = this.authService.getTokenJWT();

        if (jwt === null) {
            return next.handle(req);
        }

        const cloned = req.clone({
            headers: req.headers.set("Authorization",
                "Bearer " + jwt.token)
        });

        return next.handle(cloned);
    }
}