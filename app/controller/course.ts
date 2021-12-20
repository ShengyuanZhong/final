import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async addcourse() {//添加课程
    const { ctx } = this;
    const { Course } = ctx.model
    const { Choose } = ctx.model
    const { name } = ctx.request.body
    const { capacity } = ctx.request.body
    const { day } = ctx.request.body
    const { time } = ctx.request.body
    ctx.validate({
      name: 'string',
      capacity: 'number',
      day:'number',
      time:'number'
    })
    if (day<1||day>7||time<1||time>5){ 
      ctx.body = {
        success:false,
        error: '不在允许的时间段内'
      }
      
    } else {

      Course.create( {name: name, capacity: capacity, day: day, time: time, number: 0 } )
      Choose.create( {courseName: name, capacity: capacity, day: day, time: time, number: 0 } )
      ctx.body = { 
        success: true,
    }
  }
  }

  public async getCourseInfo() {//查看所有课程
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

  public async changeInfo() {//修改课程信息
    const { ctx } = this
    ctx.validate({
      id:'number',
      name: 'string',
      number:'number',
      capacity: 'number',
      day:'number',
      time:'number'
    })
    const { id, name, number, capacity, day, time } = ctx.request.body
    let a = await ctx.model.Course.findByPk(id)
    if(a){
      if ( number > capacity ){
        ctx.body = {
          success:false,
          error: '人数不能大于课程容量'
        }
      } else {
        if(day<1||day>7||time<1||time>5){
          ctx.body = {
            success:false,
            error: '不在允许的时间段内'
          }
        } else {
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
      await ctx.model.Select.update({
        day : day,
        time : time
    },{
        where:{
            courseId : id
        }
    })
      console.log(up)
      ctx.body = {
        success: true
      }  
        }
      }
    } else {
      ctx.body = {
        success: false,
        error:'课程不存在'
      }
    }

  }

  public async deleteCourse(){//删除课程
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

  public async selectCourse(){//选课
    const {ctx}=this
    const {courseId}=ctx.request.body
    const jikann = await ctx.model.Course.findAll({
      where:{
        id : courseId
      },
      attributes:['day','time']
    })
    const day = jikann[0].day
    const time = jikann[0].time
    let final = await ctx.model.Select.findOne({
      where:{
        day:day,
        time:time
      }
    })
    if (final){
      ctx.body = {
        success:false,
        error:'此时间段已有课程'
      }
    } else {
      ctx.model.Select.create({courseId:courseId,userId:ctx.session.id,day:day,time:time})
      ctx.body = {
        success:true
      }
    }
    }

  public async DeleteCourse(){//退课
    const {ctx}=this
    const { id } = ctx.params
    let course = await ctx.model.Select.findOne({
      where: {
        courseId:id,
        userId:ctx.session.id
      }
    })
  if ( course ) {
    ctx.model.Select.destroy({
      where:{
          courseId:id
      }
  })
    ctx.model.Course.decrement('number',{where:{id:id}})
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
    
  public async getcourseinfo(){//查看某个课程被选情况
    const { ctx } = this
    const { page, limit, courseId } = ctx.query
    let page2 = parseInt(page)
    let limit2 = parseInt(limit)
    let courseId2 = parseInt(courseId)
    const data = await ctx.model.Select.findAndCountAll({
      limit: limit2,
      offset: limit2 * (page2-1),
      attributes:['userId'],
      where: {
        courseId:courseId2
      },
      include:[{
        model:ctx.model.User,
        as:'user',
        attributes:['number','name']
      }]
    })
    ctx.body = {
      success:true,
      data
    }

  }

}
