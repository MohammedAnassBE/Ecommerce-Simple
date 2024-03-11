<template>
    <div>
        <div class="p-7 flex items-center">
            <input type="text" class="rounded h-10 w-[1600px]" placeholder="Search" v-model.lazy="searchItem">
            <Button class="bg-blue-400 text-white w-[200px] h-[35px]" @click="search=1">Search</Button>    
        </div>
        <div class="p-7">
            <h2 class="text-[40px]">Products</h2>
            <div class="grid grid-cols-4 gap-4">
                <template v-for="product in filteredProducts" :key="product.name">
                    <router-link :to="{name : 'product' ,params:{ productName : product.name}, query:{userName: props.userInfo,userId: props.userId} }">
                        <div class="p-2  flex flex-col items-center" @mouseover="selectedProduct = product" @mouseleave="selectedProduct = null" 
                            :class="{ 'shadow-outline': selectedProduct === product }">
                            <h2 class="text-20">{{ product.product_name }}</h2>
                            <img class="w-64 h-64 mt-2" :src="product.picture" alt="">
                            <h2 class="text-sm mt-2 text-blue-600">{{ product.specification }}</h2>
                            <h2 class="mt-2 text-gray-500">{{ product.offer_percent }}% offer ₹{{ product.price }}</h2>
                        </div>
                    </router-link>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref ,computed} from 'vue';
import { createListResource } from 'frappe-ui';

const selectedProduct=ref('');
const searchItem=ref('');
const search=ref(0);
const item=ref('');
const productDetails = createListResource({
    doctype: 'Products',
    fields: ['name','product_name','specification','category','price','stock','picture','offer_percent'],
    auto: true,
})
const props=defineProps({
    userInfo:{
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    }
})
const filteredProducts = computed(() => {
    const searchValue = searchItem.value.trim().toUpperCase(); // Trim and convert to uppercase
    if(search.value === 1 && searchValue !== '') {
        return productDetails.data.filter(product => 
            product.category.toUpperCase().includes(searchValue) || 
            product.product_name.toUpperCase().includes(searchValue) ||
            product.category.toUpperCase() === searchValue ||
            product.specification.toUpperCase().includes(searchValue)
        );
    }
    return productDetails.data;
});
function check(){
    console.log(searchItem.value);
}
</script> 
<style scoped>
.shadow-outline {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
</style>



