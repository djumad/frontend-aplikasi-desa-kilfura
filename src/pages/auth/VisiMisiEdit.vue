<template>
    <div class="min-h-screen bg-base-100 p-4">
        <h2 class="text-4xl font-extrabold text-center text-primary mb-8">Edit Visi & Misi</h2>

        <form @submit.prevent="submitForm" class="card max-w-3xl mx-auto bg-white shadow-lg p-6 space-y-4">
            <div class="form-control">
                <label class="label">
                    <span class="label-text font-semibold">Judul</span>
                </label>
                <input type="text" v-model="visiMisi.judul" class="input input-bordered" placeholder="Masukkan judul"
                    required />
            </div>

            <div class="form-control">
                <label class="label">
                    <span class="label-text font-semibold">Deskripsi</span>
                </label>
                <textarea v-model="visiMisi.deskripsi" class="textarea textarea-bordered" rows="5"
                    placeholder="Masukkan deskripsi" required></textarea>
            </div>

            <div class="form-control">
                <label class="label">
                    <span class="label-text font-semibold">Foto (opsional)</span>
                </label>
                <input type="file" @change="handleFileChange" class="file-input file-input-bordered" />
                <div v-if="visiMisi.foto" class="mt-4">
                    <img :src="url + visiMisi.foto" :alt="visiMisi.judul" class="w-40 h-40 rounded object-cover" />
                </div>
            </div>

            <div class="form-control mt-6">
                <button type="submit" class="btn btn-primary" :disabled="loading">
                    {{ loading ? 'Menyimpan...' : 'Simpan Perubahan' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios'
import { api, url } from '../../lib/url'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const token = localStorage.getItem('token')

const visiMisi = ref({
    id: '',
    userId: '',
    judul: '',
    deskripsi: '',
    foto: ''
})

const selectedFile = ref(null)
const loading = ref(false)

const getDataVisiMisi = async () => {
    try {
        const response = await axios.get(api + '/api/visi-misi')
        visiMisi.value = response.data[0]
    } catch (err) {
        console.error('Gagal memuat data Visi Misi:', err)
    }
}

const handleFileChange = (e) => {
    selectedFile.value = e.target.files[0]
}

const submitForm = async () => {
    loading.value = true
    try {
        const formData = new FormData()
        formData.append('judul', visiMisi.value.judul)
        formData.append('deskripsi', visiMisi.value.deskripsi)
        if (selectedFile.value) {
            formData.append('foto', selectedFile.value)
        }

        await axios.put(`${api}/api/visi-misi/${visiMisi.value.id}`, formData, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        })

        alert('Data berhasil diperbarui!')
        router.push('/dashboard/visi-misi')
    } catch (error) {
        console.error('Gagal memperbarui data:', error)
        alert('Terjadi kesalahan saat menyimpan.')
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getDataVisiMisi()
})

</script>