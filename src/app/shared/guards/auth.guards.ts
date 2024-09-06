
import { inject } from "@angular/core";
import {  CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../components/Auth/auth.service";

const routerInjection = () => inject(Router);

const authService = () => inject(AuthService);



export const privateGuard: CanActivateFn = async () => {
  const router = routerInjection();

  const {data} =await authService().session();

  // if (data.session) {
  //   router.navigate(['/layout']);
  // }

  if (!data.session) {
    router.navigate(['/auth-login']);
  }

  return !!data.session;


  };

  export const publicGuard: CanActivateFn = async () => {
    const router = routerInjection();

    const {data} =await authService().session();

    if (data.session) {
      router.navigate(['/']);
    }

    return !data.session;

  }




























// import { inject } from "@angular/core";
// import { CanActivateFn, Router } from "@angular/router";
// import { AuthService } from "../../components/Auth/auth.service";

// const routerInjection = () => inject(Router);
// const authService = () => inject(AuthService);

// export const privateGuard: CanActivateFn = async () => {
//   const router = routerInjection();
//   const { data } = await authService().session();

//   if (data.session) {

//     return true;
//   } else {

//     await router.navigate(['/admin']);
//     return false;
//   }
// };

// export const publicGuard: CanActivateFn = async () => {
//   const router = routerInjection();
//   const { data } = await authService().session();

//   if (data.session) {

//     await router.navigate(['/layout']);
//     return false;
//   }


//   return true;
// };
