<template>
  <div class="home">
    <main class="container">
      <div class="row">
        <pokemon-card
          v-for="pokemon in state.pokemons.results"
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

    async function fetchPokemon() {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=10';
      const res = await fetch(url);
      const data = await res.json();
      state.pokemons = data;
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
