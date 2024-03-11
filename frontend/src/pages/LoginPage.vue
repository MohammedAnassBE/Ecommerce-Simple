<template>
    <div>
        <div class="shadow-2xl flex flex-col items-center justify-center h-screen">
            <div>
                <h1 class="text-[25px] font-bold" >Login to your page</h1>
            </div>
            <div class="mt-5" >
                <form>
                    <table>
                        <tr>
                            <td>Username</td>
                            <td><input type="text" placeholder="Enter your username" required v-model="loginDetails.user"></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type="password" placeholder="Enter your password" required v-model="loginDetails.password"></td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="mt-3 p-2">
                <!-- <router-link :to="{ name : 'ProductPage', params:{userInfo: 'SomeInfo'} }"> -->
                    <button @click="check" class="w-40 bg-gray-900 white-text rounded">Login</button>
                <!-- </router-link> -->
                <router-link :to="{name : 'RegisterPage', params:{register: 'newUser'} }">
                    <button class="w-40 bg-gray-900 white-text rounded">Register</button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, computed } from 'vue';
import { createListResource } from 'frappe-ui';
import { useRouter } from 'vue-router';

const loginDetails = reactive({
    user: '',
    password: ''
});

const userList = createListResource({
    doctype: 'User Accounts',
    fields: ['name', 'username', 'password'],
    auto: true,
});

const router = useRouter();

// const check = computed(() => {
function check(){    
    for (const user of userList.data) {
        if (user.username === loginDetails.user.trim() && user.password === loginDetails.password.trim()) {
            router.push({ name: 'ProductPage', params: { userInfo: user.username }, query:{userId:user.name} });
            return;
        }
    }
    alert("User not found");
};
</script>
<style>
.white-text {
    color: white;
}
</style>  
