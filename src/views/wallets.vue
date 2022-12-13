<template>
  <app-layout-product-category>
    <div class="wallets-body">
      <get-items-card :category="`wallets`">
      </get-items-card>
    </div>
  </app-layout-product-category>
</template>

<script>
import GetItemsCard from "@/components/GetItemsCard.vue";
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
export default {
  components: { AppLayoutProductCategory, GetItemsCard },
  name: "wallets"
}
</script>

<style scoped>

</style>