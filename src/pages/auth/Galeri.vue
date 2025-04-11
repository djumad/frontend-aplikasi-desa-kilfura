<template>
    <h2 class="text-4xl font-extrabold text-center text-primary mb-8">Agenda</h2>
  
    <form @submit.prevent="submitForm" class="mb-6 space-y-3">
      <input v-model="form.judul" type="text" placeholder="Judul" class="input" />
      <input v-model="form.deskripsi" type="text" placeholder="Deskripsi" class="input" />
      <input v-model="form.tanggal" type="date" class="input" />
      <input @change="handleFileChange" type="file" class="input" />
      <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update' : 'Tambah' }} Galeri</button>
    </form>
  
    <div v-for="item in galeri" :key="item.id" class="border p-4 rounded-lg mb-4">
      <p class="font-bold">{{ item.judul }}</p>
      <p>{{ item.deskripsi }}</p>
      <img :src="url + item.foto" alt="foto" class="w-64" />
      <p>{{ item.tanggal }}</p>
      <div class="flex gap-2 mt-2">
        <button @click="editGaleri(item)" class="btn btn-warning">Edit</button>
        <button @click="deleteGaleri(item.id)" class="btn btn-error">Hapus</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import Swal from 'sweetalert2';
  import { api, url } from '../../lib/url';
  
  const galeri = ref([]);
  const form = ref({
    id: null,
    judul: '',
    deskripsi: '',
    tanggal: '',
    foto: null,
  });
  const isEdit = ref(false);
  
  const getDataGaleri = async () => {
    const res = await axios.get(api + '/api/galeri');
    galeri.value = res.data;
  };
  
  const handleFileChange = (e) => {
    form.value.foto = e.target.files[0];
  };
  
  const submitForm = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('judul', form.value.judul);
    formData.append('deskripsi', form.value.deskripsi);
    formData.append('tanggal', form.value.tanggal);
    if (form.value.foto) formData.append('foto', form.value.foto);
  
    try {
      if (isEdit.value) {
        await axios.put(api + `/api/galeri/${form.value.id}`, formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data"
          }
        });
        Swal.fire('Berhasil!', 'Galeri berhasil diupdate', 'success');
      } else {
        await axios.post(api + '/api/galeri/create', formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data"
          }
        });
        Swal.fire('Berhasil!', 'Galeri berhasil ditambahkan', 'success');
      }
  
      resetForm();
      getDataGaleri();
    } catch (err) {
      Swal.fire('Gagal!', err.response?.data?.error || 'Terjadi kesalahan', 'error');
    }
  };
  
  const editGaleri = (item) => {
    form.value = {
      id: item.id,
      judul: item.judul,
      deskripsi: item.deskripsi,
      tanggal: item.tanggal,
      foto: null, // biar user upload ulang kalau mau
    };
    isEdit.value = true;
  };
  
  const deleteGaleri = async (id) => {
    const confirmResult = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });
  
    if (confirmResult.isConfirmed) {
      try {
        await axios.delete(api + `/api/galeri/${id}` , {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        });
        Swal.fire('Terhapus!', 'Galeri berhasil dihapus.', 'success');
        getDataGaleri();
      } catch (err) {
        Swal.fire('Gagal!', err.response?.data?.error || 'Terjadi kesalahan', 'error');
      }
    }
  };
  
  const resetForm = () => {
    form.value = {
      id: null,
      judul: '',
      deskripsi: '',
      tanggal: '',
      foto: null,
    };
    isEdit.value = false;
  };
  
  onMounted(getDataGaleri);
  </script>
  
  