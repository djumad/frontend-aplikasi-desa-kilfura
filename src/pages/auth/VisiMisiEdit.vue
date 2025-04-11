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
                <div ref="quillEditor" class="h-64"></div>
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
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

const router = useRouter()
const token = localStorage.getItem('token')
const quillEditor = ref(null)
let quill = null

const visiMisi = ref({
    id: '',
    userId: '',
    judul: '',
    deskripsi: '',
    foto: ''
})

const selectedFile = ref(null)
const loading = ref(false)

const initializeQuill = () => {
    quill = new Quill(quillEditor.value, {
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, 4, false] }],
                ['bold', 'italic', 'underline', 'link'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['clean']
            ],
        },
        theme: 'snow',
        placeholder: 'Tulis deskripsi visi & misi di sini...'
    })

    // Set initial content if data exists
    if (visiMisi.value.deskripsi) {
        quill.root.innerHTML = visiMisi.value.deskripsi
    }

    // Update v-model when editor content changes
    quill.on('text-change', () => {
        visiMisi.value.deskripsi = quill.root.innerHTML
    })
}

const getDataVisiMisi = async () => {
    try {
        const response = await axios.get(api + '/api/visi-misi')
        visiMisi.value = response.data[0]
        
        // Initialize Quill after data is loaded
        if (quill && visiMisi.value.deskripsi) {
            quill.root.innerHTML = visiMisi.value.deskripsi
        }
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
    initializeQuill()
    getDataVisiMisi()
})
</script>

<style>
.ql-editor {
    min-height: 200px;
    font-size: 16px;
    font-family: inherit;
}

.ql-container {
    border: 1px solid #d1d5db !important;
    border-radius: 0.375rem;
}

.ql-toolbar {
    border: 1px solid #d1d5db !important;
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
    background-color: #f9fafb;
}
</style>