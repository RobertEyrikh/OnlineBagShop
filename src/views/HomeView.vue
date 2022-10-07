@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap');

<template>
  <body>
  <header class="header">
    <nav>
      <ul>
        <li><a href="/"><img src="../assets/logo.svg"></a></li>
        <li> <a href="/about">About </a> </li>
        <li> <a href="/project">Project </a> </li>
        <li> <a href="/services">Services</a> </li>
        <li> <a href="/delivery">Delivery</a> </li>
        <div class="push"> </div>
        <button class= "btn-in"> Sign in </button>
        <button class= "btn-up"> Sign up </button>
      </ul>
    </nav>
    <div>
      <div class="btn-block">
        <a href="/travelBags"><div class="btn"><img src="../assets/bag.svg"> Travel bags </div></a>
        <a href="/briefcases"><div class="btn"><img src="../assets/briefcase.svg"> Briefcases </div></a>
        <a href="/backpacks"><div class="btn"><img src="../assets/backpack.svg"> Backpacks </div></a>
        <a href="/wallets"><div class="btn"><img src="../assets/wallet.svg"> Wallets </div></a>
        <a href="/belts"><div class="btn"><img src="../assets/belt.svg"> Belts </div></a>
      </div>
    </div>
  </header>
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
  <hr>

  <footer>
    <div id="social">
      <a href="https://www.instagram.com/" target="_blank" alt="Ins"><img src="../assets/instagram.png"> </a>
      <a href="https://twitter.com/" target="_blank" alt="Twitter"><img src="../assets/twitter.png"> </a>
      <a href="https://telegram.org" target="_blank" alt="Tg"><img src="../assets/telegram.png"> </a>
    </div>
    <div id="rights">
      EyrikhProductions &copy 2022
    </div>

  </footer>

  </body>
</template>

<script>
export default {
  name: "home"
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

header > nav > ul > li > a > img {
  width: 50px;
  height: auto;
}

header > nav > ul {
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all linear .2s;
}

.push{
  margin-left: auto;
}

.btn-in {
  border: none;
  border-radius: 7px;
  color: white;
  font-size: 15px;
  padding: 7px 15px;
  background-color: #111111;
  transition: color .2s ease-in-out;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  cursor: pointer;
}

.btn-up {
  border: none;
  border-radius: 7px;
  color: black;
  font-size: 15px;
  padding: 7px 15px;
  background-color: #9ee0e6;
  transition: color .2s ease-in-out;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  cursor: pointer;
}

.btn-in:hover {
  color: #4ba3ab;
}

.btn-up:hover {
  color: #4ba3ab;
}

header > nav > ul > li > a {
  display:block;
  text-transform: uppercase;
  text-decoration: none;
  color: #111;
  transition: color .2s ease-in-out;
}

header > nav > ul > li > a:hover {
  color: #4ba3ab;
  transform: scale(1.1);
}

.btn-block{
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr;
  height: 70px;
  grid-gap: 15px;
  font-size: 15px;
  text-transform: uppercase;
  padding-left: 40px;
  padding-right: 40px;
}

.btn-block img {
  display: block;
  object-fit: cover;
  width: 20%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
}

.btn-block > a {
  text-decoration: none;
  color: black;
}

.btn{
  height: 70px;
  background-color: #9ee0e6;
  text-align: center;
  object-fit: cover;
  transition: all linear .2s;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
}

.btn:hover {
  background-color: #4ba3ab;
  transform: scale(1.07);
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

footer {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #9ee0e6;
  margin: auto;
}

footer #social {
  width: 50%;
}

footer #social img {
  width: 30px;
  margin-right: 15px;
}

footer #rights {
  width: 50%;
  font-size: 0.8em;
  margin: auto;
}

body hr {
  display: block;
  height: 3px;
  border: 0;
  background-color: #9ee0e6;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
}





</style>
