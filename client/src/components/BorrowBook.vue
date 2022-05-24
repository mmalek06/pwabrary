<template>
    <div class="tooltip">
        <button :class="!book.isBorrowable ? 'blue-big disabled': 'blue-big'" @click="onClick(book)">
            Borrow this book (ISBN: {{ book.isbn }}, copies left: {{ book.stock }})
        </button>
        <span v-if="!book.isBorrowable" class="tooltiptext">This book is out of stock :(</span>
    </div>
    <Modal :open="isModalOpen" :closeButtonText="'Borrow book'" @close="onCloseModal">
        <Form :validation-schema="schema" class="book-form">
            <Field id="username" name="username" type="text" placeholder="Type in your name here..." v-model="userName" />
            <ErrorMessage name="username" class="error-message" />
        </Form>
    </Modal>
    <Modal :open="isErrorModalOpen" :closeButtonText="'Ok'" :infoModal="true" @close="onCloseModal">
        <span>There are no copies of this book left to borrow.</span>
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
    name: 'BorrowBook',
    components: { Modal, Field, Form, ErrorMessage },
    props: {
        book: {
            required: true,
            type: Object as PropType<BookVM>
        }
    },
    inheritAttrs: false,
    emits: ['bookBorrowed'],
    setup(props, { emit }) {
        const http = injectStrict(AxiosKey);
        const isModalOpen = ref(false);
        const isErrorModalOpen = ref(false);
        const userName = ref('');
        const schema = Yup.object().shape({
            username: Yup
                .string()
                .min(3, 'Your user name needs to be at least 3 characters long.')
                .required('Field user name is required.')
        });
        const onClick = (book: BookVM) => {
            if (!book.isBorrowable)
                return;

            isModalOpen.value = true;
        };
        const onCloseModal = async (isPerformingAction: boolean) => {
            isModalOpen.value = !isModalOpen.value;

            if (!isPerformingAction)
                return;

            try {
                const response = await http.post(`/library/borrow-book?isbn=${props.book.isbn}&user-name=${userName.value}`);

                emit('bookBorrowed', response);
            }
            catch (error) {
                isErrorModalOpen.value = !isErrorModalOpen.value;    
            }
        };

        return { 
            isModalOpen, 
            isErrorModalOpen, 
            userName, 
            schema,
            onClick,
            onCloseModal
        };
    }
});

</script>
