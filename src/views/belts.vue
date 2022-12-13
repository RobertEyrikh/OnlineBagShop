<template>
  <app-layout-product-category>
    <div class="belts-body">
      <get-items-card :category="`belts`">
      </get-items-card>
    </div>
  </app-layout-product-category>
</template>

<script>
import GetItemsCard from "@/components/GetItemsCard.vue";
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
export default {
  components: { AppLayoutProductCategory, GetItemsCard },
  name: "belts"
}
</script>

<style scoped>

</style>