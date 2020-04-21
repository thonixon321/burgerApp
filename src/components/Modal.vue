<template>
  <div class="modal" @click.stop="closeModal">
    <div class='modalCard' :class="cardStatus">
      hello everybody!
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',

  data() {
    return {
      cardStatus: 'card-enter'
    }
  },

  computed: {

  },

  methods: {
    closeModal() {
      let self = this

      this.cardStatus = 'card-exit'
      setTimeout(()=>{
        self.$store.dispatch('updateModalStatus', false)
      }, 300)
    }
  }

}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(39, 39, 39, 0.7);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modalCard {
  min-width: 10em;
  height: auto;
  background: white;
  border-radius: 5px;
  transition: ;
}

.card-enter {
  animation: card-enter .3s .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

.card-exit {
  animation: card-exit .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

@keyframes card-enter {
0% {
  transform: scale(0);
}

100% {
  transform: scale(1);
}
}

@keyframes card-exit {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

</style>