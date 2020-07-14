<template>
  <v-layout
    wrap
    justify-center
    :align-start="this.$vuetify.breakpoint.width < 600"
    :align-center="this.$vuetify.breakpoint.width >= 600"
    fill-height
  >
    <v-layout wrap row class="mx-6 mt-6" style="max-width: 1200px">
      <v-flex xs12 sm6 md6 class="pa-2">
        <v-img
          :src="auction._id ? `//localhost/img/${auction._id}` : ''"
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
      </v-flex>

      <v-flex xs12 sm6 md6 class="pa-2">
        <div style="font-weight: 600; font-size: 38px">
          {{ auction.title }}
        </div>

        <div class="ml-1" style="font-size: 18px">
          {{ auction.desc }}
        </div>

        <div class="ml-1 mt-1" style="font-size: 15px">
          게시자: {{ auction.user.serial }} {{ auction.user.name }}
        </div>

        <v-divider class="mt-2 mb-4" />

        <div class="d-flex flex-row">
          <v-form
            ref="form"
            v-model="valid"
            style="flex: 1;"
            v-on:submit.prevent=""
          >
            <v-text-field
              label="입찰가"
              name="price"
              type="number"
              v-model="price"
              :rules="priceRules"
              suffix="￦"
              required
            />
          </v-form>

          <v-btn
            depressed
            large
            color="primary"
            class="ml-6"
            @click="apply()"
          >
            부르기!
          </v-btn>
        </div>

        <v-alert
          type="error"
          :value="alert"
          text
          transition="scroll-y-transition"
        >
          <div class="grow">{{ errMessage }}</div>
        </v-alert>

        <div style="width: 100%">
          <div class="d-flex flex-row">
            <div style="flex: 1">현재: {{ auction.currentPrice }}원</div>
            <div>{{ auction.maxPrice }}원</div>
          </div>

          <v-progress-linear
            active
            height="30px"
            :value="auction.currentPrice / auction.maxPrice * 100"
          />
        </div>

        <div class="mt-2" style="width: 100%">
          <div class="d-flex flex-row" style="font-size: 14px;">
            <div style="flex: 1;">
              마지막 입찰자: {{ auction.lastUser.serial }} {{ auction.lastUser.name }}
            </div>
            <div
              v-if="me && auction.lastUser._id === me._id"
              style="color: red; font-weight: 600;"
            >
              마지막이 나였음
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class AuctionDetail extends Vue {
  @Prop() me: any;

  auctionId = '';

  auction: any = {
    user: {},
    lastUser: {},
  };

  valid = false;

  alert = false;

  errMessage = '';

  price = 0;

  priceRules: any = [];

  async created() {
    this.auctionId = this.$route.params.auctionId;
    await this.getAuction();

    this.$socket.emit('joinA', this.auctionId);

    this.priceRules.push(...[
      v => !!v || '값을 입력해주세요!',
      v => v > this.auction.currentPrice || '입찰가는 현재가격보다 커야 합니다.',
      v => v <= this.auction.maxPrice || '입찰가는 최대가격보다 작아야 합니다.',
      v => !(v % 100) || '입찰가는 100원 단위여야 합니다.',
    ]);
  }

  beforeDestroy() {
    this.$socket.emit('leaveA', this.auctionId);
  }

  async getAuction() {
    const { data } = await this.$axios.get(`/auctions/${this.auctionId}`);
    if (!data) return;

    switch (data.status) {
      case 200:
        break;
      case 404:
        this.$emit('alert', '페이지를 찾을 수 없습니다.');
        this.$router.push('/');
        return;
      default:
        return;
    }

    this.auction = data.auction;
  }

  async apply() {
    (this.$refs.form as any).validate();
    if (!this.valid) return;

    const { data } = await this.$axios.post(`/auctions/apply/${this.auctionId}`, {
      price: this.price,
    });
    if (!data) return;

    switch (data.status) {
      case 200:
        this.alert = false;
        break;
      case 403:
        this.alert = true;
        this.errMessage = '본인이 등록한 경매에는 입찰할 수 없습니다.';
        return;
      case 400:
        this.alert = true;
        this.errMessage = '입찰가에 문제가 있습니다.';
        return;
      case 404:
        this.alert = true;
        this.errMessage = '경매를 찾을 수 없습니다.';
        return;
      case 423:
        this.alert = true;
        this.errMessage = '경매가 진행 중이 아닙니다.';
        return;
      case 409:
        this.alert = true;
        this.errMessage = '처리 중 문제가 발생했습니다..! 다시 시도해주세요';
        break;
      default:
    }
  }

  updateAuction(data: any) {
    // eslint-disable-next-line no-underscore-dangle
    if (data._id !== this.auctionId) return;

    this.auction.currentPrice = data.price;
    // eslint-disable-next-line no-underscore-dangle
    this.auction.lastUser._id = data.user;
  }
}
</script>
