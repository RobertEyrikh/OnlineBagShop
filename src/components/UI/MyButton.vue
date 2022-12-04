<template>
  <button class="my__button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scooped>
.my__button {
  cursor: pointer;
  border-radius: 10px;
  border-style: none;
  height: 25px;
  transition: background-color .2s ease-in-out;
}

.my__button:hover {
  background-color: #E64398;
}
</style>