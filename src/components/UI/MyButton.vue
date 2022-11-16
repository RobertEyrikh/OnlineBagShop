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
  border-radius: 5px;
  border-style: none;
  height: 25px;
  margin-top: 10px;
  
  transition: background-color .2s ease-in-out;
  
}

.my__button:hover {
  background-color: #2f6a6f;
}
</style>