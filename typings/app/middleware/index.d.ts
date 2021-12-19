// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/middleware/admin';
import ExportCheck from '../../../app/middleware/check';
import ExportLogin from '../../../app/middleware/login';
import ExportOnline from '../../../app/middleware/online';

declare module 'egg' {
  interface IMiddleware {
    admin: typeof ExportAdmin;
    check: typeof ExportCheck;
    login: typeof ExportLogin;
    online: typeof ExportOnline;
  }
}
