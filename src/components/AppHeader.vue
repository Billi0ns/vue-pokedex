<template>
  <header class="mb-3 fixed-top">
    <b-navbar toggleable="md" type="light" class="customNav">
      <router-link to="/">
        <b-navbar-brand>
          Vue Pokemon
        </b-navbar-brand>
      </router-link>

      <b-navbar-toggle
        target="nav-collapse"
        class="navbarToggle"
      ></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar class="ml-auto">
          <b-nav-form>
            <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button
              variant="outline-success"
              class="my-2 my-sm-0"
              type="submit"
              >Search</b-button
            >
          </b-nav-form>
        </b-navbar>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.customNav {
  background: white;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
}

.fixed-top {
  z-index: 10;
}

@media (min-width: 992px) {
  .navbar-brand {
    transform: translateX(-50%) translateY(-50%);
    left: 50%;
    position: absolute;
  }

  .navbar-collapse {
    padding: 15px 0;
  }
}
</style>
