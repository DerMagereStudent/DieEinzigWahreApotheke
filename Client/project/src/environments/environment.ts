// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const serverProtocolAndDomain: string = "https://localhost:44307";

export const environment = {
  production: false,
  authTokenHeaderKey: "Authorization",
  apiRoutes: {
    medicine: {
      findBySearchString: serverProtocolAndDomain + "/api/medicine/search",
    },
    user: {
      login: serverProtocolAndDomain + "/api/user/login",
      signup: serverProtocolAndDomain + "/api/user/signup",
      logout: serverProtocolAndDomain + "/api/user/logout",
      checkAuthenticated: serverProtocolAndDomain + "/api/user/auth"
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.