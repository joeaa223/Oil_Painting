<template>
  <div>
    <!-- Hero Section - 艺术画廊风格 -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- 动态背景渐变 -->
      <div class="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50"></div>
      
      <!-- 艺术性几何装饰 -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-32 h-32 bg-primary-300 rounded-full blur-xl"></div>
        <div class="absolute top-40 right-20 w-24 h-24 bg-secondary-300 rounded-full blur-lg"></div>
        <div class="absolute bottom-32 left-1/4 w-40 h-40 bg-amber-300 rounded-full blur-2xl"></div>
        <div class="absolute bottom-20 right-1/3 w-28 h-28 bg-orange-300 rounded-full blur-xl"></div>
      </div>
      
      <!-- 主要内容 -->
      <div class="relative z-20 text-center container-custom">
        <!-- Artistic Title -->
        <div class="mb-8">
          <h1 class="text-6xl md:text-8xl font-bold font-serif mb-4 bg-gradient-to-r from-primary-800 via-secondary-700 to-primary-900 bg-clip-text text-transparent leading-tight">
            The Beauty of Art
          </h1>
          <div class="w-32 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
        </div>
        
        <p class="text-xl md:text-2xl mb-12 text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
          Explore the infinite charm of the oil painting world and experience the perfect fusion of color and light
          <br>
          <span class="text-lg text-gray-600 italic">Each work tells a unique story</span>
        </p>
        
        <!-- Artistic Button Group -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <RouterLink to="/gallery" 
                      class="group relative inline-flex items-center px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-full hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <span class="mr-3">Browse Gallery</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </RouterLink>
          
          <RouterLink to="/about" 
                      class="inline-flex items-center px-8 py-4 border-2 border-primary-600 text-primary-700 font-semibold rounded-full hover:bg-primary-50 transition-all duration-300">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Learn More
          </RouterLink>
        </div>
      </div>
      
      <!-- Bottom Decorative Wave -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" class="w-full h-20 text-white">
          <path fill="currentColor" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>


  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
