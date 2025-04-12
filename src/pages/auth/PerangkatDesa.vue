<template>
    <div class="p-6 max-w-3xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">Perangkat Desa</h2>
  
      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label class="block font-medium">Nama</label>
          <input v-model="form.nama" type="text" placeholder="Nama"
            class="w-full border rounded px-3 py-2" required />
        </div>
  
        <div>
          <label class="block font-medium">Status</label>
          <input v-model="form.status" type="text" placeholder="Status"
            class="w-full border rounded px-3 py-2" required />
        </div>
  
        <div>
          <label class="block font-medium">Foto Profil</label>
          <input type="file" @change="handleFile" class="w-full" />
        </div>
  
        <div class="flex gap-2">
          <button type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            {{ form.id ? 'Update' : 'Tambah' }}
          </button>
          <button v-if="form.id" type="button"
            @click="confirmReset"
            class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
            Batal
          </button>
        </div>
      </form>
  
      <hr class="my-6" />
  
      <!-- List -->
      <div class="grid gap-4">
        <div v-for="anggota in perangkatDesa" :key="anggota.id"
          class="bg-white rounded shadow p-4 flex items-center gap-4">
          <img :src="url + anggota.profil" alt="Foto" class="w-20 h-20 object-cover rounded-full" />
          <div class="flex-1">
            <p class="font-semibold text-lg">{{ anggota.nama }}</p>
            <p class="text-gray-500">{{ anggota.status }}</p>
          </div>
          <div class="flex gap-2">
            <button @click="editPerangkat(anggota)"
              class="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
              Edit
            </button>
            <button @click="confirmDelete(anggota.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import { api, url } from '../../lib/url'
  
  const perangkatDesa = ref([])
  const form = ref({
    id: '',
    nama: '',
    status: '',
    profil: null
  })
  
  const resetForm = () => {
    form.value = { id: '', nama: '', status: '', profil: null }
  }
  
  const confirmReset = () => {
    Swal.fire({
      title: 'Batal edit?',
      text: 'Form akan dikosongkan.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, kosongkan'
    }).then((result) => {
      if (result.isConfirmed) resetForm()
    })
  }
  
  const handleFile = (e) => {
    form.value.profil = e.target.files[0]
  }
  
  const getPerangkatDesa = async () => {
    try {
      const res = await axios.get(api + '/api/perangkat-desa')
      perangkatDesa.value = res.data
    } catch (err) {
      console.error(err)
    }
  }
  
  const submitForm = async () => {
    const formData = new FormData()
    formData.append('nama', form.value.nama)
    formData.append('status', form.value.status)
    if (form.value.profil) formData.append('profil', form.value.profil)
  
    try {
      if (form.value.id) {
        await axios.put(`${api}/api/perangkat-desa/update/${form.value.id}`, formData, {
          headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        Swal.fire('Berhasil!', 'Data berhasil diupdate.', 'success')
      } else {
        await axios.post(`${api}/api/perangkat-desa/create`, formData, {
          headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        Swal.fire('Berhasil!', 'Data berhasil ditambahkan.', 'success')
      }
  
      resetForm()
      getPerangkatDesa()
    } catch (err) {
      Swal.fire('Gagal', err.response?.data?.error || 'Terjadi kesalahan', 'error')
    }
  }
  
  const editPerangkat = (anggota) => {
    form.value = {
      id: anggota.id,
      nama: anggota.nama,
      status: anggota.status,
      profil: null
    }
  }
  
  const confirmDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Hapus data?',
      text: 'Data akan dihapus secara permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    })
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`${api}/api/perangkat-desa/delete/${id}`, {
          headers: { Authorization: localStorage.getItem('token') }
        })
        Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success')
        getPerangkatDesa()
      } catch (err) {
        Swal.fire('Gagal', err.response?.data?.error || 'Terjadi kesalahan', 'error')
      }
    }
  }
  
  onMounted(() => {
    getPerangkatDesa()
  })
  </script>
  