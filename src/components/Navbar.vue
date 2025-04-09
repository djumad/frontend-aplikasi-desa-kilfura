<template>
    <nav class="bg-green-700 shadow-lg">
        <div class="max-w-6xl mx-auto px-4">
            <div class="flex justify-between">
                <div class="flex space-x-7">
                    <!-- Logo -->
                    <div>
                        <router-link to="/" class="flex items-center py-4 px-2">
                            <span class="font-semibold text-white text-lg">Desa Kita</span>
                        </router-link>
                    </div>
                    <!-- Primary Nav -->
                    <div class="hidden md:flex items-center space-x-1">
                        <router-link to="/"
                            class="py-4 px-2 text-white font-semibold hover:bg-green-600 transition duration-300"
                            :class="{ 'bg-green-600': $route.path === '/' }">
                            Beranda
                        </router-link>

                        <!-- Dropdown Profile -->
                        <div class="relative group">
                            <button
                                class="py-4 px-2 text-white font-semibold hover:bg-green-600 transition duration-300 flex items-center">
                                <span>Profile</span>
                                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div class="absolute z-10 hidden group-hover:block bg-white shadow-lg rounded-md mt-0 w-48">
                                <router-link to="/profil-desa" class="block px-4 py-2 text-gray-800 hover:bg-green-100"
                                    :class="{ 'bg-green-100': $route.path === '/profil-desa' }">
                                    Profile Desa
                                </router-link>
                                <router-link to="/visi-misi" class="block px-4 py-2 text-gray-800 hover:bg-green-100"
                                    :class="{ 'bg-green-100': $route.path === '/visi-misi' }">
                                    Visi dan Misi
                                </router-link>
                                <router-link to="/perangkat-desa"
                                    class="block px-4 py-2 text-gray-800 hover:bg-green-100"
                                    :class="{ 'bg-green-100': $route.path === '/perangkat-desa' }">
                                    Perangkat Desa
                                </router-link>
                            </div>
                        </div>

                        <!-- Menu lainnya -->
                        <router-link to="/kontak"
                            class="py-4 px-2 text-white font-semibold hover:bg-green-600 transition duration-300"
                            :class="{ 'bg-green-600': $route.path === '/kontak' }">
                            Kontak
                        </router-link>
                        <router-link to="/galeri"
                            class="py-4 px-2 text-white font-semibold hover:bg-green-600 transition duration-300"
                            :class="{ 'bg-green-600': $route.path === '/galeri' }">
                            Galeri
                        </router-link>
                        <router-link to="/agenda"
                            class="py-4 px-2 text-white font-semibold hover:bg-green-600 transition duration-300"
                            :class="{ 'bg-green-600': $route.path === '/agenda' }">
                            Agenda
                        </router-link>
                        <router-link to="/pengumuman"
                            class="py-4 px-2 text-white font-semibold hover:bg-green-600 transition duration-300"
                            :class="{ 'bg-green-600': $route.path === '/pengumuman' }">
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
        <div class="hidden mobile-menu md:hidden" :class="{ 'block': isMenuOpen }">
            <router-link to="/" class="block py-2 px-4 text-white hover:bg-green-600"
                :class="{ 'bg-green-600': $route.path === '/' }" @click="closeMenu">
                Beranda
            </router-link>
            <div class="relative">
                <button @click="toggleProfileMenu"
                    class="w-full text-left block py-2 px-4 text-white hover:bg-green-600 flex justify-between items-center">
                    <span>Profile</span>
                    <svg class="w-4 h-4 transform transition-transform duration-200"
                        :class="{ 'rotate-180': isProfileMenuOpen }" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="bg-green-800" v-show="isProfileMenuOpen">
                    <router-link to="/profil-desa" class="block py-2 px-6 text-white hover:bg-green-600"
                        :class="{ 'bg-green-600': $route.path === '/profil-desa' }" @click="closeMenu">
                        Profile Desa
                    </router-link>
                    <router-link to="/visi-misi" class="block py-2 px-6 text-white hover:bg-green-600"
                        :class="{ 'bg-green-600': $route.path === '/visi-misi' }" @click="closeMenu">
                        Visi dan Misi
                    </router-link>
                    <router-link to="/perangkat-desa" class="block py-2 px-6 text-white hover:bg-green-600"
                        :class="{ 'bg-green-600': $route.path === '/perangkat-desa' }" @click="closeMenu">
                        Perangkat Desa
                    </router-link>
                </div>
            </div>
            <router-link to="/kontak" class="block py-2 px-4 text-white hover:bg-green-600"
                :class="{ 'bg-green-600': $route.path === '/kontak' }" @click="closeMenu">
                Kontak
            </router-link>
            <router-link to="/galeri" class="block py-2 px-4 text-white hover:bg-green-600"
                :class="{ 'bg-green-600': $route.path === '/galeri' }" @click="closeMenu">
                Galeri
            </router-link>
            <router-link to="/agenda" class="block py-2 px-4 text-white hover:bg-green-600"
                :class="{ 'bg-green-600': $route.path === '/agenda' }" @click="closeMenu">
                Agenda
            </router-link>
            <router-link to="/pengumuman" class="block py-2 px-4 text-white hover:bg-green-600"
                :class="{ 'bg-green-600': $route.path === '/pengumuman' }" @click="closeMenu">
                Pengumuman
            </router-link>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isMenuOpen = ref(false);
const isProfileMenuOpen = ref(false);

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
</script>

<style scoped>
.router-link-active {
    font-weight: bold;
}
</style>