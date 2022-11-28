<template>
  <input class="input__field" >
</template>

<script>
export default {
  name: 'my-input'
}
</script>

<style scooped>
.input__field {
  grid-column: 1/3;
  height: 27px;
  border-radius: 5px;
  border-style: none;
  outline: none;
  transition: all .2s; 
  border: 2px solid #4ba3ab
}

.input__field:hover {
  border: 2px solid black
}
</style>