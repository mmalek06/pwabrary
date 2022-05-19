<template>
    <header class="book-title">
        <h2>{{ book.title }}</h2>
        <span :class="book.stock <= 0 ? 'tooltip' : ''">
            <button :class="book.stock <= 0 ? 'disabled': ''" @click="onButtonClick(book)">
                Borrow this book (ISBN: {{ book.isbn }}, copies left: {{ book.stock }})
            </button>
            <span v-if="book.stock <= 0" class="tooltiptext">This book is out of stock :(</span>
        </span>
    </header>
    <p class="authors">
        <span v-for="author in book.authors" :key="author.identifier">{{ author.name }}</span>
    </p>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import injectStrict from '@/infrastructure/injection';
import { AxiosKey } from '@/infrastructure/symbols';
import Book from '@/models/Book';

export default defineComponent({
    name: 'BookListElement',
    props: {
        book: {
            required: true,
            type: Object as PropType<Book>
        }
    },
    setup() {
        const http = injectStrict(AxiosKey);
        const onButtonClick = (book: Book) => {
            console.log(book);
            // if (book.stock <= 0) {

            // }
            // else {

            // }
        };

        return { onButtonClick };
    }
});

</script>

<style scoped>

header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: auto;
}

h2 {
    margin: 0 0 0px;
    text-transform: capitalize;
}

button {
    margin: 0;
    color: #1195c9;
    border: 3px solid #1195c9;
    background: #d5f0ff;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-family: RobotoMedium;
}

button.disabled {
    cursor: default !important;
    pointer-events: unset !important;
    color: #1195c9;
    border: none;
    padding: 11px 19px;
    opacity: .5;
}

.authors {
    margin: 10px 0;
    font-family: RobotoLight;
}

.authors span {
    text-transform: capitalize;
}

.authors span:not(:last-child):after {
    content: ", ";
}

.book-title button:hover:not(.disabled) {
    border: 3px solid #d5f0ff;
}

</style>
