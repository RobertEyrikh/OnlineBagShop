<template>
  <app-layout-product-category>
    <div class="admin-panel">
      <div class="admin-panel__title">
        <button class="title__button comments">
          Comments
        </button>
        <button class="title__button users">
          Users
        </button>
        <button class="title__button items">
          Items
        </button>
      </div>
      <div class="admin-panel__body">
        <ul class="comment-list">
          <li class="comment-header">
            <p class="cell cell__email">
              email
            </p>
            <p class="cell cell__grade">
              grade
            </p>
            <p class="cell">
              title
            </p>
          </li>
          <li v-for="element in arr" class="comment">
            <p class="cell cell__email">
              {{ element.email }}
            </p>
            <p class="cell cell__grade">
              {{ element.grade }}
            </p>
            <p class="cell">
              {{ element.title }}
            </p>
            <div class="buttons-review">
              <button class="buttons-review__publish"><img class="review-image" src="@/assets/icons/check.svg"></button>
              <button class="buttons-review__publish"><img class="review-image" src="@/assets/icons/cancel.svg"></button>
              <button class="buttons-review__publish"><img class="review-image" src="@/assets/delete.svg"></button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </app-layout-product-category>
</template>

<script>
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
export default {
  name: 'AdminPanel',
  components: {AppLayoutProductCategory},
  data () {
    let arr = [
      {
        grade: '5',
        title: '213421',
        email: '21vsd@gmail.com',
      },
      {
        grade: '1',
        title: 'tver3r',
        email: '21v222d@gmffail.com',
      }
    ]
    return {
      arr
    }
  },
  mounted() {
    this.$store.dispatch('GET_REVIEWS_FOR_CHECK')
  }
}

</script>

<style scoped>
.admin-panel{
  margin: 40px 2% 40px 2%;
  background-color: #A1C3D1;
  padding: 20px 30px 20px 30px;
  border-radius: 50px;
}

.admin-panel__title {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.title__button {
  height: 40px;
  border: none;
  margin: 10px;
  font-size: 18px;
  border-radius: 10px;
  background-color: #B39BC8;
  transition: all .2s;
  cursor: pointer;
}

.title__button:hover {
  background-color: #F172A1;
}

.admin-panel__body {
  margin:10px;
  background-color: #F0EBF4;
  height: 700px;
}

.comment-list {
  margin-left: 0;
  padding-left: 0;
}

.comment-header {
  background-color: #B39BC8;
  list-style-type: none;
  display: grid;
  grid-template-columns: 200px 100px 1fr ;
  height: 30px;
  font-weight: bold;
  font-size: 20px;
}

.comment {
  list-style-type: none;
  display: grid;
  grid-template-columns: 200px 100px 1fr 44px;
  height: 132px;
}

.cell {
  border: 1px solid #111;
  margin: 0px;
  padding: 3px;
}

.cell__email {
  text-align: center;
}

.cell__grade {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.buttons-review__publish {
  height: 44px;
  width: 44px;
}

.review-image {
  box-sizing: border-box;
  object-fit: cover;
  height: 90%;
  width:auto;
  max-width:90%;
}
</style>