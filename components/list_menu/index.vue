<template>
  <v-list rounded>
    <slot name="append" />
    <v-layout row wrap justify-center align-center>
      <v-flex xs10>
        <template v-for="(item, index) in menu">
          <v-list-group v-if="item.items" :key="index" no-action :disabled="item.disabled">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, index_child) in item.items"
              :key="index_child"
              :to="child.link"
              :disabled="child.disabled"
              link
              :color="child.disabled ? '' : 'primary'"
            >
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">
                  {{ child.title || '' }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon small>
                  {{ child.icon || child.icon_code || '' }}
                </v-icon>
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
            :color="item.disabled ? '' : 'primary'"
          >
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon small>
                {{ item.icon || item.icon_code || '' }}
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
      </v-flex>
    </v-layout>
  </v-list>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  }
}
</script>
