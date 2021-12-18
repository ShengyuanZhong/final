import { Context } from "egg";

export default async function (ctx:Context, next: ()=> Promise<any>) {
  if( ctx.session.id ) {
    await next()
  } else {
    ctx.body = {
      success: false,
      error: '未登录'
    }
  }
}