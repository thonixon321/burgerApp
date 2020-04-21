<template>
  <div class="card">
    <img src='../assets/burgerPhoto.jpg' alt='burger photo'>
    <div v-if="editing === false" class='readOnlyCard'>
      <h2>{{ burger.title }}</h2>
      <p>Price: {{ burger.price }}</p>
      <p>Ingredients: </p>
      <ul>
        <li v-for="ing in burger.ingredients" :key="ing">
          {{ ing }}
        </li>
      </ul>
    </div>
    <div v-else class='editCard'>
      <div class='field'>
        <label for='burgerTitle'>Title:</label>
        <input v-model="burger.title" type='text' id="burgerTitle">
      </div>
      <div class='field'>
        <label for='burgerPrice'>Price:</label>
        <input v-model="burger.price" type='text' id="burgerPrice">
      </div>
      <p>Ingredients: </p>
      <ul>
        <li v-for="ing in burger.ingredients" :key="ing">
          {{ ing }} <button @click="removeIng(ing)"> <i class="material-icons">close</i> </button>
        </li>
        <li class="addNewIng" v-if="addingNewIng === false" @click="addingNewIng = true">
          <i class="material-icons">add</i>
          Add new
        </li>
        <li class="addNewIng" v-else>
          <i class="material-icons" @click="addNewIng">add</i>
          <input v-model="newIng" type='text' id="newIng" @keyup.enter="addNewIng">
        </li>
      </ul>
    </div>
    <p>Chef: {{ burger.chef }}</p>
    <div v-if="store">
      <button class="addCartButton">
        <i class="material-icons">add_shopping_cart</i>
      </button>
    </div>
    <div v-else>
      <button class="editButton" @click="openEdit" v-if="burger.chef === username && editing === false">
        <i class="material-icons">create</i>
      </button>
      <button class="editButton" @click="closeEdit" v-else-if="burger.chef === username && editing">
        <i class="material-icons">save</i>
      </button>
      <button class="deleteButton" @click="deleteBurger" v-if="burger.chef === username">
        <i class="material-icons">delete</i>
      </button>
    </div>
  </div>
</template>

<script>
import { axiosHandler } from '../mixins/axiosHandler'

export default {
  name: 'burger-card',

  mixins: [axiosHandler],

  data() {
    return {
      editing: false,
      addingNewIng: false,
      newIng: '',
      burgerTitle: '',
      burgerPrice: ''
    }
  },

  props: {
    burger: {
      type: Object,
      required: true
    },

    username: {
      type: String,
      required: true
    },

    store: {
      type: String,
      required: false
    }

  },

  computed: {

  },

  methods: {
    openEdit() {
      this.editing = true
    },

    closeEdit() {
       let settingsObj = {
        url: 'https://my-json-server.typicode.com/thonixon321/burgersDB/burgers/'+this.burger.id,
        method: 'PUT',
        callBack: this.updateBurgerResponse
      }

      //make axios call to update burger
      this.sendAxios({}, settingsObj)

    },

    updateBurgerResponse(res) {
      console.log(res)
      this.editing = false
      this.newIng = ''
      //calls the action that updates the burger
      this.$store.dispatch('burger/updateBurger', this.burger)
    },

    deleteBurger() {
      let settingsObj = {
        url: 'https://my-json-server.typicode.com/thonixon321/burgersDB/burgers/'+this.burger.id,
        method: 'DELETE',
        callBack: this.deleteBurgerResponse
      }

      //make axios call to delete burger
      this.sendAxios({}, settingsObj)
    },

    deleteBurgerResponse(res) {
      console.log(res)
      this.$store.dispatch('burger/deleteBurger', this.burger.id)
    },

    addNewIng() {
      this.addingNewIng = false;

      this.burger.ingredients.push(this.newIng)

      this.newIng = ''

    },

    removeIng(ing) {
      let index = this.burger.ingredients.indexOf(ing)

      this.burger.ingredients.splice(index, 1)
    }
  },

  mounted(){
    console.log(this.burger)
  }
}
</script>

<style scoped>
.card {
  position: relative;
  background: white;
  min-width: 20em;
  max-width: 25em;
  padding: 3em;
  border: 1px solid black;
  border-radius: 5px;
  margin: 2em;
}

img {
  border-radius: 50%;
  width: 9em;
  height: 9em;
  position: absolute;
  top: .42em;
  right: 1em;
}

h2, #burgerTitle {
  max-width: 7em;
}

li {
  display: inline-block;
  list-style-type: none;
  border: 1px rgb(201, 198, 198) solid;
  border-radius: 6px;
  background: rgb(201, 198, 198);
  padding: .42em;
  text-align: center;
  width: auto;
  margin: .41em;
}

li button {
  position: relative;
  top: -1.2em;
  right: -1.2em;
  transform:scale(.68);
  border-radius: 50%;
  padding: .1em;
  color: white;
  background: black;
  text-align: center;
  border: none;
  cursor: pointer;
}

li button i {
  position: relative;
  top: .061em;
}

.addNewIng {
  text-decoration: underline;
  color: rgb(92, 92, 240);
  background: transparent;
  border: none;
  cursor: pointer;
}

.addNewIng i {
  position: relative;
  top: .2em;
}

#newIng {
  padding-left: .53em;
}

button.deleteButton {
  position: absolute;
  bottom: -1.2em;
  right: 2em;
  background: tomato;
  border-radius: 50%;
  border: none;
  color: white;
  width: 4em;
  height: 4em;
  cursor: pointer;
  transition: .2s ease-in-out;
}

button.addCartButton {
  position: absolute;
  bottom: -1.2em;
  right: 2em;
  background: limegreen;
  border-radius: 50%;
  border: none;
  color: white;
  width: 4em;
  height: 4em;
  cursor: pointer;
  transition: .2s ease-in-out;
}

button.editButton {
  position: absolute;
  bottom: -1.2em;
  right: 6.83em;
  background: rgb(92, 92, 240);
  border-radius: 50%;
  border: none;
  color: white;
  width: 4em;
  height: 4em;
  cursor: pointer;
  transition: .2s ease-in-out;
}

button.editButton:hover, button.deleteButton:hover {
  transform: scale(1.1);
}

#burgerTitle {
  font-size: 1.4em;
  font-weight: bold;
}

.field {
  display: flex;
  flex-direction: column;
}

input {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px black solid;
  max-width: 7em;
  margin-bottom: .83em;
}

</style>