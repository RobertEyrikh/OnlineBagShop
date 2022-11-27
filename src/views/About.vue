<template>
  <div class="about">
  <app-layout-product-category>
    <h1>About Page</h1>
    <div class="about-body">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
      aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

    </div>
  </app-layout-product-category>
</div>
</template>

<script>
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
export default {
  name: 'About',
  components: { AppLayoutProductCategory },

  data() {
    return {}
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}
.about {
  font-family: 'Open Sans', sans-serif;
  background-color: #9ee0e6;
  box-shadow: 5px 5px 10px #82bbbf, -5px -5px 10px #b4ebf0;
  border-radius: 10px;
  padding: 12px;
}
.about-body {
  padding: 5% 5% 5% 5%
}
</style>