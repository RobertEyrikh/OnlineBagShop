<template>
    <div v-if="isOpen" class="backdrop" @click="close" >
        <div class="popup" >
            <div class="popupContent" @click.stop >
                <h1 >Email address</h1>
                <input 
                    class="input__field" 
                    id="email"
                    type="text" 
                    v-model.trim="email"
                    :class="{invalid: (v$.email.$invalid && !v$.email.required.$invalid) }"
                    >
                <small class="error__email"  v-if="v$.email.$invalid && !v$.email.required.$invalid" >enter a valid email</small>
                <small class="error__email" v-if="v$.email.required.$invalid">enter email</small>
                <h2>Password</h2>
                <input 
                    class="input__field" 
                    type="password" 
                    v-model="password"
                    :class="{ invalid: (v$.password.$invalid && !v$.password.required.$invalid)}"
                >
                <small class="error__password" v-if="v$.password.$invalid && !v$.password.required.$invalid">min 6 characters</small>
                <small class="error__password" v-if="v$.password.required.$invalid">enter password</small>
                <small class="error__password" v-if="!user">empty user</small>
                <button class="closeButton" id="button" @click="close"> Close</button>
                <button class="logInButton" id="button" @click="logIn"> Log In</button>
            </div>
        </div>
    </div>
</template>

<script>

import { email, required, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { onBeforeMount } from 'vue';
import { useStore, mapState } from 'vuex';

export default {
    name: 'signIn',
    data () {
        return {
            v$: useVuelidate(),
            email: '',
            password: ''
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
            email: { email, required},
            password: { minLength: minLength(6), required },
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
        logIn: null,
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
        }),
    },
    methods: {
        // submitOn() {
        //     if(this.v$.$invalid) {
        //         console.log('11')
        //         this.v$.$touch()
        //         return
        //     }
        //     const formData = {
        //         email: this.email,
        //         password: this.password
        //     }
        //     this.$router.push('/')
        //  },
        close() {
            this.$emit('close');
        },
        async logIn() {
            this.$emit('logIn')
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
            const formData = {
                email: this.email,
                password: this.password
            }

            try {
                await this.$store.dispatch('login', formData)
                this.$emit('close')
            } catch (e) {}
        },
    },
}
</script>

<style >

.input__field {
    grid-column: 1/3;
    height: 27px;
    border-radius: 5px;
    border-style: none; 
    outline: none;
}

.invalid {
    outline: 1px solid red
}

.error__email {
    position: relative;
    grid-column: 1/3;
}

.error__password {
    grid-column: 1/3;
}

</style>