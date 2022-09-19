<template>
  <li v-for="card in allItemsCard.data" >
    <div>
      <a href="#"><img :src="`${publicPath}${card.image}`" alt="bag"></a>
      <div>
        <p>${{card.price}}</p>
        <a href="#" class="pushBucket"><img src="../assets/shoppingBag.webp"></a>
      </div>
      <h1>{{card.title}}</h1>
    </div>
  </li>
</template>

<script>
import ItemsCardContainer from "@/components/ItemsCardContainer";


export default {
  name: "RenderItemCard",
  props:["allItemsCard", "arrayOfCard", "card.price", "card.title", "ItemsCard"],

  data() {
    /*let arrayOfCard = []
    let allItemsCard = new ItemsCardContainer(
        arrayOfCard)*/

    return {publicPath: process.env.BASE_URL, /*allItemsCard, arrayOfCard,*/}
  }
}


</script>

<style scoped>

</style>