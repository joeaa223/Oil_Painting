import express from 'express'
import Contact from '../models/Contact.js'
import { validateContact } from '../middleware/validation.js'
import rateLimit from 'express-rate-limit'

const router = express.Router()

// Rate limiting for contact form (more restrictive)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact form submissions per 15 minutes
  message: {
    success: false,
    message: 'Too many contact form submissions from this IP, please try again later.'
  }
})

// POST /api/contact - Submit contact form
router.post('/', contactLimiter, validateContact, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    
    // Create new contact entry
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    })
    
    await contact.save()
    
    // In production, you might want to send an email notification here
    console.log('📧 New contact form submission:', {
      name,
      email,
      subject,
      timestamp: new Date().toISOString()
    })
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: contact._id,
        submittedAt: contact.createdAt
      }
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
})

// GET /api/contact - Get all contact messages (admin only in production)
router.get('/', async (req, res) => {
  try {
    const { 
      status, 
      page = 1, 
      limit = 20, 
      sort = '-createdAt' 
    } = req.query

    // Build filter object
    const filter = {}
    
    if (status) {
      filter.status = status
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    // Get contacts with pagination
    const contacts = await Contact.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-ipAddress -userAgent') // Don't expose sensitive info
      .lean()

    // Get total count for pagination
    const total = await Contact.countDocuments(filter)
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages',
      error: error.message
    })
  }
})

// GET /api/contact/:id - Get single contact message
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .select('-ipAddress -userAgent')
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      })
    }

    res.json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('Error fetching contact:', error)
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID'
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error fetching contact message',
      error: error.message
    })
  }
})

// PUT /api/contact/:id/status - Update contact status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    
    if (!['new', 'read', 'replied', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: new, read, replied, closed'
      })
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-ipAddress -userAgent')
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      })
    }

    res.json({
      success: true,
      data: contact,
      message: 'Contact status updated successfully'
    })
  } catch (error) {
    console.error('Error updating contact status:', error)
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID'
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating contact status',
      error: error.message
    })
  }
})

export default router

