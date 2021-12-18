import { Model, INTEGER, STRING, DATE } from 'sequelize'
import { Application } from 'egg'

class Course extends Model {
  id: number
  name: string
  capacity: number
  day: number
  time: number
  number: number 
  readonly createdAt: Date
  readonly updateAt: Date

  static associate: ()=>any
}

export default ( app: Application ) => {
  Course.init({
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    capacity: INTEGER,
    day: INTEGER,
    time: INTEGER,
    number: INTEGER,
    createdAt: DATE,
    updatedAt: DATE
  }, {
    sequelize: app.model,
    modelName: 'courses',
    underscored: true
  })

  Course.associate = () => {
    app.model.Course.hasMany( app.model.Select, { foreignKey: 'courseId', as: 'select' } )
  }
  return Course
}
