import { Context } from "egg";

export default async function (ctx:Context, next: ()=> Promise<any>) {
  const { User } = ctx.model
  let ad = await User.findOne({
    where:{
      id: ctx.session.id,
      admin: 1
    }
  })
  if( ad ) {
    await next()
  } else {
    ctx.body = {
      success: false,
      error: '你不是管理员 你是谁 谁指使你来的 你的目的是什么'
    }
  }
}