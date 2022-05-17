<template>
    <div>
        {{book}}
    </div>
</template>

<script lang="ts">

import Book from '@/models/Book';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'BookListElement',
    props: {
        book: {
            required: true,
            type: {} as PropType<Book>
        }
    }
});

</script>
