<template>
    <div class="c_header">
        <div class="c_menu">
            <Menu />
            <ExtraMenu />
        </div>
    </div>
</template>

<script setup lang="ts">
import Menu from './Menu.vue';
import ExtraMenu from './ExtraMenu.vue';

defineOptions({ name: 'clientHeader' })
</script>

<style scoped>
    .c_header{
        height: 50px;
    }
</style>