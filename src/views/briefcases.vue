<template>
  <app-layout-product-category>
    <div class="briefcases-body">
      <get-items-card :category="`briefcases`">
      </get-items-card>
    </div>
  </app-layout-product-category>
</template>

<script>
import GetItemsCard from "@/components/GetItemsCard.vue";
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
export default {
  components: { AppLayoutProductCategory, GetItemsCard },
  name: "briefcases"
}
</script>

<style scoped>

</style>