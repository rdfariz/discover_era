<template>
  <v-card flat class="pa-1">
    <v-container grid-list-xs fluid>
      <v-layout row wrap>
        <slot name="leftContent" />
        <slot name="rightContent" />
      </v-layout>
      <slot name="append" />
    </v-container>
  </v-card>
</template>

<script>
export default {
}
</script>
