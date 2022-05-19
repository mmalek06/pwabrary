<template>
    <div class="app">
        <header>
            <h1>VUE Library</h1>
        </header>
        <div>
            <BookList />
        </div>
    </div>
    <!-- <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </nav>
    <router-view/> -->
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import BookList from './components/BooksList.vue';

export default defineComponent({
    name: 'App',
    components: { BookList }
});

</script>

<style scoped>

.app {
    max-width: 1080px;
    max-width: 960px;
    min-height: 80px;
    margin: 40px auto;
}

</style>
