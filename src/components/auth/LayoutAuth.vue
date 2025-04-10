<template>
    <div class="layout-container">
        <Sidebar :nama="user.nama" :foto="url + user.foto" />

        <main class="main-content">

            <router-view />
        </main>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api, url } from '../../lib/url'
import Sidebar from './Sidebar.vue'

const router = useRouter()
const token = localStorage.getItem('token')

const user = ref({
    nama: "",
    email: "",
    foto: "",
    token: "",
});


const getUser = async () => {
    const response = await axios.get(api + "/api/users/profile", {
        headers: {
            Authorization: `${token}`
        }
    })
    user.value = response.data.data
    console.log(response.data.data);
}

const cekToken = async () => {
    if (!token) {
        return router.push("/login")
    }

    try {
        const response = await axios.get(api + "/api/users/profile", {
            headers: {
                Authorization: `${token}`
            }
        })

        if (response.data.data.token !== token) {
            localStorage.removeItem('token')
            return router.push("/login")
        }

        user.value = response.data.data
    } catch (error) {
        console.error('Token tidak valid:', error)
        localStorage.removeItem('token')
        router.push("/login")
    }
}



onMounted(() => {
    cekToken();
    getUser();
})
</script>