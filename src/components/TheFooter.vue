<template>
  <hr>
  <footer>
    <div id="social">
      <a href="https://www.instagram.com/" target="_blank"><img src="../assets/instagram.png" alt="Ins"> </a>
      <a href="https://twitter.com/" target="_blank"><img src="../assets/twitter.png" alt="Twitter"> </a>
      <a href="https://telegram.org" target="_blank"><img src="../assets/telegram.png" alt="Tg"> </a>
    </div>
    <div id="rights">
      EyrikhProductions &copy 2022
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter"
}
</script>

<style scoped>
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