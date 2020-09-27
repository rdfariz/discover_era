<template>
  <div>
    <v-sheet class="bg-info" :color="content.background_color.color || 'transparent'" width="100%" :height="content.background_height || 'auto'">
      <v-img v-if="content.background" :src="content.background" :contain="content.background_contain" height="100%" />
    </v-sheet>
    <Container>
      <v-layout>
        <v-flex xs12>
          <Read :story="story" />
        </v-flex>
      </v-layout>
    </Container>
  </div>
</template>
<script>
import global from '@/mixins/global'
import infoDetail from '@/mixins/infoDetail'
import Container from '@/components/container/'
import Read from '@/components/blog/read'

export default {
  components: {
    Container,
    Read
  },
  mixins: [global, infoDetail]
}
</script>
