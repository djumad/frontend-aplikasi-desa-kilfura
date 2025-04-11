<template>
  <section class="max-w-4xl mx-auto px-4">
    <h2 class="text-4xl font-extrabold text-center text-primary mb-8">Agenda</h2>

    <!-- List Agenda -->
    <div class="grid gap-4 mb-8">
      <div v-for="item in agendaList" :key="item.id" class="card bg-base-100 shadow-md border">
        <div class="card-body">
          <h3 class="card-title text-lg text-primary">{{ item.judul }}</h3>
          <p><strong>Lokasi:</strong> {{ item.lokasi }}</p>
          <p><strong>Tanggal:</strong> {{ item.tanggal }}</p>
          <div class="mt-4 flex justify-end space-x-2">
            <button @click="editAgenda(item)" class="btn btn-sm btn-warning">Edit</button>
            <button @click="deleteAgenda(item.id)" class="btn btn-sm btn-error">Hapus</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Tambah/Update Agenda -->
    <form @submit.prevent="handleDataAgenda" class="card bg-base-100 shadow-md p-6 space-y-4">
      <h3 class="text-2xl font-bold text-primary mb-4">
        {{ isEdit ? "Edit Agenda" : "Tambah Agenda" }}
      </h3>

      <div class="form-control">
        <label class="label font-semibold">Judul</label>
        <input v-model="agenda.judul" type="text" class="input input-bordered" required />
      </div>

      <div class="form-control">
        <label class="label font-semibold">Lokasi</label>
        <input v-model="agenda.lokasi" type="text" class="input input-bordered" required />
      </div>

      <div class="form-control">
        <label class="label font-semibold">Deskripsi</label>
        <div ref="quillEditor" class="h-64"></div>
      </div>

      <div class="form-control">
        <label class="label font-semibold">Tanggal</label>
        <input v-model="agenda.tanggal" type="date" class="input input-bordered" required />
      </div>

      <button type="submit" class="btn btn-primary w-full">
        {{ isEdit ? "Perbarui Agenda" : "Simpan Agenda" }}
      </button>

      <button v-if="isEdit" @click="cancelEdit" type="button" class="btn btn-secondary w-full">
        Batal Edit
      </button>
    </form>
  </section>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import Quill from "quill";
import Swal from "sweetalert2";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import "sweetalert2/dist/sweetalert2.min.css";

import { api } from "../../lib/url";

const agenda = ref({
  judul: "",
  lokasi: "",
  deskripsi: "",
  tanggal: "",
});

const isEdit = ref(false);
const editingId = ref(null);
const agendaList = ref([]);
const quillEditor = ref(null);
let quill = null;

const token = localStorage.getItem("token");

const initializeQuill = () => {
  quill = new Quill(quillEditor.value, {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "clean"],
      ],
    },
    theme: "snow",
    placeholder: "Tulis deskripsi agenda di sini...",
  });

  quill.on("text-change", () => {
    agenda.value.deskripsi = quill.root.innerHTML;
  });
};

const getAgenda = async () => {
  const response = await axios.get(`${api}/api/agenda`);
  agendaList.value = response.data;
};

const handleDataAgenda = async () => {
  try {
    if (isEdit.value) {
      // UPDATE
      const response = await axios.put(
        `${api}/api/agenda/${editingId.value}`,
        {
          ...agenda.value,
        },
        {
          headers: { Authorization: token },
        }
      );
      Swal.fire("Sukses", "Agenda berhasil diperbarui", "success");
    } else {
      // CREATE
      const response = await axios.post(
        `${api}/api/agenda/create`,
        {
          ...agenda.value,
        },
        {
          headers: { Authorization: token },
        }
      );
      Swal.fire("Sukses", "Agenda berhasil ditambahkan", "success");
    }

    resetForm();
    getAgenda();
  } catch (error) {
    console.error("Error:", error);
    Swal.fire("Gagal", "Terjadi kesalahan", "error");
  }
};

const editAgenda = (item) => {
  agenda.value = {
    judul: item.judul,
    lokasi: item.lokasi,
    deskripsi: item.deskripsi,
    tanggal: item.tanggal,
  };
  quill.root.innerHTML = item.deskripsi;
  isEdit.value = true;
  editingId.value = item.id;
};

const cancelEdit = () => {
  resetForm();
};

const deleteAgenda = async (id) => {
  const result = await Swal.fire({
    title: "Yakin ingin menghapus?",
    text: "Data tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${api}/api/agenda/${id}`, {
        headers: { Authorization: token },
      });
      Swal.fire("Terhapus!", "Agenda berhasil dihapus.", "success");
      getAgenda();
    } catch (error) {
      console.error("Error deleting agenda:", error);
      Swal.fire("Gagal", "Tidak bisa menghapus agenda", "error");
    }
  }
};

const resetForm = () => {
  agenda.value = { judul: "", lokasi: "", deskripsi: "", tanggal: "" };
  quill.root.innerHTML = "";
  isEdit.value = false;
  editingId.value = null;
};

onMounted(() => {
  getAgenda();
  initializeQuill();
});
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