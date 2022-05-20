<template>
    <Transition name="fade" mode="out-in">
        <div class="modal" v-show="open" @click.self="close(false)">
            <Transition name="drop-in">
                <div class="modal-content" v-show="open">
                    <slot />
                    <button class="blue-big" type="button" @click="close(true)">{{ closeButtonText }}</button>
                    <button class="blue-big" type="button" @click="close(false)">Cancel</button>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        open: {
            type: Boolean,
            default: true,
        },
        closeButtonText: {
            type: String,
            required: false,
            default: 'Close'
        }
    },
    setup(_, { emit }) {
        const close = (isPerformingAction: boolean) => {
            emit('close', isPerformingAction);
        };

        return { close };
    }
});

</script>

<style scoped>

*,
::before,
::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
}

.modal-content {
    margin: 0 auto;
    margin-top: 100px;
    position: relative;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-clip: padding-box;
    border-radius: 0.3rem;
    padding: 1rem;
    display: flex;
    width: fit-content;
}

.modal-content button {
    margin-left: 15px;
}

</style>
