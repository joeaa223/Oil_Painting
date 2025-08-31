import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import Painting from '../models/Painting.js'
import { validatePainting, validatePaintingUpdate } from '../middleware/validation.js'

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/paintings'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

const router = express.Router()

// GET /api/paintings - Get all paintings with optional filtering
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      featured, 
      artist, 
      page = 1, 
      limit = 20, 
      sort = '-createdAt',
      search 
    } = req.query

    // Build filter object
    const filter = { isActive: true }
    
    if (category && category !== '全部') {
      filter.category = category
    }
    
    if (featured === 'true') {
      filter.featured = true
    }
    
    if (artist) {
      filter.artist = new RegExp(artist, 'i')
    }
    
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { artist: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ]
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    // Get paintings with pagination
    const paintings = await Painting.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean()

    // Get total count for pagination
    const total = await Painting.countDocuments(filter)
    
    res.json({
      success: true,
      data: paintings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    console.error('Error fetching paintings:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching paintings',
      error: error.message
    })
  }
})

// GET /api/paintings/:id - Get single painting
router.get('/:id', async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id)
    
    if (!painting || !painting.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Painting not found'
      })
    }

    res.json({
      success: true,
      data: painting
    })
  } catch (error) {
    console.error('Error fetching painting:', error)
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid painting ID'
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error fetching painting',
      error: error.message
    })
  }
})

// POST /api/paintings/upload - Upload new painting with image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      })
    }

    const {
      title,
      artist,
      year,
      category,
      description,
      height,
      width,
      depth,
      unit = 'cm',
      medium = 'Oil on canvas',
      withFrame = false,
      featured = false,
      tags
    } = req.body

    // Validate required fields
    if (!title || !artist || !year || !category || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, artist, year, category, and description are required'
      })
    }

    // Parse tags if provided
    let parsedTags = []
    if (tags) {
      parsedTags = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags
    }

    const paintingData = {
      title,
      artist,
      year,
      category,
      description,
      image: `/uploads/paintings/${req.file.filename}`,
      dimensions: {
        height: parseFloat(height) || 0,
        width: parseFloat(width) || 0,
        depth: parseFloat(depth) || 0,
        unit
      },
      medium,
      withFrame: withFrame === 'true' || withFrame === true,
      featured: featured === 'true' || featured === true,
      tags: parsedTags,
      createdBy: 'admin'
    }

    const painting = new Painting(paintingData)
    await painting.save()
    
    res.status(201).json({
      success: true,
      data: painting,
      message: 'Painting uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading painting:', error)
    
    // Clean up uploaded file if there was an error
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path)
      } catch (unlinkError) {
        console.error('Error deleting uploaded file:', unlinkError)
      }
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error uploading painting',
      error: error.message
    })
  }
})

// POST /api/paintings - Create new painting (admin only in production)
router.post('/', validatePainting, async (req, res) => {
  try {
    const painting = new Painting(req.body)
    await painting.save()
    
    res.status(201).json({
      success: true,
      data: painting,
      message: 'Painting created successfully'
    })
  } catch (error) {
    console.error('Error creating painting:', error)
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating painting',
      error: error.message
    })
  }
})

// PUT /api/paintings/:id - Update painting
router.put('/:id', validatePaintingUpdate, async (req, res) => {
  try {
    const painting = await Painting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!painting) {
      return res.status(404).json({
        success: false,
        message: 'Painting not found'
      })
    }

    res.json({
      success: true,
      data: painting,
      message: 'Painting updated successfully'
    })
  } catch (error) {
    console.error('Error updating painting:', error)
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      })
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid painting ID'
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating painting',
      error: error.message
    })
  }
})

// DELETE /api/paintings/:id - Soft delete painting
router.delete('/:id', async (req, res) => {
  try {
    const painting = await Painting.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    )
    
    if (!painting) {
      return res.status(404).json({
        success: false,
        message: 'Painting not found'
      })
    }

    res.json({
      success: true,
      message: 'Painting deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting painting:', error)
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid painting ID'
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error deleting painting',
      error: error.message
    })
  }
})

// GET /api/paintings/categories/list - Get all categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Painting.distinct('category', { isActive: true })
    
    res.json({
      success: true,
      data: ['全部', ...categories]
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    })
  }
})

export default router
