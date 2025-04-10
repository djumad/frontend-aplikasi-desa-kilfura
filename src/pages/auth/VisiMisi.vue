<template>
    <div class="min-h-screen bg-base-100 p-4">
      <h1 class="text-4xl font-extrabold text-center text-primary mb-8">Visi & Misi</h1>
  
      <div class="card max-w-3xl mx-auto bg-white shadow-lg border border-base-200 relative">
        <!-- Tombol Edit -->
        <router-link
          to="/dashboard/visi-misi/edit"
          class="btn btn-sm btn-outline btn-primary absolute top-4 right-4 z-10"
        >
          Edit
        </router-link>
  
        <figure v-if="visiMisi.foto" class="px-6 pt-6">
          <img
            :src="url + visiMisi.foto"
            :alt="visiMisi.judul"
            class="rounded-xl object-cover w-full max-h-64"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-2xl text-center text-primary">{{ visiMisi.judul }}</h2>
          <p class="text-gray-700 leading-relaxed whitespace-pre-line text-justify mt-4">
            {{ visiMisi.deskripsi }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios'
  import { api, url } from '../../lib/url'
  import { onMounted, ref } from 'vue'
  
  const visiMisi = ref({
    userId: '',
    judul: '',
    deskripsi: '',
    foto: ''
  })
  
  const getDataVisiMisi = async () => {
    try {
      const response = await axios.get(api + '/api/visi-misi')
      visiMisi.value = response.data[0]
    } catch (err) {
      console.error('Gagal memuat data Visi Misi:', err)
    }
  }
  
  onMounted(() => {
    getDataVisiMisi()
  })
  </script>
  