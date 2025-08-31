<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
    <!-- Header -->
    <div class="text-center py-8">
      <h1 class="text-5xl font-bold text-secondary-800 mb-4 font-serif">Gallery</h1>
      <p class="text-xl text-secondary-600 max-w-2xl mx-auto">
        Browse our carefully collected oil paintings, each one is a treasure of art
      </p>
    </div>

    <!-- Filter Section -->
    <div class="mb-8 flex flex-wrap justify-center gap-4 px-4">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="selectedCategory = category"
        class="px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        :class="selectedCategory === category 
          ? 'bg-primary-600 text-white transform scale-105' 
          : 'bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-700'"
      >
        {{ category }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p class="mt-4 text-secondary-600 text-lg">Loading paintings...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="text-6xl mb-4">⚠️</div>
        <h3 class="text-xl font-semibold text-secondary-800 mb-2">Error Loading Paintings</h3>
        <p class="text-secondary-600 mb-6">{{ error }}</p>
        <button @click="fetchPaintings" class="btn-primary">
          Try Again
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredPaintings.length === 0" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="text-6xl mb-4">🎨</div>
        <h3 class="text-xl font-semibold text-secondary-800 mb-2">No Paintings Yet</h3>
        <p class="text-secondary-600 mb-6">Upload your first artwork through the Admin panel to see it in the gallery.</p>
        <RouterLink to="/admin" class="btn-primary">
          Go to Admin Panel
        </RouterLink>
      </div>
    </div>

    <!-- Carousel Gallery -->
    <div v-else class="relative max-w-6xl mx-auto px-4">
      <!-- Main Carousel Container -->
      <div class="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
        <!-- Navigation Arrows -->
        <button 
          @click="previousSlide"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button 
          @click="nextSlide"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- Image Display Area -->
        <div class="relative h-[70vh] overflow-hidden">
          <div 
            class="flex transition-transform duration-700 ease-in-out h-full"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div 
              v-for="(painting, index) in filteredPaintings" 
              :key="painting._id"
              class="w-full h-full flex-shrink-0 relative"
            >
              <!-- Main Image -->
              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <img 
                  :src="getImageUrl(painting.image)" 
                  :alt="painting.title"
                  class="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                  @error="handleImageError"
                >
              </div>
              
              <!-- Image Info Overlay -->
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                <div class="text-white">
                  <h2 class="text-3xl font-bold font-serif mb-2">{{ painting.title }}</h2>
                  <p class="text-xl opacity-90 mb-2">{{ painting.artist }}</p>
                  <div class="flex items-center justify-between">
                    <p class="text-lg opacity-75">{{ painting.year }} · {{ painting.category }}</p>
                    <span class="text-sm opacity-60">{{ index + 1 }} / {{ filteredPaintings.length }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Thumbnail Navigation -->
        <div class="p-6 bg-gray-50">
          <div class="flex justify-center space-x-3 overflow-x-auto pb-2">
            <button
              v-for="(painting, index) in filteredPaintings"
              :key="`thumb-${painting._id}`"
              @click="goToSlide(index)"
              class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110"
              :class="index === currentIndex 
                ? 'border-primary-500 shadow-lg' 
                : 'border-gray-300 hover:border-primary-300'"
            >
              <img 
                :src="getImageUrl(painting.image)" 
                :alt="painting.title"
                class="w-full h-full object-cover"
                @error="handleImageError"
              >
            </button>
          </div>
        </div>
      </div>

      <!-- Auto-play Controls -->
      <div class="flex justify-center items-center mt-6 space-x-4">
        <button 
          @click="toggleAutoPlay"
          class="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="isAutoPlaying" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6l4-3-4-3zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"></path>
          </svg>
          <span class="text-sm font-medium">{{ isAutoPlaying ? 'Pause' : 'Play' }}</span>
        </button>
        
        <div class="text-sm text-gray-600">
          Auto-play: {{ isAutoPlaying ? 'ON' : 'OFF' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { paintingsAPI } from '../services/api.js'

export default {
  name: 'Gallery',
  data() {
    return {
      selectedCategory: 'All',
      categories: ['All', 'Landscape', 'Portrait', 'Still Life', 'Abstract'],
      paintings: [],
      loading: false,
      error: null,
      currentIndex: 0,
      isAutoPlaying: false,
      autoPlayInterval: null,
      autoPlayDelay: 5000 // 5 seconds
    }
  },
  computed: {
    filteredPaintings() {
      if (this.selectedCategory === 'All') {
        return this.paintings
      }
      return this.paintings.filter(painting => painting.category === this.selectedCategory)
    }
  },
  async mounted() {
    await this.fetchPaintings()
    await this.fetchCategories()
    this.setupKeyboardNavigation()
  },
  beforeUnmount() {
    this.stopAutoPlay()
    this.removeKeyboardNavigation()
  },
  watch: {
    selectedCategory() {
      this.currentIndex = 0 // Reset to first slide when category changes
    },
    filteredPaintings() {
      this.currentIndex = 0 // Reset to first slide when paintings change
    }
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
      // 设置一个默认图片
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='
    },
    
    async fetchPaintings() {
      try {
        this.loading = true
        this.error = null
        const response = await paintingsAPI.getAll()
        this.paintings = response.data.data || []
      } catch (error) {
        console.error('Error fetching paintings:', error)
        this.error = 'Failed to load paintings'
        this.paintings = []
      } finally {
        this.loading = false
      }
    },
    
    async fetchCategories() {
      try {
        const response = await paintingsAPI.getCategories()
        if (response.data.success) {
          this.categories = response.data.data
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Keep default categories
      }
    },
    
    // Carousel Navigation Methods
    nextSlide() {
      if (this.filteredPaintings.length === 0) return
      this.currentIndex = (this.currentIndex + 1) % this.filteredPaintings.length
    },
    
    previousSlide() {
      if (this.filteredPaintings.length === 0) return
      this.currentIndex = this.currentIndex === 0 
        ? this.filteredPaintings.length - 1 
        : this.currentIndex - 1
    },
    
    goToSlide(index) {
      if (index >= 0 && index < this.filteredPaintings.length) {
        this.currentIndex = index
      }
    },
    
    // Auto-play Methods
    startAutoPlay() {
      this.stopAutoPlay() // Clear any existing interval
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide()
      }, this.autoPlayDelay)
      this.isAutoPlaying = true
    },
    
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval)
        this.autoPlayInterval = null
      }
      this.isAutoPlaying = false
    },
    
    toggleAutoPlay() {
      if (this.isAutoPlaying) {
        this.stopAutoPlay()
      } else {
        this.startAutoPlay()
      }
    },
    
    // Keyboard Navigation
    setupKeyboardNavigation() {
      this.keyboardHandler = (event) => {
        switch(event.key) {
          case 'ArrowLeft':
            event.preventDefault()
            this.previousSlide()
            break
          case 'ArrowRight':
            event.preventDefault()
            this.nextSlide()
            break
          case ' ':
            event.preventDefault()
            this.toggleAutoPlay()
            break
        }
      }
      document.addEventListener('keydown', this.keyboardHandler)
    },
    
    removeKeyboardNavigation() {
      if (this.keyboardHandler) {
        document.removeEventListener('keydown', this.keyboardHandler)
      }
    }
  }
}
</script>
