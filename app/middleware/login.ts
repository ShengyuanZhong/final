import { Context } from "egg";

export default async function (ctx:Context, next: ()=> Promise<any>) {
  if( ctx.session.id ) {
    ctx.body = {
      success: false,
      error: '已登录'
  }
  } else {
      await next()
  }
}