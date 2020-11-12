<template>
  <div class="home">
    <main class="container">
      <div v-if="state.pokemons" class="row">
        <pokemon-card
          v-for="pokemon in state.pokemons"
          :key="pokemon.name"
          :pokemon="pokemon"
          class="col-6 col-md-4 col-lg-3"
        ></pokemon-card>
      </div>
    </main>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api';
import PokemonCard from '@/components/PokemonCard.vue';

export default {
  name: 'Home',
  components: {
    PokemonCard,
  },
  setup() {
    const state = reactive({
      pokemons: [],
    });

    async function fetchPokemonInfo(url) {
      const res = await fetch(url);
      const data = await res.json();
      const pokemonTypes = [];
      const pokemonAbilities = [];

      data.types.map((obj) => pokemonTypes.push(obj.type.name));
      data.abilities.map((obj) => pokemonAbilities.push(obj.ability.name));
      data.types = pokemonTypes;
      data.abilities = pokemonAbilities;

      return data;
    }

    async function fetchPokemon() {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=5';
      const res = await fetch(url);
      const data = await res.json();

      data.results.forEach((pokemon) => {
        (async () => {
          pokemon.pokemonInfo = await fetchPokemonInfo(pokemon.url);
        })();
      });

      (async () => {
        state.pokemons = await data.results;
      })();
    }

    fetchPokemon();

    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 20px;
}
</style>
