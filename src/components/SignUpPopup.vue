<template>
    <div v-if="isOpen" class="backdrop" @click="close">
        <div class="popup">
            <div class="popupContent" @click.stop>
                <!-- <h1>Name</h1>
                <input 
                    class="input__field"
                    id="name"
                    v-model.trim="name"
                    :class="{ invalid: (v$.name.$invalid && !v$.name.required.$invalid) }"
                    >
                <small class="error__email" v-if="v$.name.$invalid && !v$.name.required.$invalid">enter a valid name</small>
                <small class="error__email" v-if="v$.name.required.$invalid">enter name</small> -->
                <h1>Email address</h1>
                <input 
                    class="input__field" 
                    id="email"
                    type="text" 
                    v-model.trim="email"
                    :class="{ invalid: (v$.email.$invalid && !v$.email.required.$invalid) }"
                    >
                <small class="error__email" v-if="v$.email.$invalid && !v$.email.required.$invalid">enter a valid email</small>
                <small class="error__email" v-if="v$.email.required.$invalid">enter email</small>
                <h2>Password</h2>
                <input 
                    class="input__field" 
                    type="password" 
                    v-model.trim="password"
                    :class="{ invalid: (v$.password.$invalid && !v$.password.required.$invalid)}"
                    >
                <small class="error__email" v-if="v$.password.$invalid && !v$.password.required.$invalid">min 6 charactersl</small>
                <small class="error__email" v-if="v$.password.required.$invalid">enter password</small>
                <h2>Confirm your password</h2>
                <input class="input__field" 
                    type="password" 
                    v-model="confirmPassword"
                    :class="{ invalid: (password != confirmPassword)}">
                <small class="error__password" v-if="password != confirmPassword">Passwords don't match</small>
                <button class="closeButton" id="button" @click="close"> Close</button>
                <button class="logInButton" id="button" @click="register"> Registered</button>
            </div>
        </div>
    </div>
</template>

<script>
import { email, required, minLength, maxLength, sameAs } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'register',
    data() {
        return {
            v$: useVuelidate(),
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    },
    setup() {
        const store = useStore()
        onBeforeMount(() => {
            store.dispatch('fetchUser')
        })
    },
    validations() {
        return {
            name: { minLength: minLength(3), maxLength: maxLength(10), required },
            email: { email, required },
            password: { minLength: minLength(6), required },
            confirmPassword: sameAs(this.password),
            formData: ''
        }
    },
    props: {
        isOpen: {
            required: true,
            type: Boolean,
        },
    },
    emits: {
        close: null,
        register: null,
    },
    methods: {
        close() {
            this.$emit('close');
        },
        async register() {
            // this.$emit('logIn')
            // if (this.v$.$invalid) {
            //     this.v$.$touch()
            //     return
            // }
            const formData = {
                email: this.email,
                password: this.password,
                //name: this.name
            }

            try {
                await this.$store.dispatch('register', formData)
                this.$emit('close')
            } catch (e) { }
        },
    },
}
</script>

<style >
.backdrop {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgb(0, 0, 0, 0.3);
    top: 0;
    left: 0;
}

.popup {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 10px;
}

.popupContent {
    background-color: #4ba3ab;
    color: #000;
    max-width: 500px;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 5px 5px 10px #2f6a6f, -5px -5px 10px rgb(66, 146, 154);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
}

.popupContent>h1, h2 {
    grid-column: 1/3;
    text-align: center;
    font-size: 18px;
}

.input {
    grid-column: 1/3;
    height: 27px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 5px 5px 10px #2f6a6f, -5px -5px 10px rgb(66, 146, 154);
}

#button {
    cursor: pointer;
    border-radius: 5px;
    border-style: none;
    height: 25px;
    transition: background-color .2s ease-in-out;
    box-shadow: 5px 5px 10px #2f6a6f, -5px -5px 10px rgb(66, 146, 154);
}

#button:hover {
    background-color: #2f6a6f;
}

.closeButton {
    grid-column: 1/2;
}

.logInButton {
    grid-column: 2/3;
}
</style>