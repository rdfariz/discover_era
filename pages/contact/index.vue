<template>
  <Background color="primary" min-height="100vh" height="100%">
    <Container>
      <v-layout row wrap>
        <v-flex xs12 md6 lg7 class="pa-2">
          <v-card dark color="transparent" flat>
            <form>
              <v-card-title primary-title class="relative">
                <v-layout column wrap>
                  <p class="mb-0">
                    Punya keluhan di layanan kami?
                  </p>
                  <h1 class="lg">
                    Kirim Pesan aja
                  </h1>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  :counter="10"
                  label="Nama"
                  color="white"
                  placeholder="Masukkan nama kamu"
                  outlined
                  autofocus
                />
                <v-textarea
                  name="input-7-1"
                  label="Pesan"
                  placeholder="Masukkan pesan kamu"
                  value=""
                  color="white"
                  outlined
                />
                <v-btn
                  class="mr-4 text-capitalize"
                  depressed
                >
                  Kirim
                </v-btn>
              </v-card-text>
            </form>
          </v-card>
        </v-flex>
        <v-flex xs12 md6 lg5 class="pa-2">
          <v-list
            subheader
            two-line
            color="transparent"
            dark
          >
            <v-list-item>
              <v-list-item-avatar>
                <v-icon
                  class="primary lighten-1"
                  dark
                >
                  mdi-facebook
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Facebook</v-list-item-title>

                <v-list-item-subtitle>Fullmoon.id</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon>mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon
                  class="primary lighten-1"
                  dark
                >
                  mdi-twitter
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Twitter</v-list-item-title>

                <v-list-item-subtitle>Fullmoon.id</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon>mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon
                  class="primary lighten-1"
                  dark
                >
                  mdi-google-maps
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Address</v-list-item-title>

                <v-list-item-subtitle>Fullmoon.id</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon>mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-card width="100%" height="300" color="transparent" flat>
                <iframe
                  width="100%"
                  height="300"
                  frameborder="0"
                  style="border:0"
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB6zVlXtHggt-o3UnvgmDRJ0AxppFhFYPI
                    &q=Telkom+University"
                  allowfullscreen
                />
              </v-card>
            </v-list-item>
          </v-list>
        </v-flex>
      </v-layout>
    </Container>
  </Background>
</template>

<script>
import Container from '@/components/container'
export default {
  components: {
    Container
  },
  head () {
    return {
      title: 'Contact - Fullmoon'
    }
  }
}
</script>
