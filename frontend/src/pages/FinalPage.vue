<template>
    <div>
        <div class="shadow-2xl flex flex-col items-center justify-center h-screen">
            <h1 class="text-[50px]">Ordered Successfully</h1>
            <router-link :to="{ name : 'ProductPage', params:{userInfo: props.userInfo} }">
                <button class="w-40 bg-gray-900 white-text rounded">Back</button>
            </router-link>
        </div>    
    </div>
</template>
<script setup>

const props=defineProps({
    userInfo:{
        type: String,
        required: true,
    }
})
</script>
<style>
.white-text {
    color: white;
}
</style>  