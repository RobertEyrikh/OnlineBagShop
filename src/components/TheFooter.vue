<template>
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
  height: 70px;
  margin: 0px 2% 0px 2%;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #B39BC8;
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
</style>