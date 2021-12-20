<template>
  <sidebar-menu width="220px" :collapsed="true" :menu="menu">
    <template v-slot:toggle-icon>
      <font-awesome-icon icon="arrows-alt-h"/>
    </template>
    <template v-slot:dropdown-icon>
      <font-awesome-icon icon="angle-right" />
    </template>
  </sidebar-menu>
</template>
<script>
import {SidebarMenu} from 'vue-sidebar-menu'
export default {

  components: {
    SidebarMenu
  },

  data() {
    return {
      menu: [
        {
          href: '/',
          title: 'Dashboard',
          icon: 'fas fa-list'
        },
        {
          href: '/users',
          title: 'Users',
          icon: 'fas fa-users'
        },
        {
          href: '/messages',
          title: 'Messages',
          icon: 'fas fa-mail-bulk'
        },
        {
          href: '/settings',
          title: 'Settings',
          icon: 'fas fa-wrench'
        },
        {
          href: '/avis',
          title: 'Avis',
          icon: 'fas fa-user-tag',
          child: [
            {
              href: 'avis-claims',
              title: 'Claims',
              icon: 'fas fa-hand-paper'
            },
            {
              href: 'avis-comments',
              title: 'Comments',
              icon: 'fas fa-comments'
            },
            {
              href: 'avis-ratings',
              title: 'Ratings',
              icon: 'fas fa-star'
            }
          ]
        },
        {
          href: '/parties',
          title: 'Parties',
          icon: 'fas fa-glass-cheers',
          child: [
            {
              href: 'parties-claims',
              title: 'Claims',
              icon: 'fas fa-hand-paper'
            },
            {
              href: 'parties-comments',
              title: 'Comments',
              icon: 'fas fa-comments'
            },
            {
              href: 'parties-ratings',
              title: 'Ratings',
              icon: 'fas fa-star'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.v-sidebar-menu {
  position: relative;
  height: calc(100vh - 57px);

  .vsm--link_level-1 {
    .vsm--icon {
      padding: 8px;
    }
  }

  .vsm--toggle-btn {
    &:focus {
      outline: 0;
    }
  }

  .vsm--link_level-2 {
    padding: 0 10px;
  }

  .vsm--icon {
    padding: 2px;
  }
}
</style>