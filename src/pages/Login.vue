<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500 px-4">
      <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <!-- Logo & Judul -->
        <div class="flex flex-col items-center mb-6">
          <img
            v-if="profilDesa.logo"
            :src="url + profilDesa.logo"
            alt="Logo Desa"
            class="w-20 h-20 object-contain rounded-full shadow-md mb-4"
          />
          <h2 class="text-2xl font-bold text-center text-blue-700">
            {{ profilDesa.namaDesa || 'Selamat Datang' }}
          </h2>
        </div>
  
        <!-- Form Login -->
        <form @submit.prevent="handleLogin">
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input v-model="form.email" type="email" placeholder="you@example.com" class="input input-bordered w-full" />
          </div>
  
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input v-model="form.password" type="password" placeholder="••••••••" class="input input-bordered w-full" />
          </div>
  
          <div class="form-control mb-4">
            <label class="cursor-pointer label">
              <span class="label-text">Ingat saya</span>
              <input type="checkbox" v-model="form.remember" class="checkbox checkbox-primary" />
            </label>
          </div>
  
          <button type="submit" class="btn btn-primary w-full">
            Login
          </button>
        </form>
  
        <!-- Link Daftar -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Belum punya akun?
            <router-link to="/register" class="text-blue-600 hover:underline">Daftar</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { api, url } from '../lib/url'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  let profilDesa = ref({
    namaDesa: "",
    logo: "",
  })
  
  const form = ref({
    email: '',
    password: '',
    remember: false,
  })
  
  const getData = async () => {
    const response = await axios.get(api + "/api/profil-desa")
    const desa = response.data
    if (desa.length > 0) {
      profilDesa.value.namaDesa = desa[0].namaDesa
      profilDesa.value.logo = desa[0].logo
    }
  }
  
  const handleLogin = async () => {
    try {
      const response = await axios.post(api + "/api/users/login", {
        email: form.value.email,
        password: form.value.password,
      })
  
      const token = response.data.data.token;
      console.log(token);
  
      // Simpan ke localStorage
      localStorage.setItem('token', token)
  
      // Arahkan ke dashboard/home setelah login sukses
      router.push('/dashboard')
    } catch (error) {
      alert('Login gagal: ' + (error.response?.data?.message || error.message))
    }
  }
  
  onMounted(() => {
    getData()
  })
  </script>
  