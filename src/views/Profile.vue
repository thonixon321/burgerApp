<template>
  <div v-if="user">
    <h2>Hello {{ user.username }} !</h2>

    <div class='profile-container'>
      <div class='burgers-created-item'>
        <h3>Burgers You've Created: </h3>
        <BurgerCard v-for="(burger, i) in burgersCreated(user.username)" :key="i" :burger="burger"/>
      </div>

      <div class='burgers-ordered-item'>
        <h3>Burgers You've Ordered: </h3>
        <BurgerCard v-for="(burger, i) in burgersOrdered(user.burgersOrdered)" :key="i" :burger="burger"/>
      </div>

    </div>


    <!-- <router-link>See all burgers</router-link> -->
  </div>
</template>

<script>
import { axiosHandler } from '../mixins/axiosHandler'
import { mapGetters } from 'vuex'
import BurgerCard from '../components/BurgerCard'

export default {
  name: 'profile',

  mixins: [axiosHandler],

  data() {
    return {
      user: null
    }
  },

  props: {
    username: {
      type: String,
      required: true
    }
  },


  computed: {
    ...mapGetters({
      burgersCreated: 'burger/getCreatedBurgers',
      burgersOrdered: 'burger/getOrderedBurgers'
    })

  },

  methods: {

    fetchUserResponse(res) {
      console.log(res)
      let userFound = res.data.find(user => user.username === this.username)
      console.log(userFound)

      if (userFound) {
        this.user = userFound
      }
      else{
        this.user = {
          username: this.username,
          burgersCreated: [],
          burgersOrdered: []
        }
      }
    }

  },

  mounted() {
    let settingsObj = {
      url: 'https://my-json-server.typicode.com/thonixon321/burgersDB/users',
      method: 'GET',
      callBack: this.fetchUserResponse
    }

    //make axios call to see if user already exists
    this.sendAxios({}, settingsObj)

  },

  components: {
    BurgerCard
  }

}
</script>

<style scoped>
  .profile-container {
    width: 100%;
    min-height: 30em;
    display: flex;
    flex-direction: column;
  }

  .burgers-created-item {
    display: flex;
    flex-wrap: wrap;
  }

  .burgers-ordered-item {
    display: flex;
    flex-wrap: wrap;
  }


</style>