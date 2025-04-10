<template>
    <div class="min-h-screen bg-base-100 p-5">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl ml-8 font-bold text-primary">Dashboard</h1>
        <p class="text-base ml-8 text-gray-500">Selamat datang di sistem informasi desa.</p>
      </div>
  
      <!-- Konten utama: Profil Desa -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="card bg-white shadow-xl border border-base-200">
          <div class="card-body items-center text-center">
            <h2 class="card-title text-primary">Profil Desa</h2>
            <p class="text-lg font-semibold">{{ desa.namaDesa }}</p>
            <figure class="mt-4">
              <img
                v-if="desa.logo"
                :src="url + desa.logo"
                :alt="desa.namaDesa"
                class="rounded-xl border border-base-300 w-32 h-32 object-cover"
              />
              <div v-else class="text-sm text-gray-500 italic">Logo belum tersedia</div>
            </figure>
            <div class="mt-4">
              <button @click="showModal = true" class="btn btn-sm btn-outline btn-primary">Edit Profil Desa</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal Edit Profil (Simplified) -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-primary">Edit Profil Desa</h3>
              <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form @submit.prevent="submitForm">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Nama Desa</span>
                </label>
                <input 
                  type="text" 
                  v-model="formData.namaDesa" 
                  class="input input-bordered w-full" 
                  required
                />
              </div>
              
              <div class="form-control mt-4">
                <label class="label">
                  <span class="label-text">Logo Desa</span>
                </label>
                <input 
                  type="file" 
                  @change="handleFileUpload" 
                  class="file-input file-input-bordered w-full" 
                  accept="image/*"
                />
                <div v-if="formData.logoPreview" class="mt-2">
                  <img :src="formData.logoPreview" class="w-32 h-32 object-cover rounded" />
                </div>
              </div>
              
              <div class="modal-action mt-6">
                <button type="button" @click="closeModal" class="btn btn-ghost">Batal</button>
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  <span v-if="isLoading" class="loading loading-spinner"></span>
                  {{ isLoading ? 'Menyimpan...' : 'Simpan Perubahan' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios'
  import { onMounted, ref } from 'vue'
  import { useRouter } from "vue-router";
  import { api, url } from '../../lib/url'
  
  const desa = ref({
    id: null,
    namaDesa: '',
    logo: ''
  });

  const router = useRouter();
  
  const showModal = ref(false)
  const isLoading = ref(false)
  const formData = ref({
    namaDesa: '',
    logo: null,
    logoPreview: ''
  })
  
  // Load desa data
  const profilDesa = async () => {
    try {
      
      const response = await axios.get(api + '/api/profil-desa')
      if (response.data && response.data.length > 0) {
        desa.value = response.data[0]
        formData.value.namaDesa = response.data[0].namaDesa
        if (response.data[0].logo) {
          formData.value.logoPreview = url + response.data[0].logo
        }
      }
    } catch (error) {
      console.error('Gagal memuat profil desa:', error)
    }
  }
  
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      formData.value.logo = file
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        formData.value.logoPreview = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  
  // Close modal and reset form
  const closeModal = () => {
    showModal.value = false
    // Reset to original data
    formData.value.namaDesa = desa.value.namaDesa
    formData.value.logo = null
    formData.value.logoPreview = desa.value.logo ? url + desa.value.logo : ''
  }
  
  // Submit form
  const submitForm = async () => {
    isLoading.value = true
    try {
      const data = new FormData()
      data.append('namaDesa', formData.value.namaDesa)
      if (formData.value.logo) {
        data.append('logo', formData.value.logo)
      }
      const token = localStorage.getItem('token');
      console.log(desa.value.id);
      const response = await axios.put(
        `${api}/api/profil-desa/${desa.value.id}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization : token
          }
        }
      )
      
      if (response.data.message) {
          closeModal()
          await profilDesa()
      }
    } catch (error) {
      console.error('Gagal menyimpan profil desa:', error)
      alert('Gagal menyimpan perubahan. Silakan coba lagi.')
    } finally {
      isLoading.value = false
    }
  }
  
  // Load initial data
  onMounted(() => {
    profilDesa()
  })
  </script>