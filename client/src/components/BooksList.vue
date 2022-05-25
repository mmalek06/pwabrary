<template>
    <SearchInputs 
        @bookNameSearchRequested="onBookNameSearchRequested" 
        @authorNameSearchRequested="onAuthorNameSearchRequested" />
    <div class="book-list">
        <Transition name="switch" mode="out-in">
            <div class="lds-dual-ring" v-if="isLoading"></div>
            <div class="books-wrapper" v-else>
                <TransitionGroup appear>
                    <ul :key="'list'" v-if="hasBooksMatchingSearchCriteria">
                        <li v-for="book in books" :key="book.isbn">
                            <BookListElement 
                                :book="book" 
                                @bookBorrowed="onBookReturnedOrBorrowed" 
                                @bookReturned="onBookReturnedOrBorrowed" />
                        </li>
                    </ul>
                    <p v-if="!hasBooksMatchingSearchCriteria">
                        No books match chosen search criteria.
                    </p>
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
import SearchInputs from './SearchInputs.vue';
import { AxiosResponse } from 'axios';

export default defineComponent({
    name: 'BookList',
    components: { BookListElement, SearchInputs },
    setup() {
        const books = ref<BookVM[]>([]);
        const isLoading = ref(true);
        const hasBooksMatchingSearchCriteria = ref(true);
        const http = injectStrict(AxiosKey);
        const getBooks = () => http.get<Book[]>('/library/list-stock');
        const mapBooks = (response: AxiosResponse<Book[], any>) => response.data.map(b => new BookVM(b));
        const findBooks = async (url: string) => {
            isLoading.value = true;

            try {
                const response = await http.get<Book[]>(url);

                books.value = mapBooks(response);
                hasBooksMatchingSearchCriteria.value = true;
            }
            catch (error) {
                hasBooksMatchingSearchCriteria.value = false;
            }

            isLoading.value = false;
        };
        const onBookReturnedOrBorrowed = async (book: Book) => {
            isLoading.value = true;

            const response = await getBooks();

            books.value = mapBooks(response);
            isLoading.value = false;
        };
        const onBookNameSearchRequested = (name: string) => findBooks(name.length > 0 ? `library/find-book?book-title=${name}` : '/library/list-stock');
        const onAuthorNameSearchRequested = (name: string) => findBooks(name.length > 0 ? `library/author-books?author-name=${name}` : '/library/list-stock');

        getBooks()
            .then(response => {
                isLoading.value = false;
                books.value = mapBooks(response);
            });

        return { 
            books, 
            isLoading,
            hasBooksMatchingSearchCriteria,
            onBookReturnedOrBorrowed,
            onBookNameSearchRequested,
            onAuthorNameSearchRequested
        };
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
