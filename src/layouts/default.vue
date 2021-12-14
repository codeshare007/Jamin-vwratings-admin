<template>
  <div class="default-theme">

    <header-bar />
    <b-container fluid class="p-0 d-flex">
      <side-nav-bar />
      <div class="default-theme__main">
        <div class="default-theme__inner">
          <router-view />
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
import HeaderBar from '@/components/layout/HeaderBar';
import SideNavBar from '@/components/layout/SideNavBar';

export default {
  components: {
    HeaderBar,
    SideNavBar
  }
}
</script>
<style lang="scss">
.default-theme {
  width: 100%;

  &__main {
    width: 100%;
    height: 92vh;
    overflow: hidden;
  }

  &__inner {
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 10px 15px;
    height: 100%;
  }

  &__container {
    height: calc(100% - 100px);
    display: flex;
    justify-content: flex-start;
  }
}
</style>