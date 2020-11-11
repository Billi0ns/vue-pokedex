<template>
  <main class="container my-md-4">
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-xs-12 col-md-6 col-lg-5 image-container">
        <b-img :src="pokemon.imageUrl" class="pokemon-image"></b-img>
      </div>
      <div class="col-xs-12 col-md-6 col-lg-5 text-left">
        <h1 class="pokemon-name">{{ pokemon.name }}</h1>
        <p class="pokemon-id">{{ pokemon.id }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import { reactive } from '@vue/composition-api';

export default {
  setup(_, { root }) {
    let pokemon = reactive({});

    function getProductInfo() {
      console.log('a');
    }

    function setPokemonInfo() {
      const { currentPokemon } = root.$store.state;

      if (Object.keys(currentPokemon).length !== 0) {
        pokemon = currentPokemon;
        root.$store.commit('resetCurrentProduct');
      } else {
        getProductInfo();
      }
    }

    setPokemonInfo();

    return {
      pokemon,
    };
  },
};
</script>

<style lang="scss" scoped>
.image-container {
  padding: 0;
  height: 0;
  margin-bottom: 20px;
  padding-top: 100%;
  position: relative;
}

.pokemon-image {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  height: auto;
  padding: 20px;
  background-color: $white-light;
}

.pokemon-name {
  font-size: 28px;
  color: $blackish-grey;
  text-transform: capitalize;
}

.pokemon-id {
  font-size: 20px;
  font-weight: bold;
  color: $blackish-grey;
}

@media (min-width: 768px) {
  .image-container {
    padding: 0 15px;
  }
}
</style>
