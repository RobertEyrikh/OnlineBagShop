@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap');

<template>
  <app-layout-product-category>
  <main>
    <div class="info">
      <h1>Show who is the boss of this gym</h1>
        <button>Get in touch</button>
    </div>
      <div class="mainImage">
        <img src="../assets/JasonSt.png" alt>
    </div>
  </main>
  <section>
    <article>
      <img src="../assets/letherman.jpg">
      <h2>Leatherman collection</h2>
      <hr>
      <div>
        <p> Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate</p>
      </div>
      <button>Read more</button>
    </article>
    <article>
      <img src="../assets/Jabroni.jpg">
      <h2>Jabroni outfit</h2>
      <hr>
      <div>
        <p> Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate</p>
      </div>
      <button>Read more</button>
    </article>
    <article>
      <img src="../assets/300bucks.jpg">
      <h2>Collect a set of clothes for $300</h2>
      <hr>
      <div>
        <p> Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate</p>
      </div>
      <button>Read more</button>
    </article>
    <article>
      <img src="../assets/Jabroni.jpg">
      <h2>Jabroni outfit</h2>
      <hr>
      <div>
        <p> Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate</p>
      </div>
      <button>Read more</button>
    </article>
  </section>
  </app-layout-product-category>
</template>


<script>
import AppLayoutProductCategory from "../layouts/AppLayoutProductCategory.vue";
export default {
  name: "home",
  components: {AppLayoutProductCategory}
}

</script>

<style scoped>
main {
  margin: 40px 2% 0px 2%;
  background-color: #A1C3D1;
  display:flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 50px;
}

main > .info {
  flex-basis: 30%;
}

main > .info > h1 {
  font-size:60px;
  line-height: 1;
}

main > .info > button {
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #F172A1;
  transition: all .2s;
  color: #F0EBF4;
}

main > .info > button:hover {
  background-color: #E64398
}

.mainImage {
  flex-basis: 50%;
}

.mainImage > img {
  display:block;
  max-width: 100%;
  height: auto;
}

section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin: 40px 2% 30px 2%;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}

section img {
  width: 100%;
  object-fit: cover;
}

section > article {
  background-color: #A1C3D1;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}

section > article > h2 {
  text-transform: uppercase;
  text-align: center;
  height: auto;
  font-size: 15px;
  margin-bottom: 10px;
}

section > article > div {
  text-indent: 10px;
  font-size: 15px;
  color: #111;
  max-height: 50px;
  overflow: hidden;
  padding-bottom: 2px;
}

section > article > button {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  border: none;
  align-items: center;
  border-radius: 20px;
  background-color: #F172A1;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  transition: .2s linear;
  color: #F0EBF4;
}

section > article > button:hover{
  background-color: #E64398;
}

section > article  hr {
  display: block;
  height: 2px;
  border: 0;
  background-color: #111;
}
</style>
