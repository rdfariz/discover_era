<template>
  <v-list>
    <slot name="append" />
    <v-layout row wrap justify-center align-center>
      <v-flex xs10>
        <template v-for="(item, index) in menu">
          <v-list-group v-if="item.items" :key="index" no-action :disabled="item.disabled" :color="item.disabled ? '' : 'lighten-1'">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">
                  <p class="sm ma-0">
                    {{ item.title }}
                  </p>
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, index_child) in item.items"
              :key="index_child"
              :to="!child.link_external ? child.link : ''"
              :href="child.link_external ? child.link : ''"
              :target="child.link_external ? '_blank' : ''"
              :disabled="child.disabled"
              link
              :color="child.disabled ? '' : 'lighten-1'"
            >
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">
                  <p class="sm ma-0">
                    {{ child.title || '' }}
                  </p>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <Icon small :icon="child.icon_code || item.icon || ''" :variant="child.variant || 'mdi'" />
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <v-list-item
            v-else
            :key="index"
            :to="!item.link_external ? item.link : ''"
            :href="item.link_external ? item.link : ''"
            :target="item.link_external ? '_blank' : ''"
            :disabled="item.disabled"
            link
            :color="item.disabled ? '' : 'lighten-1'"
          >
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">
                <p class="sm ma-0">
                  {{ item.title }}
                </p>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <Icon small :icon="item.icon_code || item.icon || ''" :variant="item.variant || 'mdi'" />
            </v-list-item-icon>
          </v-list-item>
        </template>
      </v-flex>
    </v-layout>
  </v-list>
</template>

<script>
import Icon from '@/components/icon'
export default {
  components: {
    Icon
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  }
}
</script>
