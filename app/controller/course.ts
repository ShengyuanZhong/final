import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async addcourse() {//添加课程
    const { ctx } = this;
    const { Course } = ctx.model
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
      let check = await ctx.model.Course.findOne({
        where:{
          name:name,
          day:day,
          time:time,
          capacity:capacity
        }
      })
      if(check){
        ctx.body = {
          success:false,
          error:'这节课已经存在'
        }
      } else {
        Course.create( {name: name, capacity: capacity, day: day, time: time, number: 0 } )
        ctx.body = { 
          success: true,
      }
      }
  }
  }

  public async getCourseInfo() {//查看所有课程
    const { ctx } = this
    const { page, limit } = ctx.query
    let page2 = parseInt(page)
    let limit2 = parseInt(limit)
    const data = await ctx.model.Course.findAndCountAll({
      limit: limit2,
      offset: limit2 * (page2-1),
      attributes:['id','name','capacity','number','day','time']
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
      name: 'string?',
      number:'number?',
      capacity: 'number?',
      day:'number?',
      time:'number?'
    })
    const { id, name, number, capacity, day, time } = ctx.request.body
    const numcap = await ctx.model.Course.findAll({
      attributes:['number','capacity'],
      where:{
        id:id
      }
    })
    let a = await ctx.model.Course.findByPk(id)
    if(a){
     if(capacity){
      if(number){
        if(capacity>=number){
          if(name){ctx.model.Course.update({name : name},{where:{id : id}})}
          if(day){ctx.model.Course.update({day:day},{where:{id : id}})}
          if(time){ctx.model.Course.update({time:time},{where:{id : id}})}
          ctx.model.Course.update({capacity:capacity},{where:{id : id}})
          ctx.model.Course.update({number:number},{where:{id : id}})
          ctx.body = {
            success:true
          }
        }else{
          ctx.body = {
            success:1,
            error:'人数不能超过课程容量'
          }
        }
      }else{
        if(capacity>=numcap[0].number){
          if(name){ctx.model.Course.update({name : name},{where:{id : id}})}
          if(day){ctx.model.Course.update({day:day},{where:{id : id}})}
          if(time){ctx.model.Course.update({time:time},{where:{id : id}})}
          ctx.model.Course.update({capacity:capacity},{where:{id : id}})
          ctx.body = {
            success:true
          }
        }else{
          ctx.body = {
            success:2,
            error:'人数不能超过课程容量'
          }
        }
      }
     }else{
       if(number){
         if(number>numcap[0].capacity){
          ctx.body = {
            success:3,
            error:'人数不能超过课程容量'
          }
         }else{
          if(name){ctx.model.Course.update({name : name},{where:{id : id}})}
          if(day){ctx.model.Course.update({day:day},{where:{id : id}})}
          if(time){ctx.model.Course.update({time:time},{where:{id : id}})}
          ctx.model.Course.update({number:number},{where:{id : id}})
          ctx.body = {
            success:true
          }
         }
       }else{
        if(name){ctx.model.Course.update({name : name},{where:{id : id}})}
        if(day){ctx.model.Course.update({day:day},{where:{id : id}})}
        if(time){ctx.model.Course.update({time:time},{where:{id : id}})}
        ctx.body = {
          success:true
        }
       }
     }
  } else {
    ctx.body = {
      success: 4,
      error:'课程不存在'
    }
  }
}


  public async deleteCourse(){//删除课程
    const { ctx } = this
    const { id } = ctx.params
    let check1 = await ctx.model.Course.findOne({
      where:{
          id:id
      }
  })
  if ( check1 ) {
    let check2 = await ctx.model.Select.findOne({
      where:{
        courseId:id
      }
    })
    if(check2){
      ctx.body = {
        success:false,
        error:'已经有人选择此门课程，不可删除'
      }
    } else {
      ctx.model.Course.destroy({
        where:{
          id:id
        }
      })
      ctx.body = {
        success:true
      }
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
    ctx.validate({
      courseId:'number'
    })
    const check = await ctx.model.Course.findOne({
      where:{
        id:courseId
      }
    })
    if(check){
      if ( courseId > 0 ){
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
          ctx.model.Course.increment('number',{where:{id:courseId}})
          ctx.model.Select.create({courseId:courseId,userId:ctx.session.id,day:day,time:time})
          ctx.body = {
            success:true
          }
        }
      } else {
        ctx.body = {
          success:false,
          error:'输入的信息有误'
        }
    }
    }else{
      ctx.body = {
        success:false,
        error:'课程不存在'
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
    if(page2>0&&limit2>0&&courseId2>0){
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
    } else {
      ctx.body = {
        success:false,
        error:'输入的信息有误'
      }
    }
   

  }

}
