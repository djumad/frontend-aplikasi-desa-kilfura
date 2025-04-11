<template>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Lembaga Desa</h2>
  
      <form @submit.prevent="submitLembaga" class="space-y-2 mb-6">
        <input v-model="form.nama" type="text" placeholder="Nama" class="border p-2 w-full" />
        <textarea v-model="form.deskripsi" placeholder="Deskripsi" class="border p-2 w-full"></textarea>
        <input @change="onFileChange" type="file" class="border p-2 w-full" />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2">Simpan</button>
      </form>
  
      <div v-for="data in lembaga" :key="data.id" class="border p-4 mb-4 rounded">
        <p class="font-semibold">{{ data.nama }}</p>
        <img v-if="data.foto" :src="url + data.foto" alt="" class="w-32 h-auto my-2" />
        <p>{{ data.deskripsi }}</p>
        <div class="space-x-2 mt-2">
          <button @click="editLembaga(data)" class="bg-yellow-400 text-white px-2 py-1">Edit</button>
          <button @click="confirmDelete(data.id)" class="bg-red-500 text-white px-2 py-1">Hapus</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  import { api, url } from '../../lib/url';
  import Swal from 'sweetalert2';
  
  const lembaga = ref([]);
  const form = ref({
    id: null,
    nama: '',
    deskripsi: '',
    foto: null
  });
  
  const getDataLembaga = async () => {
    const response = await axios.get(api + '/api/lembaga-desa');
    lembaga.value = response.data;
  };
  
  const submitLembaga = async () => {
    const formData = new FormData();
    formData.append('nama', form.value.nama);
    formData.append('deskripsi', form.value.deskripsi);
    if (form.value.foto) formData.append('foto', form.value.foto);
  
    const headers = {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'multipart/form-data'
    };
  
    try {
      if (form.value.id) {
        await axios.put(api + '/api/lembaga-desa/update/' + form.value.id, formData, { headers });
        Swal.fire('Sukses', 'Data berhasil diperbarui!', 'success');
      } else {
        await axios.post(api + '/api/lembaga-desa/create', formData, { headers });
        Swal.fire('Sukses', 'Data berhasil ditambahkan!', 'success');
      }
  
      resetForm();
      await getDataLembaga();
    } catch (error) {
      Swal.fire('Gagal', error.response?.data?.error || 'Terjadi kesalahan.', 'error');
    }
  };
  
  const deleteLembaga = async (id) => {
    const headers = {
      Authorization: localStorage.getItem('token')
    };
    await axios.delete(api + '/api/lembaga-desa/delete/' + id, { headers });
    await getDataLembaga();
    Swal.fire('Dihapus!', 'Data berhasil dihapus.', 'success');
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
        deleteLembaga(id);
      }
    });
  };
  
  const editLembaga = (data) => {
    form.value = { ...data, foto: null };
  };
  
  const onFileChange = (e) => {
    form.value.foto = e.target.files[0];
  };
  
  const resetForm = () => {
    form.value = {
      id: null,
      nama: '',
      deskripsi: '',
      foto: null
    };
  };
  
  onMounted(getDataLembaga);
  </script>
  