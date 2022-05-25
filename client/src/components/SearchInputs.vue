<template>
    <header>
        <input type="text" placeholder="Type in the name of the book you'd like to borrow" v-debounce:400ms="onBookNameKeyup" />
        <span>or</span>
        <input type="text" placeholder="Type in the name of the author of interest" v-debounce:400ms="onAuthorNameKeyup" />
    </header>    
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SearchInputs',
    emits: ['bookNameSearchRequested', 'authorNameSearchRequested'],
    setup(_, { emit }) {
        const onBookNameKeyup = (name: string) => {
            emit('bookNameSearchRequested', name);
        };
        const onAuthorNameKeyup = (name: string) => {
            emit('authorNameSearchRequested', name);
        };

        return {
            onBookNameKeyup,
            onAuthorNameKeyup
        }
    }
});

</script>

<style scoped>

input, span {
    margin-right: 10px;
}

</style>
