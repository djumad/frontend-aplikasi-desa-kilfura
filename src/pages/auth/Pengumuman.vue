<template>
    <div class="p-4">
      <h1 class="text-xl font-bold mb-4">Pengumuman</h1>
  
      <form @submit.prevent="submitPengumuman" class="space-y-2 mb-6">
        <input v-model="form.judul" type="text" placeholder="Judul" class="border p-2 w-full" />
        <textarea v-model="form.isi" placeholder="Isi pengumuman" class="border p-2 w-full resize-none"></textarea>
        <input v-model="form.tanggal" type="date" class="border p-2 w-full" />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          {{ form.id ? 'Update' : 'Simpan' }}
        </button>
      </form>
  
      <div v-if="pengumumanList.length === 0" class="text-gray-500 italic">
        Belum ada pengumuman.
      </div>
  
      <div v-for="data in pengumumanList" :key="data.id" class="border p-4 mb-4 rounded">
        <h2 class="font-semibold text-lg">{{ data.judul }}</h2>
        <p class="text-sm text-gray-500">{{ data.tanggal }}</p>
        <p class="my-2 whitespace-pre-line">{{ data.isi }}</p>
        <div class="space-x-2 mt-2">
          <button @click="editPengumuman(data)" class="bg-yellow-400 text-white px-2 py-1 rounded">Edit</button>
          <button @click="confirmDelete(data.id)" class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import Swal from 'sweetalert2';
  import { api } from '../../lib/url';
  
  const pengumumanList = ref([]);
  const form = ref({
    id: null,
    judul: '',
    isi: '',
    tanggal: ''
  });
  
  const getPengumuman = async () => {
    try {
      const response = await axios.get(api + '/api/pengumuman');
      console.log('Pengumuman:', response.data.data);
      pengumumanList.value = response.data.data;
    } catch (err) {
      Swal.fire('Gagal', 'Gagal memuat data pengumuman.', 'error');
    }
  };
  
  const submitPengumuman = async () => {
    const headers = {
      Authorization: localStorage.getItem('token')
    };
  
    try {
      if (form.value.id) {
        // Update
        await axios.put(api + `/api/pengumuman/${form.value.id}`, form.value, { headers });
        Swal.fire('Berhasil', 'Pengumuman berhasil diupdate', 'success');
      } else {
        // Create
        await axios.post(api + '/api/pengumuman', form.value, { headers });
        Swal.fire('Berhasil', 'Pengumuman berhasil ditambahkan', 'success');
      }
  
      resetForm();
      await getPengumuman();
    } catch (error) {
      Swal.fire('Gagal', error.response?.data?.error || 'Terjadi kesalahan', 'error');
    }
  };
  
  const deletePengumuman = async (id) => {
    try {
      const headers = {
        Authorization: localStorage.getItem('token')
      };
      await axios.delete(api + `/api/pengumuman/${id}`, { headers });
      await getPengumuman();
      Swal.fire('Dihapus!', 'Pengumuman berhasil dihapus.', 'success');
    } catch (err) {
      Swal.fire('Gagal', 'Gagal menghapus pengumuman.', 'error');
    }
  };
  
  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePengumuman(id);
      }
    });
  };
  
  const editPengumuman = (data) => {
    form.value = { ...data };
  };
  
  const resetForm = () => {
    form.value = {
      id: null,
      judul: '',
      isi: '',
      tanggal: ''
    };
  };
  
  onMounted(() => {
    getPengumuman();
  });
  </script>
  