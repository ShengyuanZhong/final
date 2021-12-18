import { Context } from "egg";

export default async function (ctx:Context, next: ()=> Promise<any>) {
  const { Course } = ctx.model
  const { courseId } = ctx.request.body
  let cs = await Course.findOne({
    where:{
      id:courseId
    }
  })
  if( cs ) {
    await next()
  } else {
    ctx.body = {
      success: false,
      error: '课程不存在'
    }
  }
}