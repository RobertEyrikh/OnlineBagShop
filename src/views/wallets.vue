<template>
  <app-layout-product-category>
    <div class="wallets-body">
      Wallets
    </div>
  </app-layout-product-category>
</template>

<script>
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
export default {
  components: { AppLayoutProductCategory },
  name: "wallets"
}
</script>

<style scoped>

.wallets-body {
  padding: 5%
}
</style>