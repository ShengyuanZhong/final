import { Model, INTEGER, STRING, DATE } from 'sequelize'
import { Application } from 'egg'

class User extends Model {
  id: number
  number: string
  name: string
  password: number
  admin: number
  readonly createdAt: Date
  readonly updateAt: Date

  static associate: ()=>any
}

export default ( app: Application ) => {
  User.init({
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    number: STRING,
    name: STRING,
    password: STRING,
    admin: INTEGER,
    createdAt: DATE,
    updatedAt: DATE
  }, {
    sequelize: app.model,
    modelName: 'users',
    underscored: true
  })
  User.associate = ()=>{
    app.model.User.hasMany( app.model.Select, { foreignKey: 'userId', as:'select' } )
  }
  return User
}