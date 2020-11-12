<template>
  <main class="container my-md-4" v-if="pokemon !== null">
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-xs-12 col-md-6 col-lg-5 image-container">
        <b-img :src="imageUrl" class="pokemon-image"></b-img>
      </div>
      <div class="col-xs-12 col-md-6 col-lg-5 text-left">
        <h1 class="pokemon-name">{{ pokemon.id }}. {{ pokemon.name }}</h1>

        <div>Height: {{ pokemon.height }}</div>
        <div>Weight: {{ pokemon.weight }}</div>
        <div>Type: {{ pokemon.types }}</div>
        <div>Abilities: {{ pokemon.abilities }}</div>
      </div>
    </div>
  </main>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, reactive } from '@vue/composition-api';

export default {
  data() {
    return {
      url: this.$store.state.currentPokemon.url,
      imageUrl: this.$store.state.currentPokemon.imageUrl,
      // pokemon: this.$store.state.currentPokemon,
      pokemon: null,
    };
  },
  methods: {
    async fetchPokemon() {
      console.log(this.$route.params.name);
      const url = `https://pokeapi.co/api/v2/pokemon/${this.$route.params.name}`;
      const res = await fetch(url);
      const data = await res.json();
      const pokemonTypes = [];
      const pokemonAbilities = [];
      this.pokemon = data;
      this.imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${this.pokemon.id}.png`;

      this.pokemon.types.forEach((obj) => pokemonTypes.push(obj.type.name));
      this.pokemon.types = pokemonTypes.join(', ');
      this.pokemon.abilities.forEach((obj) => {
        pokemonAbilities.push(obj.ability.name);
      });
      this.pokemon.abilities = pokemonAbilities.join(', ');
    },
  },
  created() {
    const { currentPokemon } = this.$store.state;
    if (Object.keys(currentPokemon).length !== 0) {
      this.pokemon = { ...currentPokemon };
      this.pokemon.id = this.pokemon.id.value;
      this.pokemon.height = this.pokemon.pokemonInfo.height;
      this.pokemon.weight = this.pokemon.pokemonInfo.weight;
      this.pokemon.types = this.pokemon.pokemonInfo.types.join(', ');
      this.pokemon.abilities = this.pokemon.pokemonInfo.abilities.join(', ');
    } else {
      this.fetchPokemon();
    }
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
