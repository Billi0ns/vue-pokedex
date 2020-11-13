<template>
  <header class="mb-3 fixed-top">
    <b-navbar toggleable="md" type="light" class="customNav">
      <b-navbar-nav>
        <b-navbar-brand>
          <span @click="handleClick" class="clearQuery">Pokedex</span>
          <a href="https://github.com/Billi0ns/vue-pokemon">
            <img
              src="../assets/github-brands.svg"
              width="20px"
              class="github"
            />
          </a>
        </b-navbar-brand>
      </b-navbar-nav>

      <b-navbar-toggle
        target="nav-collapse"
        class="navbarToggle"
      ></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar class="ml-auto">
          <b-nav-form>
            <b-form-input
              class="mr-sm-2"
              placeholder="Search"
              v-model="query"
              @keydown.enter.prevent="handleClick"
            ></b-form-input>
            <b-button
              variant="outline-success"
              class="my-2 my-sm-0"
              @click="handleClick"
            >
              Search
            </b-button>
          </b-nav-form>
        </b-navbar>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { ref, watch } from '@vue/composition-api';

export default {
  setup(_, { root }) {
    const query = ref('');

    watch(query, () => {
      root.$store.commit('setQuery', query.value.toLowerCase());
    });

    function handleClick(event) {
      const path = '/';
      if (root.$route.path !== path) {
        root.$router.push(path);
      }

      if (event.target.className === 'clearQuery') {
        query.value = '';
      }
    }

    return {
      query,
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.customNav {
  background: white;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
}

.fixed-top {
  z-index: 10;
}

.github {
  margin-left: 15px;

  &:hover {
    transform: rotate(360deg);
    transition: all 0.8s ease;
  }
}

@media (min-width: 992px) {
  .navbar-brand {
    transform: translateX(-50%) translateY(-50%);
    left: 50%;
    position: absolute;
    cursor: pointer;
  }

  .navbar-collapse {
    padding: 15px 0;
  }
}
</style>
