<template>
  <nav>
    <h2 v-if="burgerStore === false">
      <span><i class="material-icons">face</i></span>
      Hello {{ username }}!
    </h2>
    <h2 v-else>
      <span><i class="material-icons">shopping_cart</i></span>
      Burger Store
    </h2>
    <div class="buttonsContainer">

      <router-link v-if="burgerStore === false" class="router-link-active" :to="{name: 'burger-store', params:{username: this.username}}">
        Burger Store
      </router-link>

      <router-link v-else class="router-link-active" :to="{name: 'profile', params:{username: this.username}}">
        {{ username }} Profile
      </router-link>

      <router-link :to="{name: 'login'}">
        Log out
      </router-link>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'nav-bar',
  props:{
    username: String,
    burgerStore: Boolean
  }

}
</script>

<style scoped>
 nav{
   width: 100%;
   height: 5em;
   position: fixed;
   top: 0;
   left: 0;
   display: flex;
   align-items: center;
   justify-content: space-between;
   background: rgb(92, 92, 240);
   z-index: 2;
 }

 h2 {
   color: white;
   margin: .5em;
 }

 span {
   position: relative;
   top: .2em;
 }

 button {
   background: transparent;
   border: 1px solid rgb(247, 247, 247);
   border-radius: 5px;

   cursor: pointer;
   width: 10em;
   margin: .3em;
 }

 button:hover {
   background:rgb(235, 153, 31);
   border: none;
 }

 .router-link-active {
   color: white;
   text-decoration: none;
   padding: 1.5em 1.7em;
   margin: 2em;
 }

 .router-link-active:hover {
   text-decoration: underline;
 }

</style>