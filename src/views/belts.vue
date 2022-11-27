<template>
  <div class="belts">
    <app-layout-product-category>
      <div class="belts-body">
        Belts
      </div>
    </app-layout-product-category>
  </div>
</template>

<script>
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
export default {
  components: { AppLayoutProductCategory },
  name: "belts"
}
</script>

<style scoped>
.belts {
  font-family: 'Open Sans', sans-serif;
  background-color: #9ee0e6;
  box-shadow: 5px 5px 10px #82bbbf, -5px -5px 10px #b4ebf0;
  border-radius: 10px;
  padding: 12px;
}

.belts-body {
  padding: 5%
}
</style>