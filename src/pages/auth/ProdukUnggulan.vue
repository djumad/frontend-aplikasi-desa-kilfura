<template>
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4">Produk Unggulan</h2>
  
      <!-- Form Tambah/Update -->
      <form @submit.prevent="submitForm" class="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label class="font-medium">Nama Produk</label>
          <input v-model="form.nama" type="text" placeholder="Nama Produk" class="w-full border px-3 py-2 rounded" required />
        </div>
  
        <div>
          <label class="font-medium">Harga</label>
          <input v-model="form.harga" type="number" placeholder="Harga" class="w-full border px-3 py-2 rounded" required />
        </div>
  
        <div>
          <label class="font-medium">Deskripsi</label>
          <textarea v-model="form.deskripsi" class="w-full border px-3 py-2 rounded" rows="3" required></textarea>
        </div>
  
        <div>
          <label class="font-medium">Foto Produk</label>
          <input type="file" @change="handleFile" class="w-full" />
        </div>
  
        <div class="flex gap-2">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {{ form.id ? 'Update Produk' : 'Tambah Produk' }}
          </button>
          <button v-if="form.id" type="button" @click="resetForm" class="bg-gray-500 text-white px-4 py-2 rounded">
            Batal
          </button>
        </div>
      </form>
  
      <hr class="my-6" />
  
      <!-- List Produk -->
      <div class="grid md:grid-cols-2 gap-4">
        <div v-for="produk in produkList" :key="produk.id" class="bg-white p-4 rounded shadow">
          <img :src="url + produk.foto" alt="Foto" class="w-full h-40 object-cover rounded mb-2" />
          <h3 class="font-bold text-lg">{{ produk.nama }}</h3>
          <p class="text-gray-600">Rp {{ produk.harga.toLocaleString() }}</p>
          <p class="text-sm text-gray-500 mt-1">{{ produk.deskripsi }}</p>
          <div class="flex gap-2 mt-3">
            <button @click="editProduk(produk)" class="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500">
              Edit
            </button>
            <button @click="deleteProduk(produk.id)" class="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600">
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
  import { api, url } from '../../lib/url';
  import { useRouter } from "vue-router";
  
  const produkList = ref([])
  
  const form = ref({
    id: '',
    nama: '',
    harga: 0,
    deskripsi: '',
    foto: null
  })
  const router = useRouter();
  
  const resetForm = () => {
    form.value = { id: '', nama: '', harga: 0, deskripsi: '', foto: null }
  }
  
  const handleFile = (e) => {
    form.value.foto = e.target.files[0]
  }
  
  const getProduk = async () => {
    const res = await axios.get(api + '/api/produk-unggulan')
    produkList.value = res.data
  }
  
  const submitForm = async () => {
    const formData = new FormData()
    formData.append('nama', form.value.nama)
    formData.append('harga', form.value.harga)
    formData.append('deskripsi', form.value.deskripsi)
    if (form.value.foto) formData.append('foto', form.value.foto)
  
    try {
      if (form.value.id) {
        // Update
        await axios.put(api + `/api/produk-unggulan/${form.value.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' , Authorization : localStorage.getItem('token') }
        })
        Swal.fire('Berhasil', 'Produk berhasil diupdate!', 'success')
      } else {
        // Create
        await axios.post(api + '/api/produk-unggulan', formData, {
          headers: { 'Content-Type': 'multipart/form-data' , Authorization : localStorage.getItem('token') }
        })
        Swal.fire('Berhasil', 'Produk berhasil ditambahkan!', 'success')
        router.push("/dashboard/produk-unggulan")
      }
      resetForm()
      getProduk()
    } catch (e) {
      Swal.fire('Gagal', e.response?.data?.error || 'Terjadi kesalahan!', 'error')
    }
  }
  
  const editProduk = (produk) => {
    form.value = {
      id: produk.id,
      nama: produk.nama,
      harga: produk.harga,
      deskripsi: produk.deskripsi,
      foto: null
    }
  }
  
  const deleteProduk = (id) => {
    Swal.fire({
      title: 'Hapus produk?',
      text: 'Produk akan dihapus permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(api + `/api/produk-unggulan/${id}` , { headers : { Authorization : localStorage.getItem('token') }})
          Swal.fire('Berhasil', 'Produk dihapus.', 'success')
          getProduk()
        } catch (e) {
          Swal.fire('Gagal', e.response?.data?.error || 'Gagal menghapus.', 'error')
        }
      }
    })
  }
  
  onMounted(() => {
    getProduk()
  })
  </script> 