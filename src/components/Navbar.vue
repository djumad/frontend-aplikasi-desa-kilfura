<template>
    <nav class="bg-blue-700 shadow-lg p-3 sticky top-0 z-50 rounded-b-2xl">
        <div class="max-w-6xl mx-auto px-4">
            <div class="flex justify-between">
                <div class="flex space-x-7">
                    <!-- Logo -->
                    <div class="flex items-center space-x-3">
                        <img v-if="responseData.logo" :src="url + responseData.logo" :alt="responseData.namaDesa"
                            class="w-10 h-10 object-cover rounded-full bg-white p-1" />
                        <router-link to="/" class="text-white font-bold text-lg hover:underline">
                            {{ responseData.namaDesa || 'Nama Desa' }}
                        </router-link>
                    </div>
                    <!-- Primary Nav -->
                    <div class="hidden md:flex items-center space-x-1">
                        <router-link to="/"
                            class="py-4 px-2 text-white font-semibold hover:underline underline-offset-1 transition duration-300"
                            :class="{ 'underline underline-offset-1': $route.path === '/' }">
                            Beranda
                        </router-link>

                        <!-- Dropdown Profile -->
                        <div class="relative group">
                            <button
                                class="py-4 px-2 text-white font-semibold hover:underline underline-offset-1 transition duration-300 flex items-center">
                                <span>Profile</span>
                            </button>
                            <div class="absolute z-10 hidden group-hover:block bg-white shadow-lg rounded-md mt-0 w-48">
                                <router-link to="/profil-desa" class="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                                    :class="{ 'bg-blue-100': $route.path === '/profil-desa' }">
                                    Profile Desa
                                </router-link>
                                <router-link to="/visi-misi" class="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                                    :class="{ 'bg-blue-100': $route.path === '/visi-misi' }">
                                    Visi dan Misi
                                </router-link>
                                <router-link to="/perangkat-desa"
                                    class="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                                    :class="{ 'bg-blue-100': $route.path === '/perangkat-desa' }">
                                    Perangkat Desa
                                </router-link>
                            </div>
                        </div>

                        <!-- Menu lainnya -->
                        <router-link to="/kontak"
                            class="py-4 px-2 text-white font-semibold hover:underline underline-offset-1 transition duration-300"
                            :class="{ 'underline underline-offset-1': $route.path === '/kontak' }">
                            Kontak
                        </router-link>
                        <router-link to="/galeri"
                            class="py-4 px-2 text-white font-semibold hover:underline underline-offset-1 transition duration-300"
                            :class="{ 'underline underline-offset-1': $route.path === '/galeri' }">
                            Galeri
                        </router-link>
                        <router-link to="/agenda"
                            class="py-4 px-2 text-white font-semibold hover:underline underline-offset-1 transition duration-300"
                            :class="{ 'underline underline-offset-1': $route.path === '/agenda' }">
                            Agenda
                        </router-link>
                        <router-link to="/pengumuman"
                            class="py-4 px-2 text-white font-semibold hover:underline underline-offset-1 transition duration-300"
                            :class="{ 'underline underline-offset-1': $route.path === '/pengumuman' }">
                            Pengumuman
                        </router-link>
                    </div>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden flex items-center">
                    <button @click="toggleMenu" class="outline-none mobile-menu-button">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div class="hidden mobile-menu md:hidden bg-blue-700 rounded-b-lg" :class="{ 'block': isMenuOpen }">
            <router-link to="/" class="block py-2 px-4 text-white hover:bg-blue-600"
                :class="{ 'bg-blue-600': $route.path === '/' }" @click="closeMenu">
                Beranda
            </router-link>
            <div class="relative">
                <button @click="toggleProfileMenu"
                    class="w-full text-left block py-2 px-4 text-white hover:bg-blue-600 flex justify-between items-center">
                    <span>Profile</span>
                    <svg class="w-4 h-4 transform transition-transform duration-200"
                        :class="{ 'rotate-180': isProfileMenuOpen }" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="bg-blue-800" v-show="isProfileMenuOpen">
                    <router-link to="/profil-desa" class="block py-2 px-6 text-white hover:bg-blue-600"
                        :class="{ 'bg-blue-600': $route.path === '/profil-desa' }" @click="closeMenu">
                        Profile Desa
                    </router-link>
                    <router-link to="/visi-misi" class="block py-2 px-6 text-white hover:bg-blue-600"
                        :class="{ 'bg-blue-600': $route.path === '/visi-misi' }" @click="closeMenu">
                        Visi dan Misi
                    </router-link>
                    <router-link to="/perangkat-desa" class="block py-2 px-6 text-white hover:bg-blue-600"
                        :class="{ 'bg-blue-600': $route.path === '/perangkat-desa' }" @click="closeMenu">
                        Perangkat Desa
                    </router-link>
                </div>
            </div>
            <router-link to="/kontak" class="block py-2 px-4 text-white hover:bg-blue-600"
                :class="{ 'bg-blue-600': $route.path === '/kontak' }" @click="closeMenu">
                Kontak
            </router-link>
            <router-link to="/galeri" class="block py-2 px-4 text-white hover:bg-blue-600"
                :class="{ 'bg-blue-600': $route.path === '/galeri' }" @click="closeMenu">
                Galeri
            </router-link>
            <router-link to="/agenda" class="block py-2 px-4 text-white hover:bg-blue-600"
                :class="{ 'bg-blue-600': $route.path === '/agenda' }" @click="closeMenu">
                Agenda
            </router-link>
            <router-link to="/pengumuman" class="block py-2 px-4 text-white hover:bg-blue-600"
                :class="{ 'bg-blue-600': $route.path === '/pengumuman' }" @click="closeMenu">
                Pengumuman
            </router-link>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios";
import { api, url } from '../lib/url';


const route = useRoute();
const isMenuOpen = ref(false);
const isProfileMenuOpen = ref(false);
let profilDesa = ref(null);
let responseData = ref({
    namaDesa: "",
    logo: ""
});
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const toggleProfileMenu = () => {
    isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
    isProfileMenuOpen.value = false;
};

const getProfilDesa = async () => {
    const response = await axios.get(api + "/api/profil-desa");
    profilDesa.value = response.data;
    const desaPertama = profilDesa.value[0];
    console.log(desaPertama.namaDesa);
    responseData.value.namaDesa = desaPertama.namaDesa;
    responseData.value.logo = desaPertama.logo;
}

onMounted(() => {
    getProfilDesa();
});

</script>

<style scoped>
.router-link-active {
    font-weight: bold;
}
</style>