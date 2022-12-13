<template>
  <app-layout-product-category>
    <div class="backpacks-body">
      <get-items-card :category="`backpacks`">
      </get-items-card>
    </div>
  </app-layout-product-category>
</template>

<script>
import GetItemsCard from "@/components/GetItemsCard.vue";
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
export default {
  components: { AppLayoutProductCategory, GetItemsCard },
  name: "backpacks"
}
</script>

<style scoped>

</style>