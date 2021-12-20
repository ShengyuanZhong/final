import { Model, INTEGER, DATE } from 'sequelize'
import { Application } from 'egg'

class Select extends Model {
  id: number
  userId: number
  courseId: number
  day:number
  time:number
  readonly createdAt: Date
  readonly updateAt: Date

  static associate: ()=>any
}

export default ( app: Application ) => {
  Select.init({
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userId: INTEGER,
    courseId: INTEGER,
    day: INTEGER,
    time: INTEGER,
    created_at: DATE,
    updated_at: DATE
  }, {
    sequelize: app.model,
    modelName: 'selects',
    underscored: true
  })

  Select.associate = () => {
    app.model.Select.belongsTo( app.model.Course, { foreignKey: 'courseId', as: 'course' })
    app.model.Select.belongsTo( app.model.User, { foreignKey: 'userId', as: 'user' } )
  }
  return Select
}