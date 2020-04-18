<template>
  <div class="login-container">
    <form class="form-item" @submit.prevent="goToProfile">
      <label for='username'>Username:</label>
      <input type='text' id="username" v-model="username">
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
import { axiosHandler } from '../mixins/axiosHandler'
import { mapActions } from 'vuex'

export default {
  name: 'login',

  mixins: [axiosHandler],

  data() {
    return {
      username: ''
    }
  },

  methods: {
    ...mapActions({
      fetchBurgers: 'burger/fetchBurgers'
    }),

    goToProfile() {
      this.$router.push({name: 'profile', params:{username: this.username}})
    },

    fetchBurgerResponse(res) {
      console.log(res.data)
      this.fetchBurgers(res.data)
    }
  },

  mounted() {
    let settingsObj = {
      url: 'https://my-json-server.typicode.com/thonixon321/burgersDB/burgers',
      method: 'GET',
      callBack: this.fetchBurgerResponse
    }

    //make axios call to get burgers
    this.sendAxios({}, settingsObj)
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  min-height: 30em;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.form-item {
  background: rgb(158, 189, 247);
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  padding: 3em;
}

.form-item input {
  background: white;
  border-radius: 5px;
}

.form-item button {
  margin-top: .73em;
  background: white;
  padding: .2em .3em;
  border: 1px solid black;
  border-radius: 5px;
}

</style>