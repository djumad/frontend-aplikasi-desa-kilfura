<template>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Potensi Desa</h2>
  
      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4 mb-6">
        <input v-model="form.kategori" type="text" placeholder="Kategori" class="border p-2 w-full" />
        <input v-model="form.nama" type="text" placeholder="Nama" class="border p-2 w-full" />
        <textarea v-model="form.deskripsi" placeholder="Deskripsi" class="border p-2 w-full"></textarea>
        <input type="file" @change="handleFileChange" class="border p-2 w-full" />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          {{ form.id ? 'Update' : 'Simpan' }}
        </button>
      </form>
  
      <!-- List -->
      <div v-for="item in potensiList" :key="item.id" class="border p-4 mb-2 rounded shadow">
        <h3 class="font-semibold">{{ item.nama }}</h3>
        <p class="italic text-sm">{{ item.kategori }}</p>
        <p>{{ item.deskripsi }}</p>
        <img v-if="item.foto" :src="url + item.foto" alt="" class="w-32 mt-2" />
        <div class="mt-2 space-x-2">
          <button @click="editItem(item)" class="text-blue-500">Edit</button>
          <button @click="deleteItem(item.id)" class="text-red-500">Hapus</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import Swal from 'sweetalert2';
  import { api, url } from '../../lib/url';
  
  const potensiList = ref([]);
  const form = ref({
    id: '',
    kategori: '',
    nama: '',
    deskripsi: '',
    foto: null,
  });
  
  const fetchData = async () => {
    const res = await axios.get(`${api}/api/potensi-desa`);
    potensiList.value = res.data;
  };
  
  const handleFileChange = (e) => {
    form.value.foto = e.target.files[0];
  };
  
  const resetForm = () => {
    form.value = {
      id: '',
      kategori: '',
      nama: '',
      deskripsi: '',
      foto: null,
    };
  };
  
  const submitForm = async () => {
    const formData = new FormData();
    formData.append('kategori', form.value.kategori);
    formData.append('nama', form.value.nama);
    formData.append('deskripsi', form.value.deskripsi);
    if (form.value.foto) formData.append('foto', form.value.foto);
  
    try {
      if (form.value.id) {
        await axios.put(`${api}/api/potensi-desa/${form.value.id}`, formData, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        Swal.fire('Sukses', 'Data berhasil diupdate', 'success');
      } else {
        await axios.post(`${api}/api/potensi-desa`, formData, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        Swal.fire('Sukses', 'Data berhasil ditambahkan', 'success');
      }
      resetForm();
      fetchData();
    } catch (err) {
      Swal.fire('Gagal', err.response?.data?.error || 'Terjadi kesalahan', 'error');
    }
  };
  
  const editItem = (item) => {
    form.value = { ...item, foto: null };
  };
  
  const deleteItem = async (id) => {
    const confirm = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
    });
  
    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${api}/api/potensi-desa/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        Swal.fire('Dihapus', 'Data berhasil dihapus', 'success');
        fetchData();
      } catch (err) {
        Swal.fire('Gagal', err.response?.data?.error || 'Terjadi kesalahan', 'error');
      }
    }
  };
  
  onMounted(() => {
    fetchData();
  });
  </script>
  