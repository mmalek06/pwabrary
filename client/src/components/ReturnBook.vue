<template>
    <div class="return-book">
        <button class="green-big" @click="onClick(book)">Return this book</button>
    </div>
    <Modal :open="isModalOpen" :closeButtonText="'Return book'" @close="onCloseModal">
        <Form :validation-schema="schema" class="book-form">
            <Field id="username" name="username" type="text" placeholder="Type in your name here..." v-model="userName" />
            <ErrorMessage name="username" class="error-message" />
        </Form>
    </Modal>
    <Modal :open="isErrorModalOpen" :closeButtonText="'Ok'" :infoModal="true" @close="onCloseModal">
        <span>This book has not been borrowed by .</span>
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
    name: 'ReturnBook',
    components: { Modal, Field, Form, ErrorMessage },
    props: {
        book: {
            required: true,
            type: Object as PropType<BookVM>
        }
    },
    inheritAttrs: false,
    emits: ['bookReturned'],
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
            isModalOpen.value = true;
        };
        const onCloseModal = async (isPerformingAction: boolean) => {
            isModalOpen.value = !isModalOpen.value;

            if (!isPerformingAction)
                return;

            try {
                const response = await http.post(`/library/return-book?isbn=${props.book.isbn}&user-name=${userName.value}`);

                emit('bookReturned', response);
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

<style scoped>

.return-book {
    margin-top: 5px;
}

.return-book button {
    width: 100%;
}

</style>
