<template>
  <account-layout-category>
    <div class="reviews-page">
      <ul class="comments-list">
        <li v-for="comment in pendingCommentsOfUser" :key="comment.itemId" class="comment-body">
          <div class="comment-body__title">
            <p class="comment-item">{{comment.itemId}}</p>
            <p class="pending-status">Pending</p>
          </div>
          <div class="comment-grade">
            {{comment.rate}}
          </div>
          <div class="comment-body__text">
            <p>{{comment.review}}</p>
          </div>
        </li>
        <li v-for="comment in commentsOfUser" :key="comment.itemId" class="comment-body">
          <div class="comment-body__title">
            <p class="comment-item">{{ comment.itemId }}</p>
            <p class="published-status">Published</p>
          </div>
          <div class="comment-grade">
            {{comment.rate}}
          </div>
          <div class="comment-body__text">
            <p>{{comment.review}}</p>
          </div>
        </li>
      </ul>
    </div>
  </account-layout-category>
</template>

<script>
import AccountLayoutCategory from "@/layouts/AccountLayout";
import { mapState } from 'vuex';
export default {
  name: "AccountReviews",
  components: { AccountLayoutCategory },

  data() {
    return {}
  },

  methods: {
    check() {
      console.log(this.commentsOfUser)
    }, 
    // getItemInfo(id) {
    //   let arrayOfItems = []
    //   this.$store.dispatch("GET_THIS_ITEM0", id)
    //   let card = {
    //     'id': id,
    //     'name': this.thisItem.title
    //   }
    //   arrayOfItems.push(card)
    //   console.log(arrayOfItems)
    // },
  },

  computed: {
    ...mapState({
      commentsOfUser: state => state.reviews.commentsOfUser,
      pendingCommentsOfUser: state => state.reviews.pendingCommentsOfUser,
      thisItem: state => state.getCard.thisItem,
    })
  },

  mounted() {
    this.$store.dispatch("GET_REVIEWS_OF_USER")
  }

}
</script>

<style>
.reviews-page {
  margin: 10px 5% 40px 5%;
  padding: 10px 30px 10px 30px;
  background-color: #A1C3D1;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}

.comment-body {
  background-color: #F172A1;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  list-style-type: none;
  padding: 15px;
  margin-bottom: 15px;
}

.comments-list {
  margin-left: 0;
  padding-left: 0;
}

.comment-body__title {
  display: flex;
  border-bottom: 1px solid black;
}

.pending-status {
  background-color: yellow;
  padding: 5px;
  border-radius: 10px;
}

.published-status {
  background-color: #1d903c;
  padding: 5px;
  border-radius: 10px;
}

.comment-item {
  padding: 5px 20px 5px 5px;
}

.comment-grade {
  padding-top: 10px;
}
</style>