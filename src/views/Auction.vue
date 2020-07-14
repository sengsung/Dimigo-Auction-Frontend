<template>
  <v-layout wrap column justify-start>
    <v-card
      class="d-flex justify-center align-center mx-6 mt-4 mb-0"
      @click="dialog = true"
    >
      <v-icon
        class="my-2"
        large
      >mdi-plus-circle-outline</v-icon>
    </v-card>

    <v-layout wrap row justify-start class="ma-4 mt-2">
      <v-flex xs12 sm6 md4 v-for="(item, i) in items" :key="i" class="pa-2">
        <v-card
          class="d-flex flex-column align-center pa-4"
          @click="$router.push(`/auctions/${item._id}`)"
        >
          <v-img
            :src="`//localhost/img/${item._id}`"
            :aspect-ratio="16/9"
            contain
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

          <div class="my-2 d-flex flex-row" style="width: 100%">
            <div
              class="mr-2"
              style="flex: 1; font-size: 20px; font-weight: 600;"
            >{{ item.title }}</div>

            <div style="white-space: nowrap;">
              <template v-if="new Date(item.until).getDate() - new Date().getDate() > 0">
                {{ new Date(item.until).getDate() - new Date().getDate() }}일 남음
              </template>

              <template v-else-if="new Date(item.until).getDate() - new Date().getDate() < 0">
                {{ new Date().getDate() - new Date(item.until).getDate() }}일 지남
              </template>

              <template v-else>
                오늘까지
              </template>
            </div>
          </div>

          <div style="width: 100%">
            <div>
              <span>현재: {{ item.currentPrice }}원</span>
              <span class="mr-4" style="position: absolute; right: 0">{{ item.maxPrice }}원</span>
            </div>

            <v-progress-linear
              active
              height="30px"
              :value="item.currentPrice / item.maxPrice * 100"
            />
          </div>
        </v-card>
      </v-flex>

      <v-card
        v-if="isMoreItems"
        class="d-flex justify-center align-center mx-2 mt-2"
        width="100%"
        @click="getList()"
      >
        <v-icon
          class="my-2"
          large
        >mdi-dots-horizontal</v-icon>
      </v-card>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="600">
       <v-card>
        <v-card-title>
          <span class="headline mt-2">경매 등록</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="form.valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="상품명"
                  name="productName"
                  v-model="form.name"
                  :rules="form.rules.name"
                  required
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  label="상품설명"
                  name="productDesc"
                  v-model="form.desc"
                  :rules="form.rules.desc"
                  rows="4"
                  no-resize
                  required
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="상품정가"
                  name="price"
                  type="number"
                  :rules="form.rules.price"
                  suffix="￦"
                  v-model="form.price"
                  required
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="상한가"
                  :value="Math.floor(+form.price * 0.8 / 100) * 100"
                  suffix="￦"
                  disabled
                />
              </v-col>

              <v-col cols="12">
                <v-file-input
                  label="상품사진"
                  :rules="form.rules.file"
                  v-model="formImage"
                  accept="image/*"
                  show-size
                  prepend-icon="mdi-camera"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary darken-1" class="mb-4" text @click="dialog = false">취소</v-btn>
          <v-btn color="primary darken-1" class="mr-4 mb-4" depressed @click="submit()">등록</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Auction extends Vue {
  // title='경매장';

  // desc='가격을 정하기 애매하고 그냥 팔기는 재미없다! 이럴때 경매장을 이용해보세요.';
  currentItemPage = 1;

  isMoreItems = false;

  items: any = [
    // {
    //   _id: '123',
    //   title: '뜨끈하고 든든한 국밥 한 그릇',
    //   currentPrice: 1000,
    //   maxPrice: 5000,
    //   until: new Date().getTime() - 1000 * 60 * 60 * 24 * 2,
    // },
  ];

  dialog = false;

  formImage: any = null;

  form = {
    name: '',
    desc: '',
    price: 0,

    valid: false,
    rules: {
      name: [
        v => !!v || '상품명을 입력해주세요!',
        v => v.length <= 50 || '상품명은 50자 이내여야 합니다.',
      ],
      desc: [
        v => !!v || '상품설명을 입력해주세요!',
        v => v.length <= 200 || '상품설명은 200자 이내여야 합니다.',
      ],
      price: [
        v => !!v || '상품정가를 입력해주세요!',
        v => !(v % 100) || '상품정가는 100원 단위여야 합니다.',
        v => v >= 1000 || '상품정가는 1000원 이상이어야 합니다.',
        v => v <= 100000 || '상품정가는 10만원 이하여야 합니다.',
      ],
      file: [
        v => !!v || '파일을 선택해주세요!',
        v => !v || v.size < 5000000 || '파일은 5MB 이하여야 합니다.',
      ],
    },
  }

  async submit() {
    (this.$refs.form as any).validate();
    if (!this.form.valid) return;

    const formData = new FormData();
    formData.append('title', this.form.name);
    formData.append('desc', this.form.desc);
    formData.append('price', this.form.price.toString());
    formData.append('image', this.formImage);

    const { data } = await this.$axios.post('/auctions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!data) return;

    switch (data.status) {
      case 200:
        this.$router.push(`/auctions/${data.auctionId}`);
        break;
      case 409:
        this.$emit('alert', '이미 진행 중인 경매가 있어요..!');
        break;
      default:
        this.$emit('alert', '등록에 실패했습니다.');
    }
  }

  created() {
    this.getList();
  }

  async getList() {
    const { data } = await this.$axios.get(`/auctions?page=${this.currentItemPage}`);
    if (!data) return;

    this.items.push(...data.auctions);
    this.currentItemPage += 1;

    if (data.auctions.length < 10) {
      this.isMoreItems = false;
    } else {
      this.isMoreItems = true;
    }
  }
}
</script>

<style lang="scss">
</style>
