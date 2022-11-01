<template>
    <body>
        <app-layout-product-category>
            <main>

            </main>
        </app-layout-product-category>
    </body>
</template>

<script>
import AppLayoutProductCategory from "../layouts/AppLayoutProductCategory.vue";
export default {
    name: 'basket',
    components: { AppLayoutProductCategory },

    data() {
        return {}
    }
}
</script>

<style scoped>
html,body {
  font-family: 'Open Sans', sans-serif;
  background-color: #9ee0e6;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  border-radius: 10px;
}

body {
  padding: 12px;
}

main {
  margin-right: 40px;
  margin-top: 25px;
}
</style>