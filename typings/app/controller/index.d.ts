// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCourse from '../../../app/controller/course';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    course: ExportCourse;
    home: ExportHome;
    user: ExportUser;
  }
}
