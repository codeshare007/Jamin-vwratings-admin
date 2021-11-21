<template>
  <div class="default-theme">
    <HeaderBar/>
    <b-container fluid>
      <b-row>
        <SideNavBar/>
        <main class="default-theme__main">
          <div class="default-theme__container">
            <b-container fluid class="p-0 h-100">
              <router-view/>
            </b-container>
          </div>
        </main>
      </b-row>
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
  &__main {
    margin-top: 20px;
    width: 100%;
    @media screen and (min-width: 768px) {
      width: calc(100% - 240px);
      padding-left: 20px
    }
  }

  &__container {
    height: calc(100% - 100px);
    display: flex;
    justify-content: flex-start;
  }
}
</style>