<template>
    <div class="book-list">
        <Transition name="switch" mode="out-in">
            <div class="lds-dual-ring" v-if="isLoading"></div>
            <div class="books-wrapper" v-else>
                <TransitionGroup tag="ul" appear>
                    <li v-for="book in books" :key="book.isbn">
                        <BookListElement :book="book" />
                    </li>
                </TransitionGroup>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';

import { AxiosKey } from '@/infrastructure/symbols';
import injectStrict from '@/infrastructure/injection';
import BookVM from '@/viewmodels/BookVM';
import Book from '@/models/Book';
import BookListElement from './BookListElement.vue';

export default defineComponent({
    name: 'BookList',
    components: { BookListElement },
    setup() {
        const books = ref<BookVM[]>([]);
        const isLoading = ref(true);
        const http = injectStrict(AxiosKey);
        
        http
            .get<Book[]>('/library/list-stock')
            .then(response => {
                isLoading.value = false;
                books.value = response.data.map(b => new BookVM(b));
            });

        return { books, isLoading };
    }
});

</script>

<style scoped>

.lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.book-list {
    display: grid;
    place-items: baseline center;
    grid-template-areas: "inner-div";
}

.books-wrapper {
    width: 100%;
}

.book-list > * {
    grid-area: inner-div;
}

.book-list ul {
    padding: 0;
}

.book-list li {
    list-style-type: none;
    background: white;
    padding: 16px;
    margin: 16px 0;
    border-radius: 4px;
}

</style>
