<template>
  <footer class="bg-secondary-800 text-white mt-16">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold">🎨</span>
            </div>
            <span class="text-xl font-bold font-serif">Oil Painting Gallery</span>
          </div>
          <p class="text-secondary-300 leading-relaxed">
            A professional platform showcasing exquisite oil paintings, dedicated to spreading the beauty of art.
          </p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/" class="text-secondary-300 hover:text-white transition-colors duration-200">
                Home
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/gallery" class="text-secondary-300 hover:text-white transition-colors duration-200">
                Gallery
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/about" class="text-secondary-300 hover:text-white transition-colors duration-200">
                About Us
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/contact" class="text-secondary-300 hover:text-white transition-colors duration-200">
                Contact Us
              </RouterLink>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact Info</h3>
          <div class="space-y-2 text-secondary-300">
            <p>📧 info@oilpainting.com</p>
            <p>📱 +1 (555) 123-4567</p>
            <p>📍 123 Art Street, New York, NY 10001</p>
          </div>
        </div>
      </div>
      
      <div class="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-400">
        <p>&copy; 2024 Oil Painting Gallery. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
