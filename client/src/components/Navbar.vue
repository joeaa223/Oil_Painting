<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container-custom">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">🎨</span>
          </div>
          <RouterLink to="/" class="text-2xl font-bold text-secondary-800 font-serif">
            Oil Painting Gallery
          </RouterLink>
        </div>
        
        <div class="hidden md:flex space-x-8">
          <RouterLink 
            v-for="item in navigation" 
            :key="item.name"
            :to="item.href" 
            class="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
            :class="{ 'text-primary-600': $route.path === item.href }"
          >
            {{ item.name }}
          </RouterLink>
        </div>
        
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-secondary-100"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      <!-- Mobile menu -->
      <div v-show="mobileMenuOpen" class="md:hidden pb-4">
        <div class="space-y-2">
          <RouterLink 
            v-for="item in navigation" 
            :key="item.name"
            :to="item.href" 
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-secondary-50 font-medium transition-colors duration-200"
            :class="{ 'text-primary-600 bg-primary-50': $route.path === item.href }"
          >
            {{ item.name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      mobileMenuOpen: false,
      navigation: [
        { name: 'Home', href: '/' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Admin', href: '/admin' }
      ]
    }
  }
}
</script>
