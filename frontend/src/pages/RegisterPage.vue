<template>
    <div>
        <div class="shadow-2xl flex flex-col items-center justify-center h-screen">
            <div>
                <h1 class="text-[30px] font-bold"> Register your account </h1>
            </div>
            <div class="mt-5" >
                <form>
                    <table>
                        <tr>
                            <td>UserName</td>
                            <td><input type="text" placeholder="Enter your username" required v-model="RegisterDetails.user"></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type="password" placeholder="Enter your password" required v-model="RegisterDetails.password"></td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="mt-3 p-2">
                <router-link :to="'/'">
                    <button class="w-40 bg-gray-900 white-text rounded">Login</button>
                </router-link>
                <button @click="register()" class="w-40 bg-gray-900 white-text rounded">Register</button>
            </div>
        </div>
    </div>
</template>
<script setup>

import {ref, computed, reactive} from 'vue';
import { createDocumentResource, createListResource } from 'frappe-ui';

const RegisterDetails = reactive({
    user: '',
    password: '',
})
const userList = createListResource({
    doctype: 'User Accounts',
    fields: ['name','username','password'],
    auto: true,
    insert:{},
});
function register(){
    for (const users of userList.data){
        if(users.username === RegisterDetails.user){
            alert("User already exists");
            return;
        }
    }
    userList.insert.submit({
        username:RegisterDetails.user,
        password:RegisterDetails.password,
    })
    alert("Account created as "+ RegisterDetails.user);
}
</script>