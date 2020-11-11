<template>
  <main class="container my-md-4">
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-xs-12 col-md-6 col-lg-5 image-container">
        <b-img :src="imageUrl" class="pokemon-image"></b-img>
      </div>
      <div class="col-xs-12 col-md-6 col-lg-5 text-left">
        <h1 class="pokemon-name">{{ pokemon.id }}. {{ pokemon.name }}</h1>

        <div>Height: {{ pokemonInfo.height }}</div>
        <div>Weight: {{ pokemonInfo.weight }}</div>
        <div>Type:</div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, reactive } from '@vue/composition-api';

export default {
  setup(_, { root }) {
    const pokemonID = ref(root.$store.state.currentPokemon.id);
    const imageUrl = ref(root.$store.state.currentPokemon.imageUrl);
    let pokemon = reactive({});

    function getProductInfo() {
      console.log(pokemonID.value);
    }

    function setPokemonInfo() {
      const { currentPokemon } = root.$store.state;

      if (Object.keys(currentPokemon).length !== 0) {
        pokemon = currentPokemon;
      } else {
        getProductInfo();
      }
    }

    setPokemonInfo();

    return {
      pokemon,
      imageUrl,
    };
  },
  data() {
    return {
      url: this.$store.state.currentPokemon.url,
      pokemonInfo: {},
    };
  },
  methods: {
    async fetchPokemon() {
      const res = await fetch(this.url);
      const data = await res.json();
      this.pokemonInfo = data;
      console.log(data);
      console.log(this.pokemonInfo.height);
      // types
    },
  },
  created() {
    this.fetchPokemon();
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

@media (min-width: 768px) {
  .image-container {
    padding: 0 15px;
  }
}
</style>
