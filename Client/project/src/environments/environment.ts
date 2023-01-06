// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const serverProtocolAndDomain: string = "https://localhost:44307";

export const environment = {
  production: false,
  authTokenHeaderKey: "Authorization",
  apiRoutes: {
    cart: {
      index: serverProtocolAndDomain + "/api/cart"
    },
    medicine: {
      findBySearchString: serverProtocolAndDomain + "/api/medicine/search",
      findByPzn: serverProtocolAndDomain + "/api/medicine/search/pzn",
      findByPzns: serverProtocolAndDomain + "/api/medicine/search/pzns",
    },
    user: {
      login: serverProtocolAndDomain + "/api/user/login",
      signup: serverProtocolAndDomain + "/api/user/signup",
      logout: serverProtocolAndDomain + "/api/user/logout",
      checkAuthenticated: serverProtocolAndDomain + "/api/user/auth",
      info: serverProtocolAndDomain + "/api/user/info",
      addresses: serverProtocolAndDomain + "/api/user/addresses",
    },
    order: {
      index: serverProtocolAndDomain + "/api/order",
      approve: serverProtocolAndDomain + "/api/order/approve"
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