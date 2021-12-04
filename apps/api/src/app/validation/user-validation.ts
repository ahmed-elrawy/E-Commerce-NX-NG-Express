import * as Joi from 'joi'
const UserSchemaValidation = Joi.object({
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required().email(),
  gender: Joi.string().required(),
  age:Joi.string().required(),
  phone:Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
 

  
}
)

export default UserSchemaValidation