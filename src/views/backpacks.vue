<template>
  <app-layout-product-category>
    <div class="backpacks-body">
      Backpacks
    </div>
  </app-layout-product-category>
</template>

<script>
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
export default {
  components: { AppLayoutProductCategory },
  name: "backpacks"
}
</script>

<style scoped>

.backpacks-body {
  padding: 5%
}
</style>