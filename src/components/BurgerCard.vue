<template>
  <div class="card">
    <h2>{{ burger.title }}</h2>
    <p>Price: {{ burger.price }}</p>
    <p>ingredients: </p>
    <ul>
      <li v-for="ing in burger.ingredients" :key="ing">
        {{ ing }}
      </li>
    </ul>
    <p>Chef: {{ burger.chef }}</p>
  </div>
</template>

<script>
export default {
  name: 'burger-card',

  props: {
    burger: {
      type: Object,
      required: true
    }
  },

  mounted(){
    console.log(this.burger)
  }
}
</script>

<style scoped>
.card {
  min-width: 30em;
  padding: 3em;
  border: 1px solid black;
  border-radius: 5px;
  margin: 2em;
}

</style>