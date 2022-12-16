<template>
  <admin-devtools-layout>
    <div class="admin-items">
      <div class="admin-items__header">
        <select v-model="currentCategory" class="id-filter">
          <option>
            All
          </option>
          <option>
            travelBags
          </option>
          <option>
            briefcases
          </option>
          <option>
            backpacks
          </option>
          <option>
            wallets
          </option>
          <option>
            belts
          </option>
        </select>
        <button @click="isPopupOpen = true" class="add-button">
          Add new item
        </button>
        <add-new-item-popup :is-open="isPopupOpen" @close="isPopupOpen = false"></add-new-item-popup>
      </div>
      <div class="admin-items__body">
        <div class="list-title">
          <p class="cell cell__image ">
            Image
          </p>
          <p class="cell cell__categories">
            Category
          </p>
          <p class="cell cell__id">
            Item id
          </p>
          <p class="cell cell__title">
            Title
          </p>
          <p class="cell cell__body">
            Body
          </p>
          <p class="cell cell__price">
            Price
          </p>
          <p class="cell cell__buttons">
            
          </p>
        </div>
        <ul class="items-list">
          <div class="loader" v-if="!allItemsCard.data"></div>
          <li v-for="item in filteredItems" :key="item.title" class="item">
            <p class="cell ">
              <img :src="`${item.image}`" class="cell-image">
            </p>
            <p class="cell">
              {{item.category}}
            </p>
            <p class="cell">
              {{item.id}}
            </p>
            <p class="cell">
              {{item.title}}
            </p>
            <p class="cell">
              {{item.body}}
            </p>
            <p class="cell">
              {{item.price}}
            </p>
            <p class="cell cell-button">
              <button @click="edit" class="button-edit" v-if="!isEdit">Edit</button>
              <button @click="deleteItem(item.id)" v-if="!isEdit" class="button-delete">Delete</button>
              <button @click="deleteItem(item.id)" v-if="isEdit" class="button-cancel">Confirm</button>
              <button @click="cancel" class="button-cancel" v-if="isEdit">Cancel</button>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </admin-devtools-layout>
</template>

<script>
import AdminDevtoolsLayout from '@/layouts/AdminDevtoolsLayout.vue';
import AddNewItemPopup from '@/components/AddNewItemPopup.vue';
// import { get } from 'http';
import { mapState } from 'vuex';

export default {
  name: 'AdminItemsList',
  components: { AdminDevtoolsLayout, AddNewItemPopup },
  data() {
    return {
      isPopupOpen: false,
      isEdit: false,
      allItems: [],
      currentCategory: 'All'
    }
  },
  methods: {
    deleteItem(id) {
      let result = confirm('Do you want to remove the item')
      if(result) {
        this.$store.dispatch("DELETE_ITEM", id)
        .then(() => {
          alert('item has been removed')
        })
      }
    },
    edit() {
      this.isEdit = true
    },
    cancel() {
      this.isEdit = false
    }
  },
  computed: {
    ...mapState({
      allItemsCard: state => state.getCard.allItemsCard,
    }),
    filteredItems() {
      if (this.currentCategory == 'All') {
        return {...this.allItemsCard}.data
      }
      return {...this.allItemsCard}.data.filter((elem) => elem.category == this.currentCategory)
    }
  },
  mounted() {
    this.$store.dispatch('GET_ITEMS_FROM_API')
  },
  // watch: {
  //   currentCategory(newValue) {
  //     this.allItems = this.getAllItems().filter((elem) => elem.category == newValue)
  //     //this.allItems.filter
  //   }
  // }
}
</script>

<style scoped>
.admin-items {
  margin: 10px;
}
.admin-items__header {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.admin-items__body {
  background-color: #F0EBF4;
  height: 720px;
  overflow: auto;
  margin-top: 20px;
}

.list-title {
  list-style-type: none;
  display: grid;
  grid-template-columns: 110px 100px 150px 150px 650px 100px 100px;
  font-weight: bold;
  font-size: 20px;
}

.id-filter {
  background-color: #B39BC8;
  height: 30px;
  width: 200px;
  margin-bottom: 10px;
}

.add-button {
  background-color: #22ad47;
  height: 30px;
  width: 200px;
  border: none;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  transition: all .2s;
  margin-bottom: 10px
}

.add-button:hover {
  background-color: #1d903c;
}

.cell {
  border: 1px solid #111;
  margin: 0px;
  padding: 3px;
  font-size: 15px;
  height: 100px;
  font-weight: normal;
  overflow-wrap:break-word
}

.cell__image,
.cell__buttons,
.cell__price,
.cell__body,
.cell__title,
.cell__id,
.cell__categories {
  background-color: #B39BC8;
  height: 30px;
  font-weight: bold;
}

.cell-image {
  background-color: #e3fbff;
  object-fit: cover;
  width: 100px;
  height: 100px;
  transition: all linear .2s;
  cursor: pointer;
}

.items-list {
  margin-left: 0;
  padding-left: 0;
  margin: 0;
}

.item {
  list-style-type: none;
  display: grid;
  grid-template-columns: 110px 100px 150px 150px 650px 100px 100px;
  font-weight: bold;
  font-size: 20px;
}

.cell-button {
  display: grid;
  grid-row-gap: 10px;
}
.button-cancel:hover,
.button-delete:hover,
.button-edit:hover {
  background-color: #E64398;
}

.button-cancel,
.button-delete,
.button-edit {
  transition: all .2s;
  background-color: #F172A1;
  color: #e3fbff
}
</style>