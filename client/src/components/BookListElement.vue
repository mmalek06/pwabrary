<template>
    <header class="book-title">
        <h2>{{ book.title }}</h2>
        <button>Borrow this book (ISBN: {{ book.isbn }})</button>
    </header>
    <p class="authors">
        <span v-for="author in book.authors" :key="author.identifier">{{ author.name }}</span>
    </p>
</template>

<script lang="ts">

import Book from '@/models/Book';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'BookListElement',
    props: {
        book: {
            required: true,
            type: Object as PropType<Book>
        }
    }
});

</script>

<style scoped>

h2 {
    margin: 0 0 0px;
    text-transform: capitalize;
}

header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: auto;
}

button {
    margin: 0;
    color: #1195c9;
    border: 3px solid #1195c9;
    background: #d5f0ff;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

.authors {
    margin: 10px 0;
}

.authors span {
    text-transform: capitalize;
}

.authors span:not(:last-child):after {
    content: ", ";
}

.book-title button:hover {
    border: 3px solid #d5f0ff;
}

</style>
