<template>
  <v-app id="app">
    <v-app-bar
      app
      color="primary"
      flat
      dark
      hide-on-scroll
      :value="!!me.name"
    >
      <div
        class="d-flex align-center"
        style="cursor: pointer;"
        @click="$router.push('/').catch(() => {})"
      >
        <v-icon
          large
        >mdi-basket</v-icon>

        <span
          class="title ml-3"
        >디미장터</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        target="_blank"
        text
        @click="showDialog()"
      >
        <span>{{ me.name }}</span>
      </v-btn>

      <v-btn
        target="_blank"
        text
        @click="logout()"
      >
        <span>로그아웃</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view ref="routerView" :me="me" @login="getMe()" @alert="alert" />
    </v-content>

    <v-dialog v-model="dialog" max-width="800">
      <v-card class="pa-4">
        <div>
          <div style="font-weight: 600; font-size: 30px">
            내가 등록한 경매
          </div>

          <div
            class="overflow-x-auto"
            style="white-space: nowrap; min-height: 254px"
          >
            <v-card
              class="my-2 mr-2 d-inline-block pa-2"
              style="width: 200px"
              v-for="(auction, i) in myAuctions"
              :key="i"
              @click="go(auction._id)"
            >
              <v-img
                :src="`//localhost/img/${auction._id}`"
                :aspect-ratio="1"
                width="100%"
                class="lighten-3"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular color="primary" indeterminate />
                  </v-row>
                </template>
              </v-img>

              <div class="mt-2" style="font-weight: 600; font-size: 20px">
                {{ auction.title }}
              </div>
            </v-card>
          </div>
        </div>

        <v-divider class="my-2" />

        <div>
          <div style="font-weight: 600; font-size: 30px">
            내가 입찰한 경매
          </div>

          <div
            class="overflow-x-auto"
            style="white-space: nowrap; min-height: 254px"
          >
            <v-card
              class="my-2 mr-2 d-inline-block pa-2"
              style="width: 200px"
              v-for="(auction, i) in myApplies"
              :key="i"
              @click="go(auction._id)"
            >
              <v-img
                :src="`//localhost/img/${auction._id}`"
                :aspect-ratio="1"
                width="100%"
                class="lighten-3"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular color="primary" indeterminate />
                  </v-row>
                </template>
              </v-img>

              <div class="mt-2" style="font-weight: 600; font-size: 20px">
                {{ auction.title }}
              </div>
            </v-card>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      top
      color="error"
      :timeout="3000"
    >
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  me = {
    _id: 0,
    name: '',
    serial: '',
  };

  myAuctions: any = [];

  myApplies: any = [];

  dialog = false;

  snackbar = false;

  snackbarMessage = '';

  created() {
    this.$parent.$on('alert', this.alert);
    this.getMe();

    this.$socket.on('a', data => {
      try {
        (this.$refs.routerView as any).updateAuction(data);
      // eslint-disable-next-line no-empty
      } catch { }
    });
  }

  showDialog() {
    this.getMyAuction();
    this.dialog = true;
  }

  async getMe() {
    const { data } = await this.$axios.get('/users/me');
    if (!data) return;

    this.me = {
      // eslint-disable-next-line no-underscore-dangle
      _id: data.user._id,
      name: data.user.name,
      serial: data.user.serial,
    };
  }

  async getMyAuction() {
    const { data } = await this.$axios.get('/auctions/me');
    if (!data) return;

    this.myAuctions = data.auctions;
    this.myApplies = data.auctionApplies;
  }

  go(auctionId: string) {
    this.$router.push(`/auctions/${auctionId}`).catch(() => {});
    this.dialog = false;
  }

  logout() {
    this.$axios.post('/auth/revoke');
    this.me = {
      _id: 0,
      name: '',
      serial: '',
    };
    this.$router.push('/login');
  }

  alert(msg) {
    this.snackbarMessage = msg;
    this.snackbar = true;
  }
}
</script>

<style lang="scss">
body {
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
