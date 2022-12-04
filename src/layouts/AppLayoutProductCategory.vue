<template>
  <body>
    <the-header>
    </the-header>
    <slot/>
    <the-footer>
    </the-footer>
  </body>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
export default {
  name: "AppLayoutProductCategory",
  components: {TheFooter, TheHeader}
}
</script>


<style>
body {
    font-family: 'Open Sans', sans-serif;
    background-color: #F0EBF4;
    margin: 0;
  }
</style>