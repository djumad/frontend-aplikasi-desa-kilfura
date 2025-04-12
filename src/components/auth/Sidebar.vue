<template>
    <!-- Tombol Toggle -->
    <button @click="toggleSidebar" class="btn btn-primary fixed top-4 left-1 z-50">
      ☰
    </button>
  
    <!-- Sidebar -->
    <transition name="slide">
      <div
        v-if="isOpen"
        class="h-screen overflow-y-auto bg-base-200 w-64 p-4 fixed shadow-md flex flex-col z-40"
      >
        <!-- Foto & Nama -->
        <div class="flex flex-col items-center mb-6">
          <div class="w-20 h-20 rounded-full overflow-hidden shadow">
            <img
              v-if="foto"
              :src="foto"
              :alt="nama"
              class="object-cover w-full h-full"
            />
            <div
              v-else
              class="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm"
            >
              No Image
            </div>
          </div>
          <h2 class="mt-4 text-lg font-semibold text-center text-blue-700">
            {{ nama }}
          </h2>
        </div>
  
        <!-- Menu Navigasi -->
        <ul class="menu space-y-2">
          <li>
            <router-link to="/dashboard" class="btn btn-ghost justify-start w-full">
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/visi-misi" class="btn btn-ghost justify-start w-full">
              Visi Misi Desa
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/agenda" class="btn btn-ghost justify-start w-full">
              Agenda Desa
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/galeri" class="btn btn-ghost justify-start w-full">
              Galeri Desa
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/lembaga" class="btn btn-ghost justify-start w-full">
              Lembaga Desa
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/pengumuman" class="btn btn-ghost justify-start w-full">
              Pengumuman Desa
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/perangkat-desa" class="btn btn-ghost justify-start w-full">
              Perangkat Desa
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/produk-unggulan" class="btn btn-ghost justify-start w-full">
              Produk Unggulan Desa
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/potensi-desa" class="btn btn-ghost justify-start w-full">
              Potensi Desa
            </router-link>
          </li>
          <li>
            <router-link to="/settings" class="btn btn-ghost justify-start w-full">
              Pengaturan
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Props dari parent
  defineProps({
    nama: {
      type: String,
      required: true,
    },
    foto: {
      type: String,
      default: "",
    },
  });
  
  const isOpen = ref(false); // default tertutup
  
  const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
  };
  </script>
  
  <style scoped>
  /* Slide animation */
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }
  
  .slide-enter-from {
    transform: translateX(-100%);
  }
  .slide-enter-to {
    transform: translateX(0%);
  }
  .slide-leave-from {
    transform: translateX(0%);
  }
  .slide-leave-to {
    transform: translateX(-100%);
  }
  </style>
  