<template>
  <div>
    <NavBar :username="username" :burgerStore="true" />
    <div class='store-container'>
      <h3>Burger List: </h3>
      <div class='burgers-container'>
        <BurgerCard v-for="(burger, i) in burgers" :key="i" :username="username" store="true" :burger="burger"/>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import BurgerCard from '../components/BurgerCard'
import { mapState } from 'vuex'

export default {

  props: {
    username: {
      type: String,
    }
  },

  computed: {
    ...mapState({
      burgers: state => state.burger.burgers
    })
  },

  components: {
    NavBar,
    BurgerCard
  }

}
</script>

<style scoped>
 .store-container {
    margin-top: 6em;
 }

  .burgers-container {
    display: flex;
    flex-wrap: wrap;
  }

</style>