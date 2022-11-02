@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap');

<template>
  <body>
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
  </body>
</template>


<script>
import AppLayoutProductCategory from "../layouts/AppLayoutProductCategory.vue";
export default {
  name: "home",
  components: {AppLayoutProductCategory}
}

</script>

<style scoped>

html,
body {
  font-family: 'Open Sans', sans-serif;
  background-color: #9ee0e6;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  border-radius: 10px;
}

body {
  padding: 12px;
}

main {
  background-color: #b4ebf0;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 25px;
  display:flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  box-shadow: 8px 8px 15px #82bbbf , -8px -8px 15px #b4ebf0;
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
  background-image: linear-gradient(to top, #9ee0e6, #2e8cab);
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 10px;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
}

main > .info > button:hover {
  background-image: linear-gradient(to top, #9ee0e6, #4ba3ab);
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 25px 40px 60px 40px;
  grid-column-gap: 10px;
}

section img {
  max-width: 100%;
  height: auto;
}

section > article {
  background-color: #b4ebf0;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
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
  border-radius: 5px;
  background-color: #9ee0e6;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  transition: .2s linear;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
}

section > article > button:hover{
  background-color: #4ba3ab;
}

section > article  hr {
  display: block;
  height: 3px;
  border: 0;
  background-color: #b4ebf0;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
}


</style>
