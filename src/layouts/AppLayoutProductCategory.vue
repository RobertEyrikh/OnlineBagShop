<template>
  <the-header>
  </the-header>
  <slot/>
  <the-footer>
  </the-footer>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
export default {
  name: "AppLayoutProductCategory",
  components: {TheFooter, TheHeader}
}
</script>

<style scoped> </style>