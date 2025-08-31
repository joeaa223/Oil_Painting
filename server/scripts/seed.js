import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Painting from '../models/Painting.js'

dotenv.config()

const seedData = []

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/oilpainting'
    await mongoose.connect(mongoUri)
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    await Painting.deleteMany({})
    console.log('🗑️  Cleared existing paintings')

    // Insert seed data
    const paintings = await Painting.insertMany(seedData)
    console.log(`🎨 Inserted ${paintings.length} paintings`)

    console.log('🌱 Database seeded successfully!')
    
    // Log some sample data
    console.log('\nSample paintings:')
    paintings.slice(0, 3).forEach(painting => {
      console.log(`- ${painting.title} by ${painting.artist} (${painting.year})`)
    })

  } catch (error) {
    console.error('❌ Error seeding database:', error)
  } finally {
    await mongoose.connection.close()
    console.log('📴 Database connection closed')
  }
}

// Run the seed function
seedDatabase()
