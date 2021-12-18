import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async addcourse() {
    const { ctx } = this;
    ctx.validate({
      name: 'string',
      capacity: 'number',
      day: 'number',
      time: 'number'
    })
    const { Course } = ctx.model
    const { Choose } = ctx.model
    const { name } = ctx.request.body
    const { capacity } = ctx.request.body
    const { day } = ctx.request.body
    const { time } = ctx.request.body
      Course.create( {name: name, capacity: capacity, day: day, time: time, number: 0 } )
      Choose.create( {courseName: name, capacity: capacity, day: day, time: time, number: 0 } )
      ctx.body = { 
        success: true,
      }
  }

  public async getCourseInfo() {
    const { ctx } = this
    const { page, limit } = ctx.query
    let page2 = parseInt(page)
    let limit2 = parseInt(limit)
    const data = await ctx.model.Choose.findAll({
      limit: limit2,
      offset: limit2 * (page2-1),
      attributes:['id','course_name','capacity','number','day','time']
    })
    ctx.body = {
      success:true,
      data
    }
  }

  public async changeInfo() {
    const { ctx } = this
    const { id, name, number, capacity, day, time } = ctx.request.body
    let a = await ctx.model.Course.findByPk(id)
    if(a){
      let up = await ctx.model.Course.update({
        name : name,
        number : number,
        capacity : capacity,
        day : day,
        time : time
    },{
        where:{
            id : id
        }
    })
    await ctx.model.Choose.update({
      name : name,
      number : number,
      capacity : capacity,
      day : day,
      time : time
  },{
      where:{
          id : id
      }
  })
  console.log(up)
  ctx.body = {
    success: true
  }
    } else {
      ctx.body = {
        success: false,
        error:'课程不存在'
      }
    }

  }


  public async deleteCourse(){
    const { ctx } = this
    const { id } = ctx.params
    let destory = await ctx.model.Choose.destroy({
      where:{
          id:id
      }
  })
  if ( destory ) {
    ctx.body = {
      success:true
    }
  } else{
    ctx.body = {
      success: false,
      error: '课程不存在'
    }
  }
}


  public async selectCourse(){
    const {ctx}=this
    const {courseId}=ctx.request.body
    const id=ctx.session.id
      ctx.model.Course.increment('number',{where:{id:courseId}})
      ctx.model.Select.create({courseId:courseId,userId:id})

      ctx.body = 1
    }



  public async DeleteCourse(){
    const {ctx}=this
    const { id } = ctx.params
    let destory2 = await ctx.model.Select.destroy({
      where:{
          id:id
      }
  })
  if ( destory2 ) {
    ctx.body = {
      success:true
    }
  } else{
    ctx.body = {
      success: false,
      error: '课程不存在'
    }
  }
  }
    
  public async getcourseinfo(){
    const { ctx } = this
    const { page, limit, courseId } = ctx.query
    let page2 = parseInt(page)
    let limit2 = parseInt(limit)
    let courseId2 = parseInt(courseId)
    const data = await ctx.model.Select.findAndCountAll({
      limit: limit2,
      offset: limit2 * (page2-1),
      attributes:['userid'],
      where: {
        courseid:courseId2
      }
    })
    ctx.body = {
      success:true,
      data
    }

  }

}
