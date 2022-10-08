<template>
    <div v-if="isOpen" class="backdrop" @click="close">
        <div class="popup">
            <div class="popupContent" @click.stop>
                <h1>Email address</h1>
                <input class="input" type="email">
                <h2>Password</h2>
                <input class="input" type="password">
                <h2>Confirm your password</h2>
                <input class="input" type="password">
                <button class="closeButton" id="button" @click="close"> Close</button>
                <button class="logInButton" id="button" @click="logIn"> Registered</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: '{{ properCase name }}',
    data() {
        return {}
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
    methods: {
        close() {
            this.$emit('close');
        },
        logIn() {
            this.$emit('logIn');
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

.popupContent>h1,
h2 {
    grid-column: 1/3;
    text-align: center;
    font-size: 18px;
}

.popupContent>h2 {}

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