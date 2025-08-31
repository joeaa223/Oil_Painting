import mongoose from 'mongoose'

const paintingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  artist: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  year: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Landscape', 'Portrait', 'Still Life', 'Abstract', 'Other'],
    default: 'Other'
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  dimensions: {
    height: {
      type: Number,
      min: 0
    },
    width: {
      type: Number,
      min: 0
    },
    depth: {
      type: Number,
      min: 0
    },
    unit: {
      type: String,
      enum: ['cm', 'inch'],
      default: 'cm'
    }
  },
  medium: {
    type: String,
    default: 'Oil on canvas'
  },
  withFrame: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdBy: {
    type: String,
    default: 'admin'
  }
}, {
  timestamps: true
})

// Indexes for better query performance
paintingSchema.index({ category: 1, isActive: 1 })
paintingSchema.index({ featured: 1, isActive: 1 })
paintingSchema.index({ artist: 1 })
paintingSchema.index({ createdAt: -1 })

// Virtual for full image URL (if needed)
paintingSchema.virtual('imageUrl').get(function() {
  return this.image.startsWith('http') ? this.image : `${process.env.BASE_URL || ''}/images/${this.image}`
})

// Transform JSON output
paintingSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v
    return ret
  }
})

export default mongoose.model('Painting', paintingSchema)
