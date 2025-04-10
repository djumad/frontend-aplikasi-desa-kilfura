<template>
  <section class="bg-blue-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div class="md:flex md:items-center md:justify-between">
        <div class="md:w-1/2">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block">Build amazing</span>
            <span class="block text-indigo-600">Vue applications</span>
          </h1>
          <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl">
            Quickly build your next project with our Vue components and Tailwind CSS. Focus on your business logic
            instead of UI design.
          </p>
          <div class="mt-5 sm:mt-8 sm:flex sm:justify-start">
            <div class="rounded-md shadow">
              <a href="#"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Get started
              </a>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-3">
              <a href="#"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                Live demo
              </a>
            </div>
          </div>
        </div>
        <div class="mt-12 md:mt-0 md:w-1/2">
          <!-- Fixed the src binding here -->
          <img class="w-full rounded-lg shadow-xl" :src="desaKilfura" alt="Desa Kilfura">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import desaKilfura from "../../assets/desa-kilfura.jpeg";
</script>