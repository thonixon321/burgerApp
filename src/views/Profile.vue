<template>
  <div v-if="user">
    <NavBar :username="user.username" :burgerStore="false"/>
    <div class='profile-container'>
      <h3>Burgers You've Created: </h3>
      <div v-if="noneCreated === false" class='burgers-created-item'>
        <BurgerCard v-for="(burger, i) in burgersCreated(user.username)" :key="i" :username="username" :burger="burger"/>
        <button class="addBurgerButton" @click="createBurger"> <span><i class="material-icons">add</i></span> Create Burger</button>
      </div>
      <div v-else>
       <p>You have not created any burgers yet</p>
       <button class="addBurgerButton" @click="createBurger"> <span><i class="material-icons">add</i></span> Create Burger</button>
      </div>

      <h3>Burgers You've Ordered: </h3>
      <div v-if="user.burgersOrdered.length" class='burgers-ordered-item'>
        <BurgerCard v-for="(burger, i) in burgersOrdered(user.burgersOrdered)" :key="i" :username="username" :burger="burger"/>
      </div>
      <p v-else>You have not ordered any burgers yet</p>
    </div>


    <!-- <router-link>See all burgers</router-link> -->
  </div>
</template>

<script>
import { axiosHandler } from '../mixins/axiosHandler'
import { mapGetters, mapActions, mapState } from 'vuex'
import BurgerCard from '../components/BurgerCard'
import NavBar from '../components/NavBar'

export default {
  name: 'profile',

  mixins: [axiosHandler],

  data() {
    return {
      user: null,
      noneCreated: false
    }
  },

  props: {
    username: {
      type: String,
      required: true
    }
  },


  computed: {
    ...mapState({
      burgers: state => state.burger.burgers
    }),

    ...mapGetters({
      burgersCreated: 'burger/getCreatedBurgers',
      burgersOrdered: 'burger/getOrderedBurgers'
    })

  },

  methods: {
    ...mapActions({
      addBurger: 'burger/addBurger'
    }),

    createBurger() {
      let newId = this.burgers.length + 1
      let newBurger = {
        id: newId,
        price: '$0.00',
        title: 'Untitled',
        ingredients: [],
        chef: this.username
      }
      let settingsObj = {
        url: 'https://my-json-server.typicode.com/thonixon321/burgersDB/burgers',
        method: 'POST',
        callBack: this.createBurgerResponse
      }

      this.sendAxios(newBurger, settingsObj)
    },

    createBurgerResponse(res) {
      console.log(res)
      this.addBurger(res.data)
    },

    fetchUserResponse(res) {
      console.log(res)
      let userFound = res.data.find(user => user.username === this.username)
      let newUser = {
              username: this.username,
              burgersOrdered: []
            }
      console.log(userFound)

      if (userFound) {
        this.user = userFound
      }
      else{
        let settingsObj = {
          url: 'https://my-json-server.typicode.com/thonixon321/burgersDB/users',
          method: 'POST',
          callBack: () => {
            this.user = newUser
          }
        }

        this.sendAxios(newUser, settingsObj)

        this.noneCreated = true
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
    BurgerCard,
    NavBar
  }

}
</script>

<style scoped>
  .profile-container {
    margin-top: 5em;
    width: 100%;
    min-height: 30em;
    display: flex;
    flex-direction: column;
  }

  .burgers-created-item, .burgers-ordered-item {
    display: flex;
    flex-wrap: wrap;
  }

  button.addBurgerButton {
    background: transparent;
    text-decoration: underline;
    border: none;
    width: 5em;
    height: 2em;
    cursor: pointer;
    position: relative;
    top: 20em;
    left: 10em;
    color: rgb(92, 92, 240);
  }

</style>