import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async register() {//注册
    const { ctx } = this;
    ctx.validate({
      number: 'string',
      name: 'string',
      password: 'string'
    })    
    const { User } = ctx.model
    const { number } = ctx.request.body
    const { name } = ctx.request.body
    const { password } = ctx.request.body

    let Number = await User.findOne({
      where:{
        number:number
      }
    })
    if(Number){
      ctx.body = {
        success: false,
        error: '用户已存在'}
    } else {
      ctx.session.number = number
      let user = await User.create( {number: number, name: name, password: password, admin: 0} )
      ctx.body = { 
        success: true,
        data: {
          userId: user.id,
          number: user.number,
          name: user.name
        }
      }
      ctx.session.id = user.id
    }
  }

  public async login() {//登录
    const { ctx } = this
    ctx.validate({
      number: {type:'string'},
      password: {type:'string'}
    })
    const { number, password } = ctx.request.body
    const { User } = ctx.model
    let user = await User.findOne({
      where:{
        number:number,
        password:password
      }
    })
    if ( user ) {
      ctx.session.id = user.id
      ctx.body = {
        success:true
      }
    } else {
      ctx.body = {
        success: false,
        error: '用户不存在'
      }
    }
  }

  public async logout() {//退出登录
    let user = this.ctx.session.id
    if ( user ){
      this.ctx.session = null
      this.ctx.body = {
        success: true,
        data: {
          "login":true
        }
      }
    } else {
      this.ctx.body = {
        success: true,
        data: {
          "login": false
        }
      }
    }

  }

  public async userList() {//查看用户列表
    const { ctx } = this
    const { User } = ctx.model
    const { page, limit } = ctx.query
    let page2 = parseInt(page)
    let limit2 = parseInt(limit)
    const data = await User.findAndCountAll({
      limit: limit2,
      offset: limit2 * (page2-1),
      attributes:['id','number','name']
    })
    ctx.body = {
      success:true,
      data
    }
  }

  public async getuserinfo(){//差某个人的课表
    const { ctx } = this
    const { userId, page, limit } = ctx.query
    let page2 = parseInt(page)
    let limit2 = parseInt(limit)
    let userId2 = parseInt(userId)
    const data = await ctx.model.Select.findAll({
      limit: limit2,
      offset: limit2 * (page2-1),
      attributes:['id','userId','courseId'],
      where: {
        userId: userId2
      },
      include:[{
        model:ctx.model.Course,
        as:'course',
        attributes:['name','capacity','number']
      }]
    })
    ctx.body = {
      success:true,
      data
    }


    
  }


  public async getowninfo(){//查自己的课表
    const { ctx } = this
    const { page, limit } = ctx.query
    let page2 = parseInt(page)
    let limit2 = parseInt(limit)
    let id2 = ctx.session.id
    const data = await ctx.model.Select.findAndCountAll({
      limit: limit2,
      offset: limit2 * (page2-1),
      attributes:['courseId'],
      where: {
        userId: id2
      },
      include:[{
        model:ctx.model.Course,
        as:'course',
        attributes:['id','name','capacity','number','day','time']
      }]
    })
    ctx.body = {
      success:true,
      data
    }
  }
}
