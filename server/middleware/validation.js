import Joi from 'joi'

// Painting validation schemas
const paintingSchema = Joi.object({
  title: Joi.string().trim().max(200).required()
    .messages({
      'string.empty': 'Title is required',
      'string.max': 'Title must be less than 200 characters'
    }),
  
  artist: Joi.string().trim().max(100).required()
    .messages({
      'string.empty': 'Artist name is required',
      'string.max': 'Artist name must be less than 100 characters'
    }),
  
  year: Joi.string().trim().required()
    .messages({
      'string.empty': 'Year is required'
    }),
  
  category: Joi.string().valid('Landscape', 'Portrait', 'Still Life', 'Abstract', 'Other').required()
    .messages({
      'any.only': 'Category must be one of: Landscape, Portrait, Still Life, Abstract, Other',
      'any.required': 'Category is required'
    }),
  
  image: Joi.string().uri().required()
    .messages({
      'string.uri': 'Image must be a valid URL',
      'any.required': 'Image URL is required'
    }),
  
  description: Joi.string().trim().max(1000).required()
    .messages({
      'string.empty': 'Description is required',
      'string.max': 'Description must be less than 1000 characters'
    }),
  
  dimensions: Joi.object({
    height: Joi.number().min(0),
    width: Joi.number().min(0),
    depth: Joi.number().min(0),
    unit: Joi.string().valid('cm', 'inch').default('cm')
  }).optional(),
  
  medium: Joi.string().trim().max(50).default('Oil on canvas'),
  
  withFrame: Joi.boolean().default(false),
  
  featured: Joi.boolean().default(false),
  
  tags: Joi.array().items(Joi.string().trim().max(50)).optional(),
  
  createdBy: Joi.string().trim().max(50).default('admin')
})

const paintingUpdateSchema = paintingSchema.fork(
  ['title', 'artist', 'year', 'category', 'image', 'description'], 
  (schema) => schema.optional()
)

// Contact validation schema
const contactSchema = Joi.object({
  name: Joi.string().trim().max(100).required()
    .messages({
      'string.empty': 'Name is required',
      'string.max': 'Name must be less than 100 characters'
    }),
  
  email: Joi.string().email().trim().lowercase().required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required'
    }),
  
  subject: Joi.string().trim().max(200).required()
    .messages({
      'string.empty': 'Subject is required',
      'string.max': 'Subject must be less than 200 characters'
    }),
  
  message: Joi.string().trim().max(2000).required()
    .messages({
      'string.empty': 'Message is required',
      'string.max': 'Message must be less than 2000 characters'
    })
})

// Validation middleware functions
export const validatePainting = (req, res, next) => {
  const { error, value } = paintingSchema.validate(req.body, { 
    abortEarly: false,
    stripUnknown: true
  })
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    })
  }
  
  req.body = value
  next()
}

export const validatePaintingUpdate = (req, res, next) => {
  const { error, value } = paintingUpdateSchema.validate(req.body, { 
    abortEarly: false,
    stripUnknown: true
  })
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    })
  }
  
  req.body = value
  next()
}

export const validateContact = (req, res, next) => {
  const { error, value } = contactSchema.validate(req.body, { 
    abortEarly: false,
    stripUnknown: true
  })
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    })
  }
  
  req.body = value
  next()
}
