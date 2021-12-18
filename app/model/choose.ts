import { Model, INTEGER, DATE, STRING } from 'sequelize'
import { Application } from 'egg'

class Choose extends Model {
  id: number
  courseId: number
  courseName: string
  capacity: number
  number: number
  day: number
  time: number
  readonly createdAt: Date
  readonly updateAt: Date

  static associate: ()=>any
}

export default ( app: Application ) => {
  Choose.init({
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    courseId: INTEGER,
    courseName: STRING,
    capacity: INTEGER,
    number: INTEGER,
    day: INTEGER,
    time: INTEGER,
    createdAt: DATE,
    updatedAt: DATE
  }, {
    sequelize: app.model,
    modelName: 'chooses',
    underscored: true
  })

  return Choose
}