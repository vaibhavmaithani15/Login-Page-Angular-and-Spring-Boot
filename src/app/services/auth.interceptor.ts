import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {LoginService} from "./login.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq = req;
    let token = this.loginService.getToken();
    if (token != null)
      token = token.trim();

    console.warn("INTERCEPTOR", token);
    if (token != null) {
      console.warn("TOKEN IS NOT NULL");
      // newReq=newReq.clone({headers:{Authorization: `Bearer ${token}`}});
      newReq = newReq.clone({
        setHeaders: {Authorization: `${token}`},
      });
      // newReq = newReq.clone({
      //   headers: new HttpHeaders({
      //     Authorization: 'Bearer ' + token,
      //   }),
      // });


    }
    console.warn("NEW REQUEST", newReq);
    return next.handle(newReq);
  }

}
