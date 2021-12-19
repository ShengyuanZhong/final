import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const online = app.middleware.online
  const admin = app.middleware.admin
  const login = app.middleware.login
  router.get('/', controller.home.index);
  router.post('/api/register', login,controller.user.register)
  router.post('/api/login', login,controller.user.login)
  router.delete('/api/logout', controller.user.logout)
  router.post('/api/admin/addcourse', online, admin,controller.course.addcourse)
  router.get('/api/course', online, admin, controller.course.getCourseInfo)
  router.put('/api/admin/changeinfo', online, admin, controller.course.changeInfo)
  router.get('/api/admin/userlist', online, admin, controller.user.userList)
  router.delete('/api/admin/delete/course/:id', online, admin, controller.course.deleteCourse)
  router.post('/api/course/select', online,controller.course.selectCourse)
  router.delete('/api/course/delete/:id', online, controller.course.DeleteCourse)
  router.get('/api/admin/schdule/course', online, admin, controller.course.getcourseinfo)
  router.get('/api/admin/shcedule/user', online, admin, controller.user.getuserinfo)
  router.get('/api/schedule', online, controller.user.getowninfo)
};
