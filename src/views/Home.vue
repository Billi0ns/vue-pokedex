<template>
  <div class="home">
    <main class="container">
      <div class="row ">
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
import { onMounted, reactive } from '@vue/composition-api';
import PokemonCard from '@/components/PokemonCard.vue';

export default {
  name: 'Home',
  components: {
    PokemonCard,
  },
  setup() {
    const state = reactive({
      pokemons: [],
      offset: 12,
      limit: 12,
    });

    let debounceTimer;
    async function onscroll() {
      if (debounceTimer) {
        window.clearTimeout(debounceTimer);
      }

      debounceTimer = window.setTimeout(() => {
        const scrollHeight = document.body.clientHeight;
        const scrollPos = window.innerHeight + window.pageYOffset;
        let isExecuted = false;

        if (state.offset > 144) {
          return;
        }

        if (
          // eslint-disable-next-line operator-linebreak
          (scrollHeight - 300 >= scrollPos) / scrollHeight === 0 &&
          !isExecuted
        ) {
          const url = `https://pokeapi.co/api/v2/pokemon?limit=${state.limit}&offset=${state.offset}`;
          isExecuted = true;

          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              state.pokemons.push(...data.results);
              state.offset += 12;
              if (state.offset === 144) {
                state.limit = 7;
              }
              isExecuted = false;
            })
            .catch((err) => console.log(err));
        }
      }, 200);
    }

    onMounted(() => {
      window.addEventListener('scroll', onscroll);
    });

    async function fetchPokemon() {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=12';
      const res = await fetch(url);
      const data = await res.json();
      state.pokemons = data.results;
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
