<template>
  <main>
    <div>
      <button class="addPostAdder" @click="cancelButton()"><img src="../assets/addPost.svg"></button>
      <ul id="elem" >
        <li v-if="isAddPostVisible">
          <img class="inputImg" v-bind:src="`${publicPath}${imagePreview}`">
          <label class="inputBlock">
            <input 
              class="inputFile" required
              type="file"
              ref="file"
              name="file"
              accept="image/*"
              v-bind:value="image"
              v-on:change="handleFileUpload()"
              @input="image = $event.target.value">
          </label>
          <div class="input">
            <p>Price:</p>
            <input 
              type="number" required
              v-bind:value="price"
              @input="price = $event.target.value">
            <p>Title:</p>
            <input 
              required
              v-bind:value="title"
              @input="title = $event.target.value">
            <button class="cancel" @click=" cancelButton()">cancel</button>
            <button class="add" @click = "createCard,  allItemsCard.newCardAdd(createCard()), cancelButton()">add</button>
          </div>
        </li>
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
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  name: ""
}
</script>

<style scoped>
main {
  margin-right: 40px;
  margin-top: 25px;
}

main > div > ul{
  list-style-type: none;
  display:flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  gap: 20px;
  margin-left: auto;
  margin-top: 20px;
}

main > div > ul > li {
  height: 320px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  margin-bottom: 20px;
}

main > div > ul > li > div > a > img {
  background-color: #e3fbff;
  object-fit: cover;
  border-radius: 8px;
  width: 300px;
  height: 200px;
  transition: all linear .2s;
}

main > div > ul > li > div > a > img:hover{
  transform: scale(1.05);
}

#elem > li > div > div{
  display:flex;
  margin-left:auto;
  margin-right: 20px;
  align-items: center;
}

#elem > li > div > h1 {
  margin-left: 15px;
  font-size: 15px;
}

.pushBucket{
  margin-left: auto;
}

#elem > li > div > div > a > img{
  width: 40px;
  height: 30px;
  transition: all linear .2s;
}

#elem > li > div > div > a > img:hover{
  transform: scale(1.2);
}

#elem > li > div > div > p {
  margin-left: 15px;
  font-size: 20px;
}

.add {
  justify-self: end;
  border: none;
  border-radius: 7px;
  color: black;
  font-size: 15px;
  padding: 7px 15px;
  background-color: #9ee0e6;
  transition: background-color .2s ease-in-out;
  box-shadow: 5px 5px 10px #82bbbf, -5px -5px 10px #b4ebf0;
  cursor: pointer;
  margin-bottom: 10px;
}

.input > input {
  display: block;
  border-style: none;
  border-radius: 5px;
  background-color: #e3fbff;
}

.add {
  justify-self: end;
  border: none;
  border-radius: 7px;
  color: black;
  font-size: 15px;
  padding: 7px 15px;
  background-color: #9ee0e6;
  transition: background-color .2s ease-in-out;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  cursor: pointer;
  margin-bottom: 10px;
}

.cancel {
  align-self: stretch;
  border: none;
  border-radius: 7px;
  color: black;
  font-size: 15px;
  padding: 7px 15px;
  background-color: #ea7a7a;
  transition: background-color .2s ease-in-out;
  box-shadow: 2px 2px 4px #ea7a7a, -2px -2px 4px #f1cbcb;
  cursor: pointer;
  margin-bottom: 10px;;
}

.cancel:hover {
  background-color: #e35757;
}

.add:hover {
  background-color: #5cbec7;
}

.inputImg  {
  display: block;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  height: 160px;
  width: 160px;
  border: 0;
  text-indent: -9999px;
  cursor: pointer;
  transition: all linear .1s;
  margin-bottom: 10px;
  margin-top: 5px;
}

.addPostAdder {
  transition: all linear .2s;
  margin-top: 10px;
  margin-left: 40px;
  border: none;
  outline: none;
  background-color: #9ee0e6;
  cursor: pointer;
}

.addPostAdder:hover{
  transform: scale(1.15)
}

.addPostAdder > img {
  height: 40px;
  width: 40px;
}

.inputFile {
  display: none;
}

.inputBlock {
  cursor:pointer;
  width: 160px;
  height: 160px;
  background-color: #3a9aa4;
  display: block;
  position: absolute;
  top: 282px;
  left: 138px;
  opacity: 0;
  border-radius: 5px;
  transition: opacity 0.2s ease-in-out ;
}

.inputBlock:hover {
  opacity: 0.2;
}
</style>