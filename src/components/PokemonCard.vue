<template>
  <div class="mb-4 cursorPointer" @click="handleClick">
    <div class="pokemon-card" v-if="pokemon">
      <div
        class="imageContainer"
        :class="{ 'skeleton-loading': !imageLoaded }"
        ref="imageContainer"
      ></div>

      <div class="pokemon-title">{{ pokemon.name }}</div>
      <div class="pokemon-id">#{{ pokemonData.id.value }}</div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';

export default {
  props: {
    pokemon: Object,
  },
  setup(props, { root }) {
    const imageLoaded = ref(false);
    const imageContainer = ref(null);
    const pokemonData = props.pokemon;

    pokemonData.id = computed(() => {
      const { url } = pokemonData;
      const re = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/(\d+)\//i;
      return url.match(re)[1];
    });

    function setImage() {
      const img = new Image();
      const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonData.id.value}.png`;
      pokemonData.imageUrl = imageUrl;

      img.src = imageUrl;
      img.onload = () => {
        imageLoaded.value = true;
        imageContainer.value.style.backgroundImage = `url(${imageUrl})`;
      };
    }

    function handleClick() {
      root.$router.push({ path: `/pokemon/${pokemonData.name}` });
    }

    setImage();

    return {
      imageLoaded,
      imageContainer,
      handleClick,
      pokemonData,
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
  background-size: 80%;
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
  .pokemon-card:hover .imageContainer {
    transition: all 0.3s ease-out;
    background-color: #99ccff;
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
