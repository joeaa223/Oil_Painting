<template>
  <div class="py-12">
    <div class="container-custom">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-secondary-800 mb-6 font-serif">About Us</h1>
        <p class="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
          We are a group of art lovers dedicated to providing a platform for showcasing and exchanging oil painting art from around the world.
          Through our gallery, you can appreciate excellent oil paintings from different eras and styles.
        </p>
      </div>

      <!-- Mission Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
               alt="Art gallery" 
               class="rounded-xl shadow-2xl">
        </div>
        <div>
          <h2 class="text-3xl font-bold text-secondary-800 mb-6 font-serif">Our Mission</h2>
          <div class="space-y-4 text-lg text-secondary-600 leading-relaxed">
            <p>
              We believe that art is a treasure of human civilization, and every oil painting carries the emotions of artists and the imprint of the times.
              Our mission is to enable more people to access and appreciate these precious works of art.
            </p>
            <p>
              Through modern digital platforms, we have broken the limitations of geography and time, allowing art enthusiasts from around the world
              to appreciate high-quality oil paintings anytime, anywhere.
            </p>
            <p>
              We not only showcase the works of classical masters, but also actively discover and promote the creations of contemporary excellent artists,
              contributing our strength to the inheritance and development of art.
            </p>
          </div>
        </div>
      </div>

      <!-- Values Section -->
      <div class="bg-white rounded-2xl p-8 shadow-lg mb-16">
        <h2 class="text-3xl font-bold text-secondary-800 mb-8 text-center font-serif">Our Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">🎨</span>
            </div>
            <h3 class="text-xl font-semibold text-secondary-800 mb-3">Art First</h3>
            <p class="text-secondary-600">
              We always put artistic quality first, carefully selecting every work displayed to ensure its artistic value and appreciation.
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">🌍</span>
            </div>
            <h3 class="text-xl font-semibold text-secondary-800 mb-3">Inclusive & Open</h3>
            <p class="text-secondary-600">
              We welcome artworks from all over the world and different cultural backgrounds, promoting the diversified development of art.
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">📚</span>
            </div>
            <h3 class="text-xl font-semibold text-secondary-800 mb-3">Education & Heritage</h3>
            <p class="text-secondary-600">
              We are committed to art education, helping audiences better understand art through detailed work introductions and background knowledge.
            </p>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-secondary-800 mb-8 font-serif">Our Team</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-white text-4xl">👨‍🎨</span>
            </div>
            <h3 class="text-xl font-semibold text-secondary-800 mb-2">John Artist</h3>
            <p class="text-secondary-600 mb-2">Art Director</p>
            <p class="text-sm text-secondary-500">
              Senior art historian with 20 years of experience in art collection and curation.
            </p>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-white text-4xl">👩‍💻</span>
            </div>
            <h3 class="text-xl font-semibold text-secondary-800 mb-2">Sarah Tech</h3>
            <p class="text-secondary-600 mb-2">Technical Director</p>
            <p class="text-sm text-secondary-500">
              Full-stack developer focused on providing the best digital solutions for art exhibition.
            </p>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-white text-4xl">👨‍💼</span>
            </div>
            <h3 class="text-xl font-semibold text-secondary-800 mb-2">Mike Operations</h3>
            <p class="text-secondary-600 mb-2">Operations Director</p>
            <p class="text-sm text-secondary-500">
              Marketing expert dedicated to promoting excellent artworks to a broader audience.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>
