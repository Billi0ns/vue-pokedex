<template>
  <div class="home">
    <main class="container">
      <div class="row ">
        <pokemon-card
          v-for="pokemon in state.getPokemons"
          :key="pokemon.name"
          :pokemon="pokemon"
          class="col-6 col-md-4 col-lg-3"
        ></pokemon-card>
        <app-loading
          id="loading-container"
          v-if="!state.fullyLoaded"
          :class="{ hidden: query }"
        ></app-loading>
      </div>
      <div v-if="state.fullyLoaded" class="my-4">
        Icon made by
        <a href="https://fontawesome.com/license">fontawesome.com</a>
      </div>
    </main>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  reactive,
  computed,
  watch,
} from '@vue/composition-api';

import PokemonCard from '@/components/PokemonCard.vue';
import AppLoading from '@/components/AppLoading.vue';

export default {
  name: 'Home',
  components: {
    PokemonCard,
    AppLoading,
  },
  setup(_, { root }) {
    const query = ref(computed(() => root.$store.state.query));
    let filteredPokemons = reactive([]);
    const state = reactive({
      pokemons: [],
      allPokemons: [],
      offset: 12,
      limit: 12,
      fullyLoaded: false,
      getPokemons: computed(() => {
        if (query.value) {
          return filteredPokemons;
        }
        return state.pokemons;
      }),
    });

    function createObserver() {
      const observer = new IntersectionObserver((entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          const url = `https://pokeapi.co/api/v2/pokemon?limit=${state.limit}&offset=${state.offset}`;

          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              state.pokemons.push(...data.results);
              state.offset += 12;
              if (state.limit === 7) {
                state.fullyLoaded = true;
                observer.disconnect();
              }
              if (state.offset === 144) {
                state.limit = 7;
              }
            })
            .catch((err) => console.log(err));
        }
      });

      const bottomElement = document.querySelector('#loading-container');
      observer.observe(bottomElement);
    }

    onMounted(() => {
      createObserver();
    });

    async function fetchPokemon() {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=12';
      const res = await fetch(url);
      const data = await res.json();
      state.pokemons = data.results;
    }

    fetchPokemon();

    async function fetchAllPokemons() {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
      const res = await fetch(url);
      const data = await res.json();
      state.allPokemons = data.results;
    }

    fetchAllPokemons();

    watch(query, () => {
      // eslint-disable-next-line arrow-body-style
      filteredPokemons = state.allPokemons.filter((pokemon) => {
        return pokemon.name.includes(query.value);
      });
    });

    return {
      state,
      query,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 20px;
}

#loading-container {
  width: 100%;
  height: auto;
}

.hidden {
  display: none;
}
</style>
