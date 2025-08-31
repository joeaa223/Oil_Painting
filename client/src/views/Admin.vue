<template>
  <div class="py-12">
    <div class="container-custom">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-secondary-800 mb-4 font-serif">Admin Panel</h1>
        <p class="text-xl text-secondary-600 max-w-2xl mx-auto">
          Upload and manage your oil paintings. Add new artworks to your gallery.
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- Upload Form -->
        <div class="card p-8 mb-8">
          <h2 class="text-2xl font-bold text-secondary-800 mb-6">Upload New Painting</h2>
          
          <form @submit.prevent="uploadPainting" enctype="multipart/form-data">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Basic Information -->
              <div class="space-y-6">
                <div>
                  <label for="title" class="block text-sm font-medium text-secondary-700 mb-2">
                    Painting Title *
                  </label>
                  <input 
                    type="text" 
                    id="title" 
                    v-model="form.title"
                    required
                    class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter painting title"
                  >
                </div>

                <div>
                  <label for="artist" class="block text-sm font-medium text-secondary-700 mb-2">
                    Artist Name *
                  </label>
                  <input 
                    type="text" 
                    id="artist" 
                    v-model="form.artist"
                    required
                    class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter artist name"
                  >
                </div>

                <div>
                  <label for="year" class="block text-sm font-medium text-secondary-700 mb-2">
                    Year *
                  </label>
                  <input 
                    type="text" 
                    id="year" 
                    v-model="form.year"
                    required
                    class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="e.g., 2024"
                  >
                </div>

                <div>
                  <label for="category" class="block text-sm font-medium text-secondary-700 mb-2">
                    Category *
                  </label>
                  <select 
                    id="category" 
                    v-model="form.category"
                    required
                    class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select category</option>
                    <option value="Landscape">Landscape</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Still Life">Still Life</option>
                    <option value="Abstract">Abstract</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <!-- Dimensions and Details -->
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-secondary-700 mb-2">
                    Dimensions *
                  </label>
                  <div class="grid grid-cols-3 gap-3">
                    <div>
                      <label for="height" class="block text-xs text-secondary-600 mb-1">Height</label>
                      <input 
                        type="number" 
                        id="height" 
                        v-model="form.height"
                        step="0.1"
                        required
                        class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                        placeholder="45"
                      >
                    </div>
                    <div>
                      <label for="width" class="block text-xs text-secondary-600 mb-1">Width</label>
                      <input 
                        type="number" 
                        id="width" 
                        v-model="form.width"
                        step="0.1"
                        required
                        class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                        placeholder="55"
                      >
                    </div>
                    <div>
                      <label for="depth" class="block text-xs text-secondary-600 mb-1">Depth</label>
                      <input 
                        type="number" 
                        id="depth" 
                        v-model="form.depth"
                        step="0.1"
                        required
                        class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                        placeholder="2.2"
                      >
                    </div>
                  </div>
                  <div class="mt-2">
                    <select 
                      v-model="form.unit"
                      class="px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    >
                      <option value="cm">cm</option>
                      <option value="inch">inch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label for="medium" class="block text-sm font-medium text-secondary-700 mb-2">
                    Medium
                  </label>
                  <input 
                    type="text" 
                    id="medium" 
                    v-model="form.medium"
                    class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Oil on canvas"
                  >
                </div>

                <div class="flex items-center space-x-4">
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      v-model="form.withFrame"
                      class="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                    >
                    <span class="ml-2 text-sm text-secondary-700">With frame</span>
                  </label>
                  
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      v-model="form.featured"
                      class="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                    >
                    <span class="ml-2 text-sm text-secondary-700">Featured</span>
                  </label>
                </div>

                <div>
                  <label for="tags" class="block text-sm font-medium text-secondary-700 mb-2">
                    Tags
                  </label>
                  <input 
                    type="text" 
                    id="tags" 
                    v-model="form.tags"
                    class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter tags separated by commas"
                  >
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="mt-6">
              <label for="description" class="block text-sm font-medium text-secondary-700 mb-2">
                Description *
              </label>
              <textarea 
                id="description" 
                v-model="form.description"
                required
                rows="4"
                class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                placeholder="Describe your painting..."
              ></textarea>
            </div>

            <!-- Image Upload -->
            <div class="mt-6">
              <label for="image" class="block text-sm font-medium text-secondary-700 mb-2">
                Painting Image *
              </label>
              <div class="border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors duration-200">
                <input 
                  type="file" 
                  id="image" 
                  ref="fileInput"
                  @change="handleFileSelect"
                  accept="image/*"
                  required
                  class="hidden"
                >
                <div v-if="!selectedFile" @click="$refs.fileInput.click()" class="cursor-pointer">
                  <svg class="mx-auto h-12 w-12 text-secondary-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p class="mt-2 text-sm text-secondary-600">
                    <span class="font-medium text-primary-600 hover:text-primary-500">Click to upload</span> or drag and drop
                  </p>
                  <p class="text-xs text-secondary-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <div v-else class="text-center">
                  <img :src="previewUrl" alt="Preview" class="mx-auto h-32 w-32 object-cover rounded-lg">
                  <p class="mt-2 text-sm text-secondary-600">{{ selectedFile.name }}</p>
                  <button 
                    type="button" 
                    @click="removeFile"
                    class="mt-2 text-sm text-red-600 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="mt-8">
              <button 
                type="submit" 
                :disabled="isUploading"
                class="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isUploading ? 'Uploading...' : 'Upload Painting' }}
              </button>
            </div>
          </form>

          <!-- Success Message -->
          <div v-if="showSuccess" class="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
            <p class="text-green-800">✅ Painting uploaded successfully!</p>
          </div>

          <!-- Error Message -->
          <div v-if="showError" class="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg">
            <p class="text-red-800">❌ {{ errorMessage }}</p>
          </div>
        </div>

        <!-- Existing Paintings -->
        <div class="card p-8">
          <h2 class="text-2xl font-bold text-secondary-800 mb-6">Your Paintings</h2>
          
          <div v-if="loading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p class="mt-2 text-secondary-600">Loading paintings...</p>
          </div>

          <div v-else-if="paintings.length === 0" class="text-center py-8">
            <p class="text-secondary-600">No paintings uploaded yet.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="painting in paintings" 
              :key="painting._id"
              class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <img 
                :src="getImageUrl(painting.image)" 
                :alt="painting.title"
                class="w-full h-48 object-cover"
                @error="handleImageError"
              >
              <div class="p-4">
                <h3 class="font-semibold text-secondary-800 mb-1">{{ painting.title }}</h3>
                <p class="text-sm text-secondary-600 mb-2">by {{ painting.artist }}</p>
                <p class="text-xs text-secondary-500">
                  {{ painting.dimensions ? `${painting.dimensions.height || 'N/A'} × ${painting.dimensions.width || 'N/A'} × ${painting.dimensions.depth || 'N/A'} ${painting.dimensions.unit || 'cm'}` : 'Dimensions not available' }}
                </p>
                <div class="mt-2 flex items-center justify-between">
                  <span class="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                    {{ painting.category }}
                  </span>
                  <button 
                    @click="deletePainting(painting._id)"
                    class="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { paintingsAPI } from '../services/api.js'

export default {
  name: 'Admin',
  data() {
    return {
      isUploading: false,
      loading: false,
      showSuccess: false,
      showError: false,
      errorMessage: '',
      selectedFile: null,
      previewUrl: null,
      paintings: [],
      form: {
        title: '',
        artist: '',
        year: '',
        category: '',
        description: '',
        height: '',
        width: '',
        depth: '',
        unit: 'cm',
        medium: 'Oil on canvas',
        withFrame: false,
        featured: false,
        tags: ''
      }
    }
  },
  async mounted() {
    await this.loadPaintings()
  },
  methods: {
    getImageUrl(imagePath) {
      if (!imagePath) return ''
      
      // 如果已经是完整URL，直接返回
      if (imagePath.startsWith('http')) {
        return imagePath
      }
      
      // 如果是相对路径，添加服务器基础URL
      const baseURL = import.meta.env.PROD 
        ? '' // 生产环境使用相对路径
        : 'http://localhost:3001' // 开发环境使用完整URL
      
      return `${baseURL}${imagePath}`
    },
    
    handleImageError(event) {
      console.error('Image failed to load:', event.target.src)
      // 可以设置一个默认图片
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='
    },
    
    handleFileSelect(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedFile = file
        this.previewUrl = URL.createObjectURL(file)
      }
    },
    
    removeFile() {
      this.selectedFile = null
      this.previewUrl = null
      this.$refs.fileInput.value = ''
    },

    async uploadPainting() {
      this.isUploading = true
      this.showError = false
      this.showSuccess = false
      this.errorMessage = ''

      try {
        const formData = new FormData()
        formData.append('image', this.selectedFile)
        formData.append('title', this.form.title)
        formData.append('artist', this.form.artist)
        formData.append('year', this.form.year)
        formData.append('category', this.form.category)
        formData.append('description', this.form.description)
        formData.append('height', this.form.height)
        formData.append('width', this.form.width)
        formData.append('depth', this.form.depth)
        formData.append('unit', this.form.unit)
        formData.append('medium', this.form.medium)
        formData.append('withFrame', this.form.withFrame)
        formData.append('featured', this.form.featured)
        formData.append('tags', this.form.tags)

                 const response = await paintingsAPI.upload(formData)
         const result = response.data

        if (result.success) {
          // Reset form
          this.form = {
            title: '',
            artist: '',
            year: '',
            category: '',
            description: '',
            height: '',
            width: '',
            depth: '',
            unit: 'cm',
            medium: 'Oil on canvas',
            withFrame: false,
            featured: false,
            tags: ''
          }
          this.removeFile()
          this.showSuccess = true
          await this.loadPaintings()
          
          setTimeout(() => {
            this.showSuccess = false
          }, 5000)
        } else {
          throw new Error(result.message || 'Upload failed')
        }

      } catch (error) {
        console.error('Error uploading painting:', error)
        this.showError = true
        this.errorMessage = error.message || 'Failed to upload painting'
        
        setTimeout(() => {
          this.showError = false
        }, 5000)
      } finally {
        this.isUploading = false
      }
    },

    async loadPaintings() {
      this.loading = true
      try {
        const response = await paintingsAPI.getAll()
        console.log('API Response:', response.data) // 调试日志
        
        // 检查响应结构并提取数据
        let paintings = []
        if (response.data && response.data.success) {
          // 如果API返回了标准格式 {success: true, data: [...]}
          paintings = response.data.data || []
        } else if (Array.isArray(response.data)) {
          // 如果直接返回数组
          paintings = response.data
        } else {
          console.warn('Unexpected API response format:', response.data)
          paintings = []
        }
        
        // 确保paintings是数组
        if (!Array.isArray(paintings)) {
          console.error('Paintings data is not an array:', paintings)
          paintings = []
        }
        
        // 确保每个画作都有正确的数据结构
        this.paintings = paintings.map(painting => ({
          ...painting,
          dimensions: painting.dimensions || {
            height: null,
            width: null,
            depth: null,
            unit: 'cm'
          },
          category: painting.category || 'Other',
          artist: painting.artist || 'Unknown Artist',
          title: painting.title || 'Untitled'
        }))
        
        console.log('Processed paintings:', this.paintings) // 调试日志
        
      } catch (error) {
        console.error('Error loading paintings:', error)
        this.paintings = []
        this.showError = true
        this.errorMessage = 'Failed to load paintings'
        setTimeout(() => {
          this.showError = false
        }, 5000)
      } finally {
        this.loading = false
      }
    },

         async deletePainting(id) {
       if (confirm('Are you sure you want to delete this painting?')) {
         try {
           await paintingsAPI.delete(id)
           await this.loadPaintings()
         } catch (error) {
           console.error('Error deleting painting:', error)
           alert('Failed to delete painting')
         }
       }
     }
  }
}
</script>
