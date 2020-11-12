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
    });

    async function onscroll() {
      const { scrollY } = window;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      let isExecuted = false;

      if (state.offset >= 156) {
        return;
      }

      if (bottomOfPage || (pageHeight < visible && !isExecuted)) {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${state.offset}`;
        isExecuted = true;

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            state.pokemons.push(...data.results);
            state.offset += 12;
          })
          .catch((err) => console.log(err));

        setTimeout(() => {
          isExecuted = false;
        }, 2000);
      }
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
