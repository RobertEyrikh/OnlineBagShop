<template>
  <admin-devtools-layout>
    <div class="admin-panel__title">
      <select v-if="!isPublishedComments" class="id-filter" v-model="currentFilter" >
        <option>All</option>
        <option class="id-filter__item" v-for="(value, name) in uniqId" :key="name">
          {{name}} {{value}}
        </option>
      </select>
      <select v-if="isPublishedComments" class="id-filter" v-model="publishedCommentFilter" @change="commentPublishedFilter(publishedCommentFilter)">
        <option>All</option>
        <option class="id-filter__item" v-for="(value, name) in uniqPublishedId" :key="name">
          {{name}} {{value}}
        </option>
      </select>
      <button @click="(isPublishedComments = false)" :class="{ active: !isPublishedComments }" class="type-coments__button">
        On pending
      </button>
      <button @click="(isPublishedComments = true)" :class="{ active: isPublishedComments }" class="type-coments__button">
        Published
      </button>
    </div>
    <div class="admin-panel__body">
      <div class="list-title">
        <p class="cell cell__email ">
          item ID
        </p>
        <p class="cell cell__grade">
          grade
        </p>
        <p class="cell">
          title
        </p>
      </div>
      <ul v-if="isPublishedComments" class="comment-list">
        <li v-for="comment in filteredPublishComments" :key="comment.review" class="comment">
          <p class="cell cell__email">
            {{ comment.itemId }}
          </p>
          <p class="cell cell__grade">
            {{ comment.rate }}
          </p>
          <textarea v-model="comment.review" class="cell cell__textarea">{{ comment.review }}</textarea>
          <div class="buttons-review">
            <button @click="publishReview(comment.itemId, comment.userId, comment.rate, comment.review)"
              class="buttons-review__publish"><img class="review-image" src="@/assets/icons/check.svg"></button>
            <button @click="deletePublishedReview(comment.itemId, comment.userId)" class="buttons-review__publish"><img
              class="review-image" src="@/assets/delete.svg"></button>
          </div>
        </li>
      </ul>
      <ul v-if="!isPublishedComments" class="comment-list">
        <li v-for="comment in filteredComments" :key="comment.userId" class="comment">
          <p class="cell cell__email">
            {{ comment.itemId }}
          </p>
          <p class="cell cell__grade">
            {{ comment.rate }}
          </p>
          <textarea v-model="comment.review" class="cell cell__textarea">{{ comment.review }}</textarea>
          <div class="buttons-review">
            <button @click="publishReview(comment.itemId, comment.userId, comment.rate, comment.review)"
              class="buttons-review__publish"><img class="review-image" src="@/assets/icons/check.svg"></button>
            <button @click="deleteReview(comment.itemId, comment.userId)" class="buttons-review__publish"><img
              class="review-image" src="@/assets/delete.svg"></button>
          </div>
        </li>
      </ul>
    </div>
  </admin-devtools-layout>
</template>

<script>
import AdminDevtoolsLayout from '@/layouts/AdminDevtoolsLayout.vue';
import { opaqueType } from '@babel/types';
import { mapState } from 'vuex';
export default {
  name: 'AdminPanel',
  components: { AdminDevtoolsLayout, opaqueType },
  data () {
    return {
      isPublishedComments: false,
      currentFilter: 'All',
      publishedCommentFilter: 'All',
    }
  },
  methods: {
    // commentFilter(dirtyId) {
    //   if(dirtyId == 'All') {
    //     this.resultArray = this.arrayOfComments
    //   } else {
    //     let id = dirtyId.split(' ')[0]
    //     this.resultArray = this.arrayOfComments.filter((elem) => elem.itemId == id) 
    //   }     
    // },
    // commentPublishedFilter(dirtyId) {
    //   if (dirtyId == 'All') {
    //     this.publishedArray = this.arrayOfAllComments
    //   } else {
    //     let id = dirtyId.split(' ')[0]
    //     this.publishedArray = this.arrayOfAllComments.filter((elem) => elem.itemId == id)
    //   }
    // },
    deleteReview(itemId, userId) {
      let commentInfo = {
        itemId: itemId,
        userId: userId,
      }
      this.$store.dispatch('DELETE_REVIEW', commentInfo)
    }, 
    deletePublishedReview(itemId, userId) {
      let commentInfo = {
        itemId: itemId,
        userId: userId,
      }
      this.$store.dispatch('DELETE_PUBLISHED_REVIEW', commentInfo)
    },
    publishReview(itemId, userId, rate, comment) {
      let commentInfo = {
        itemId: itemId,
        userId: userId,
        rate: rate,
        comment: comment,
      }
      this.$store.dispatch('PUBLISH_REVIEW', commentInfo)
    }
  },
  computed: {
    ...mapState({
      arrayOfComments: state => state.reviewsForCheck.arrayOfComments,
      arrayOfPublishedComments: state => state.reviewsForCheck.arrayOfAllComments
    }),
    filteredComments() {
      if (this.currentFilter == 'All') {
        return { ...this.arrayOfComments }
      }
      return [...this.arrayOfComments].filter((elem) => elem.itemId == this.currentFilter.split(' ')[0])
    },
    filteredPublishComments() {
      if (this.publishedCommentFilter == 'All') {
        return { ...this.arrayOfPublishedComments }
      }
      return [...this.arrayOfPublishedComments].filter((elem) => elem.itemId == this.publishedCommentFilter.split(' ')[0])
    },
    uniqId() {
      let result = {};
      for (let i = 0; i < this.arrayOfComments.length; i ++) {       
        let a = this.arrayOfComments[i].itemId;        
        if (result[a] != undefined)
          ++result[a];
        else
          result[a] = 1;
      } 
      return result
    },
    uniqPublishedId() {
      let result = {};
      for (let i = 0; i < this.arrayOfPublishedComments.length; i++) {
        let a = this.arrayOfPublishedComments[i].itemId;
        if (result[a] != undefined)
          ++result[a];
        else
          result[a] = 1;
      }
      return result
    }
  },

  mounted() {
    this.$store.dispatch('GET_REVIEWS_FOR_CHECK')
    this.$store.dispatch('GET_ALL_REVIEWS')
  }
}

</script>

<style scoped>
.admin-panel__title {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.type-coments__button {
  height: 30px;
  border: none;
  margin: 10px;
  font-size: 15px;
  border-radius: 10px;
  background-color: #F172A1;
  transition: all .2s;
  cursor: pointer;
}

.type-coments__button:hover {
  background-color: #E64398;
}

.admin-panel__body {
  margin:10px;
  background-color: #F0EBF4;
  height: 720px;
}

.comment-list {
  margin-left: 0;
  padding-left: 0;
  height: 700px;
  overflow: scroll; 
  margin: 0;
}

.list-title {
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
  grid-template-columns: 200px 100px minmax(200px, 1fr) 66px;
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

.cell__textarea {
  padding: 3px;
  background-color: #F0EBF4;
  font-size: 13px;
  margin: 0;
  text-align: left;
  resize: none;
  box-sizing: border-box;
}

.buttons-review__publish {
  height: 66px;
  width: 66px;
}

.review-image {
  box-sizing: border-box;
  object-fit: cover;
  height: 70%;
  width:auto;
  max-width:70%;
}

.id-filter {
  background-color: #B39BC8;
  height: 30px;
  width: 200px;
  margin: 10px;
}


.id-filter__item:hover {
  background-color: #A1C3D1;
}

.value {
  background-color: #E64398;
  color: red;
}

.active {
  background-color: #E64398;
}
</style>