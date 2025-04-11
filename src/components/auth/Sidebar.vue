<template>
    <!-- Tombol Toggle (bisa taruh di atas navbar atau di mana aja) -->
    <button @click="toggleSidebar" class="btn btn-primary fixed top-4 left-1 z-50">
        ☰
    </button>

    <!-- Sidebar -->
    <transition name="slide">
        <div v-if="isOpen" class="h-screen bg-base-200 w-64 p-4 fixed shadow-md flex flex-col z-40">
            <div class="flex flex-col items-center mb-6">
                <div class="w-20 h-20 rounded-full overflow-hidden shadow">
                    <img v-if="foto" :src="foto" :alt="nama" class="object-cover w-full h-full" />
                    <div v-else
                        class="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
                        No Image
                    </div>
                </div>
                <h2 class="mt-4 text-lg font-semibold text-center text-blue-700">
                    {{ nama }}
                </h2>
            </div>

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

const isOpen = ref(true); // bisa diubah ke false kalau default-nya tertutup

const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
};
</script>

<style scoped>
/* Tailwind-like slide transition */
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