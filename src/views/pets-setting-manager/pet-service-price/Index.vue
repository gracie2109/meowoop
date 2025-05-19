<template>
    <div>
<!--         
        <PetServicePriceForm /> -->


        <div v-if="dataSelected.pets">
            <PetsList :data="dataSelected.pets" />
        </div>


        <div v-if="dataSelected.services">

            RENDER SERVICES LIST

        </div>

            
        

    </div>
</template>

<script setup lang="ts">
// import PetServicePriceForm from '@/views/pets-setting-manager/pet-service-price/components/PriceForm.vue'
import { useRoute } from 'vue-router';
import { type IPetServicerPriceParam } from "@/types/pet-type";
import { usePetServicePrice } from "@/stores"
import { onMounted, ref } from 'vue';
import PetsList from './components/PetsList.vue';
const route = useRoute()
const query = route.query as IPetServicerPriceParam
const dataSelected = ref({
    pet_data: null,
    service_data: null,
    pets: [],
    services: []
})
const $store = usePetServicePrice()

onMounted(() => {
    const a = $store.getData({
        ...query,
    });
    Object.assign(dataSelected.value, a)
})

defineOptions({ name: 'pet-service-price' })
</script>

<style scoped></style>