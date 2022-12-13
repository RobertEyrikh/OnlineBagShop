<template>
  <app-layout-product-category>
    <div class="admin-panel">
      <div class="admin-panel__title">
        <router-link to="adminPanel" class="title__button comments">
          Comments
        </router-link>
        <router-link to="/adminUsersList" class="title__button users">
          Users
        </router-link>
        <router-link to="/adminItemsList" class="title__button items">
          Items
        </router-link>
      </div>
      <slot />
    </div>
  </app-layout-product-category>
</template>

<script>
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";

export default {
  name: 'AdminDevtoolsLayout',
  components: { AppLayoutProductCategory },
  data() {
    return {
      
    }
  },
}
</script>

<style>
@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader {
  display: flex;
  border: 10px solid rgba(0, 0, 0, 0.1);
  border-left-color: #F172A1;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: loader-spin 2s linear infinite;
  align-self: center;
  margin-top: 20px;
  margin-left: 20px
}

</style>

<style scoped>
.admin-panel {
  margin: 40px 2% 40px 2%;
  background-color: #A1C3D1;
  padding: 20px 30px 20px 30px;
  border-radius: 50px;
}

.admin-panel__title {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  position: relative;
}

.title__button {
  display: flex;
  height: 40px;
  border: none;
  margin: 10px;
  font-size: 18px;
  border-radius: 10px;
  background-color: #B39BC8;
  transition: all .2s;
  cursor: pointer;
  color: #111;
  text-decoration: none;
  justify-content: center;
  align-items: center; 
}

.title__button:hover {
  background-color: #F172A1;
}
</style>