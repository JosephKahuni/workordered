// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  accountsUrl: ' http://127.0.0.1:8000/accounts',
  nameFormat: String.raw`^[a-zA-Z']+$`,
  payrollFormat: String.raw`^((cas)(\s))?([0-9]{2,5})$`,
  phoneFormat: String.raw`^((01)|(07))([0-9]{8})$`,
  usernameFormat: String.raw`^[a-zA-Z']+$|^((cas)(\s))?([0-9]{2,5})$`

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
