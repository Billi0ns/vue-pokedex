<template>
  <div class="mb-4">
    <div class="pokemon-card">
      <div
        class="imageContainer cursorPointer"
        :class="{ 'skeleton-loading': !imageLoaded }"
        ref="imageContainer"
        @click="handleClick"
      ></div>

      <div class="cursorPointer pokemon-title">{{ pokemon.name }}</div>
      <div class="pokemon-id">#{{ pokemonInfo.id }}</div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';
// import router from '@/router';

export default {
  props: {
    pokemon: Object,
  },
  setup(props, { root }) {
    const imageLoaded = ref(false);
    const imageContainer = ref(null);
    const pokemonInfo = props.pokemon;

    const pokemonID = computed(() => {
      const { url } = pokemonInfo;
      const re = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/(\d+)\//i;
      return url.match(re)[1];
    });
    pokemonInfo.id = pokemonID.value;

    function setImage() {
      const img = new Image();
      const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonInfo.id}.png`;
      pokemonInfo.imageUrl = imageUrl;

      img.src = imageUrl;
      img.onload = () => {
        imageLoaded.value = true;
        imageContainer.value.style.backgroundImage = `url(${imageUrl})`;
      };
    }

    function handleClick() {
      root.$store.commit('setCurrentPokemon', pokemonInfo);
      root.$router.push({ path: `/pokemon/${pokemonInfo.name}` });
    }

    setImage();

    return {
      imageLoaded,
      imageContainer,
      pokemonInfo,
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.pokemon-card {
  border: 1px solid #eee;
}

.imageContainer {
  width: 100%;
  padding: 50%;
  margin-bottom: 10px;
  background-color: $white-light;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
  background-size: 90%;
  position: relative;
}

.cursorPointer {
  cursor: pointer;
}

.pokemon-title {
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 5px;
  text-transform: capitalize;
}

.pokemon-id {
  font-weight: bold;
  margin-bottom: 10px;
}

@media (min-width: 992px) {
  .pokemon-card:hover .imageContainer::after {
    content: '';
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}

// Skeleton Loading Animation
.skeleton-loading {
  background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
  animation: shine 1.5s infinite linear;
  background-size: 300px;
  background-repeat: repeat;
}

@keyframes shine {
  0% {
    background-position: -100px;
  }
  40%,
  100% {
    background-position: 200px;
  }
}
</style>
