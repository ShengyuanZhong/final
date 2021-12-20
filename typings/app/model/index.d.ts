// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCourse from '../../../app/model/course';
import ExportSelect from '../../../app/model/select';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Course: ReturnType<typeof ExportCourse>;
    Select: ReturnType<typeof ExportSelect>;
    User: ReturnType<typeof ExportUser>;
  }
}
