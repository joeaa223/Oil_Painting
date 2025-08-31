import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? '/api' // In production, use relative path since Vercel handles routing
    : 'http://localhost:3001/api', // In development, use full URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      
      switch (status) {
        case 400:
          console.error('Bad Request:', data.message)
          break
        case 401:
          console.error('Unauthorized:', data.message)
          // Handle authentication errors
          break
        case 403:
          console.error('Forbidden:', data.message)
          break
        case 404:
          console.error('Not Found:', data.message)
          break
        case 429:
          console.error('Too Many Requests:', data.message)
          break
        case 500:
          console.error('Server Error:', data.message)
          break
        default:
          console.error('API Error:', data.message || 'Unknown error')
      }
    } else if (error.request) {
      // Network error
      console.error('Network Error: Unable to connect to server')
    } else {
      // Other error
      console.error('Error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

// API methods
export const paintingsAPI = {
  // Get all paintings with optional filters
  getAll: (params = {}) => api.get('/paintings', { params }),
  
  // Get single painting by ID
  getById: (id) => api.get(`/paintings/${id}`),
  
  // Get featured paintings
  getFeatured: () => api.get('/paintings', { params: { featured: true, limit: 6 } }),
  
  // Get paintings by category
  getByCategory: (category) => api.get('/paintings', { params: { category } }),
  
  // Search paintings
  search: (query) => api.get('/paintings', { params: { search: query } }),
  
  // Get categories
  getCategories: () => api.get('/paintings/categories/list'),
  
  // Admin methods
  create: (data) => api.post('/paintings', data),
  update: (id, data) => api.put(`/paintings/${id}`, data),
  delete: (id) => api.delete(`/paintings/${id}`),
  
  // Upload painting with image
  upload: (formData) => {
    const uploadApi = axios.create({
      baseURL: import.meta.env.PROD 
        ? '/api' 
        : 'http://localhost:3001/api',
      timeout: 30000, // Longer timeout for file uploads
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return uploadApi.post('/paintings/upload', formData)
  }
}

export const contactAPI = {
  // Submit contact form
  submit: (data) => api.post('/contact', data),
  
  // Admin methods (for future use)
  getAll: (params = {}) => api.get('/contact', { params }),
  getById: (id) => api.get(`/contact/${id}`),
  updateStatus: (id, status) => api.put(`/contact/${id}/status`, { status })
}

export default api
