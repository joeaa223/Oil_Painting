<template>
  <div class="py-12">
    <div class="container-custom">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-secondary-800 mb-4 font-serif">Contact Us</h1>
        <p class="text-xl text-secondary-600 max-w-2xl mx-auto">
          We'd love to hear from you. If you have any questions, suggestions, or collaboration intentions, please feel free to contact us.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="card p-8">
          <h2 class="text-2xl font-bold text-secondary-800 mb-6">Send Message</h2>
          <form @submit.prevent="submitForm">
            <div class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-secondary-700 mb-2">
                  Name *
                </label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name"
                  required
                  class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Please enter your name"
                >
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-secondary-700 mb-2">
                  Email *
                </label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email"
                  required
                  class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Please enter your email address"
                >
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium text-secondary-700 mb-2">
                  Subject *
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="form.subject"
                  required
                  class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Please enter message subject"
                >
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-secondary-700 mb-2">
                  Message *
                </label>
                <textarea 
                  id="message" 
                  v-model="form.message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Please enter your message"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                :disabled="isSubmitting"
                class="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </div>
          </form>
          
          <!-- Success Message -->
          <div v-if="showSuccess" class="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
            <p class="text-green-800">✅ Your message has been sent successfully! We will reply to you as soon as possible.</p>
          </div>
          
          <!-- Error Message -->
          <div v-if="showError" class="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg">
            <p class="text-red-800">❌ {{ errorMessage }}</p>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <div class="card p-8">
            <h2 class="text-2xl font-bold text-secondary-800 mb-6">Contact Information</h2>
            <div class="space-y-4">
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span class="text-primary-600">📧</span>
                </div>
                <div>
                  <h3 class="font-semibold text-secondary-800">Email Address</h3>
                  <p class="text-secondary-600">info@oilpainting.com</p>
                  <p class="text-secondary-600">support@oilpainting.com</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span class="text-primary-600">📱</span>
                </div>
                <div>
                  <h3 class="font-semibold text-secondary-800">Phone Number</h3>
                  <p class="text-secondary-600">+1 (555) 123-4567</p>
                  <p class="text-secondary-600">+1 (800) 123-4567</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span class="text-primary-600">📍</span>
                </div>
                <div>
                  <h3 class="font-semibold text-secondary-800">Office Address</h3>
                  <p class="text-secondary-600">123 Art Street, New York, NY 10001</p>
                  <p class="text-secondary-600">Art Building, 15th Floor</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span class="text-primary-600">🕒</span>
                </div>
                <div>
                  <h3 class="font-semibold text-secondary-800">Business Hours</h3>
                  <p class="text-secondary-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p class="text-secondary-600">Weekend: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card p-8">
            <h2 class="text-2xl font-bold text-secondary-800 mb-6">Follow Us</h2>
            <div class="flex space-x-4">
              <a href="#" class="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-200">
                <span>F</span>
              </a>
              <a href="#" class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                <span>T</span>
              </a>
              <a href="#" class="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-200">
                <span>I</span>
              </a>
            </div>
            <p class="text-sm text-secondary-600 mt-4">
              Follow our social media accounts to get the latest art news and exhibition information.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { contactAPI } from '../services/api.js'

export default {
  name: 'Contact',
  data() {
    return {
      isSubmitting: false,
      showSuccess: false,
      showError: false,
      errorMessage: '',
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      this.showError = false
      this.errorMessage = ''
      
      try {
        const response = await contactAPI.submit(this.form)
        
        if (response.data.success) {
          // Reset form
          this.form = {
            name: '',
            email: '',
            subject: '',
            message: ''
          }
          
          this.showSuccess = true
          setTimeout(() => {
            this.showSuccess = false
          }, 5000)
        }
        
      } catch (error) {
        console.error('Error submitting form:', error)
        this.showError = true
        
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || 'Failed to send message'
        } else {
          this.errorMessage = 'Network error. Please try again later.'
        }
        
        setTimeout(() => {
          this.showError = false
        }, 5000)
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>
