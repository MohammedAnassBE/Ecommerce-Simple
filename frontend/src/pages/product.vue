<template>
    <div class="flex flex-row items-center justify-center h-screen">
        <div class="shadow-2xl flex flex-col w-[500px] items-center justify-center h-screen">
            <div class="p-2 flex flex-col items-center">
                <h1 class="text-[40px] font-bold">{{productDoc.product_name}}</h1>
                <img class="w-[400px] h-[400px] mt-2" :src="productDoc.picture" alt="">
                <h1 class="text-lg mt-4 text-blue-600">{{productDoc.specification}}</h1>
                <h2 class="text-lg mt-4 text-gray-500">{{ productDoc.offer_percent }}% offer ₹{{ productDoc.price }}</h2>
            </div>  
            <div class="flex flex-row justify-between">
                <div>
                    <router-link :to="{ name: 'ProductPage', params: { userInfo: props.userName }}">
                        <button class="w-40 h-10 bg-gray-900 text-white mt-4 p-2 rounded">Back</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="shadow-2xl flex flex-col items-center w-[500px] justify-center h-screen">
            <h1 class="text-[40px] font-bold">Place Your Order</h1>
            <div class="p-2 flex flex-col items-center">
                <form @submit.prevent="submitForm">
                    <table>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" placeholder="Your Name" v-model="orderDetails.Name" required> </td>
                        </tr>
                        <tr>
                            <td>Mail ID</td>
                            <td><input type="text" placeholder="Your Mail ID" v-model="orderDetails.mail_id" required> </td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td><input type="number" placeholder="Your Phone Number" v-model="orderDetails.Phone_No" required> </td>
                        </tr>
                        <tr>
                            <td>Quantity</td>
                            <td>
                                <select type='number' id="quantity" v-model="orderDetails.Quantity" required>
                                    <option class="w-40" v-for="num in 10" :key="num" :value="num">{{ num }}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-[25px]">Address</td>
                        </tr>
                        <tr>
                            <td>Street Address:</td>
                            <td><input type="text" id="street" name="street" placeholder="Enter your street address" required v-model="orderDetails.street_address"></td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td><input type="text" id="city" name="city" placeholder="Enter your city" required  v-model="orderDetails.city"></td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td><input type="text" id="state" name="state" placeholder="Enter your state" required  v-model="orderDetails.state"></td>
                        </tr>
                        <tr>
                            <td>Postal Code</td>
                            <td><input type="number" id="postal" name="postal" placeholder="Enter your postal code" required  v-model="orderDetails.postal_code"></td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td><input type="text" id="country" name="country" placeholder="Enter your country" required  v-model="orderDetails.country"></td>
                        </tr>
                        <tr>
                            <td>
                                <router-link v-if="check" :to="{name : 'FinalPage', params:{userInfo: props.userName}}">
                                    <button @click="just()" class="w-40 h-10 bg-gray-900 text-white mt-4 p-2 rounded">Order</button>
                                </router-link>
                                <button v-else @click="find" class="w-40 h-10 bg-gray-900 text-white mt-4 p-2 rounded">Order</button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>    
    </div>
</template>
<script setup>
import {ref, computed, reactive} from 'vue';
import { createDocumentResource, createListResource } from 'frappe-ui';

const values=false;
const n="123";
const props=defineProps({
    productName:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    },
})
const product = createDocumentResource({
    doctype: 'Products',
    name: props.productName,
    fields: ['name','product_name','specification','category','price','stock','picture','offer_percent'],
    auto: true,
})
const productDoc=computed(()=>product.doc);
const orderDetails = ref({
    Name : '',
    Phone_No : 0,
    mail_id: '',
    Quantity: 1,
    street_address:'',
    city: '',
    state: '',
    postal_code: 0,
    country: '',
})
function submitForm() {
    console.log('Form submitted:', orderDetails.value);
}
const check = computed(() => {
    return orderDetails.value.Name.trim() !== '' 
        && orderDetails.value.mail_id.trim() !== '' && orderDetails.value.street_address.trim() !== ''
        && orderDetails.value.city.trim() !== '' && orderDetails.value.state.trim() !== ''
        && orderDetails.value.country.trim() !== '';
});
const orderBooking = createListResource({
    doctype: 'Order List',
    insert:{},
})
function just(){
    orderBooking.insert.submit({
        ordered_item:props.productName,
        customer_name:props.userId,
        phone_no:orderDetails.value.Phone_No,
        mail_id:orderDetails.value.mail_id,
        quantity:orderDetails.value.Quantity,
        street_address:orderDetails.value.street_address,
        city:orderDetails.value.city,
        state:orderDetails.value.state,
        postal_code:orderDetails.value.postal_code,
        country:orderDetails.value.country,
    });
}
function find(){
    alert("Some details are incorrect or not filled");
}
</script>
