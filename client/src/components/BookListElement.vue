<template>
    <header class="book-title">
        <h2>{{ book.title }}</h2>
        <span class="tooltip">
            <button :class="!book.isBorrowable ? 'blue-big disabled': 'blue-big'" @click="onButtonClick(book)">
                Borrow this book (ISBN: {{ book.isbn }}, copies left: {{ book.stock }})
            </button>
            <span v-if="!book.isBorrowable" class="tooltiptext">This book is out of stock :(</span>
        </span>
    </header>
    <p class="authors">
        <span v-for="author in book.authors" :key="author.identifier">{{ author.name }}</span>
    </p>
    <Modal :open="isModalOpen" :closeButtonText="'Borrow book'" @close="onClose">
        <Form :validation-schema="schema" class="borrow-book-form">
            <Field id="username" name="username" type="text" placeholder="Type in your name here..." v-model="userName" />
            <ErrorMessage name="username" class="error-message" />
        </Form>
    </Modal>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';

import Modal from '@/components/LibraryModal.vue';
import injectStrict from '@/infrastructure/injection';
import { AxiosKey } from '@/infrastructure/symbols';
import BookVM from '@/viewmodels/BookVM';

export default defineComponent({
    name: 'BookListElement',
    components: { Modal, Field, Form, ErrorMessage },
    props: {
        book: {
            required: true,
            type: Object as PropType<BookVM>
        }
    },
    setup(props) {
        const http = injectStrict(AxiosKey);
        const isModalOpen = ref(false);
        const userName = ref('');
        const schema = Yup.object().shape({
            username: Yup
                .string()
                .min(3, 'Your user name needs to be at least 3 characters long.')
                .required('Field user name is required.')
        });
        const onButtonClick = (book: BookVM) => {
            if (!book.isBorrowable)
                return;

            isModalOpen.value = true;
        };
        const onClose = async (isPerformingAction: boolean) => {
            isModalOpen.value = !isModalOpen.value;

            if (!isPerformingAction)
                return;

            const response = await http.post(`/library/borrow-book?isbn=${props.book.isbn}&user-name=${userName.value}`);

            console.log(response.data);
        };

        return { isModalOpen, userName, schema, onButtonClick, onClose };
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

.borrow-book-form input {
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: groove;
    background-color: #eee;
    outline: none;
    width: 305px;
    padding: 8px 16px;
}

input + span {
    display: block;
}

.borrow-book-form .error-message {
    width: 305px;
    padding-top: 10px;
}

</style>
