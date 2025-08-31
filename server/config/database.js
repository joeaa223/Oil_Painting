import mongoose from 'mongoose'

// MongoDB连接配置
const connectDB = async () => {
  try {
    // 使用你提供的MongoDB Atlas连接字符串
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://jiongzhengwu_db_user:Gjz53234@cluster0.k27mifi.mongodb.net/oilpainting?retryWrites=true&w=majority&appName=Cluster0'
    
    // 连接选项
    const options = {
      maxPoolSize: 10, // 维护最多10个socket连接
      serverSelectionTimeoutMS: 5000, // 5秒后超时
      socketTimeoutMS: 45000, // 45秒后关闭socket
      bufferCommands: false, // 禁用mongoose缓冲
    }

    await mongoose.connect(mongoUri, options)
    
    console.log('✅ MongoDB connected successfully')
    console.log('📊 Connected to database:', mongoose.connection.name)
    console.log('🌐 Host:', mongoose.connection.host)
    console.log('🔌 Port:', mongoose.connection.port)
    
    // 监听连接事件
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err)
    })
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected')
    })
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected')
    })
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    process.exit(1)
  }
}

// 优雅关闭数据库连接
const closeDB = async () => {
  try {
    await mongoose.connection.close()
    console.log('🔒 MongoDB connection closed')
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error.message)
  }
}

export { connectDB, closeDB }
