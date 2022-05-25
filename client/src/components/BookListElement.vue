<template>
    <div class="book-row">
        <div>
            <h2>{{ book.title }}</h2>
            <p class="authors">
                <span v-for="author in book.authors" :key="author.identifier">{{ author.name }}</span>
            </p>
        </div>
        <div>
            <BorrowBook :book="book" v-bind="$attrs" />
            <ReturnBook :book="book" v-bind="$attrs" />
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import BorrowBook from '@/components/BorrowBook.vue';
import ReturnBook from '@/components/ReturnBook.vue';
import BookVM from '@/viewmodels/BookVM';

export default defineComponent({
    name: 'BookListElement',
    components: { BorrowBook, ReturnBook },
    inheritAttrs: false,
    props: {
        book: {
            required: true,
            type: Object as PropType<BookVM>
        }
    }
});

</script>

<style>

.book-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: auto;
}

h2 {
    margin: 0 0 0px;
    text-transform: capitalize;
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

form input + span {
    display: block;
}

.book-form .error-message {
    width: 305px;
    padding-top: 10px;
}

</style>
