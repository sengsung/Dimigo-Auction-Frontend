<!-- eslint-disable max-len -->
<template>
  <div id="login" class="d-flex align-center justify-center">
    <div id="form" class="ma-5">
      <div class="title">
        <span class="text">디미장터</span>
      </div>

      <v-form
        ref="form"
        class="mt-5"
        v-model="valid"
      >
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Dimigo ID"
          @keyup.enter="login()"
          required
        />

        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show ? 'text' : 'password'"
          label="Dimigo Password"
          @click:append="show = !show"
          @keyup.enter="login()"
          required
        />
        <v-btn
          class="btn mt-6"
          @click="login()"
          height="50px"
          depressed
          color="#ec137f"
        >로그인 하기</v-btn>
      </v-form>
      <div class="alert mt-4">
        <v-alert
          type="error"
          :value="alert"
          text
          transition="scroll-y-transition"
        >
          <div class="grow">{{ errMessage }}</div>
        </v-alert>
      </div>
    </div>

    <div class="wave">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" style="display: none;">
        <symbol id="wave">
          <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
          <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
          <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
          <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
        </symbol>
      </svg>
      <div class="box">
        <div id="water" class="water">
          <svg viewBox="0 0 560 20" class="water_wave water_wave_back">
            <use xlink:href="#wave"></use>
          </svg>
          <svg viewBox="0 0 560 20" class="water_wave water_wave_front">
            <use xlink:href="#wave"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  valid= true;

  username= '';

  usernameRules= [v => !!v || '아이디를 입력해주세요!'];

  password= '';

  passwordRules= [v => !!v || '비밀번호를 입력해주세요!'];

  show = false;

  alert = false;

  errMessage = '';

  async login() {
    (this.$refs.form as any).validate();
    if (!this.valid) return;

    const { data } = await this.$axios.post('/auth/authorize', {
      username: this.username,
      password: this.password,
    });
    if (!data) return;

    switch (data.status) {
      case 200:
        break;
      case 404:
        this.password = '';
        this.alert = true;
        this.errMessage = '계정 정보를 확인해주세요!';
        return;
      case 400:
        this.alert = true;
        this.errMessage = '값이 전달되지 않았습니다!';
        return;
      case 403:
        this.alert = true;
        this.errMessage = '학생만 로그인 할 수 있습니다';
        return;
    }
    this.$emit('login');
    if (this.$route.query.redirect) {
      this.$router.push(this.$route.query.redirect as string);
    } else {
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
  #login {
    height: 100vh;

    #form {
      width: 100%;
      max-width: 500px;
      // transform: translateY(-30px);

      .title {
        text-align: center;
        font-size: 50px;
        min-width: 165px;

        .text {
          font-size: 40px;
        }
      }

      .btn {
        width: 100%;
        color: white;
        font-size: 18px;
      }

      .alert {
        height: 58px;
      }
    }
  }

  .wave {
    position: fixed;
    bottom: 0;
    transform: translateY(-140px);
    .box{
      height: 140px;
      width: 100vw;
      overflow: hidden;
      .water{
        position: absolute;
        left: 0;
        top: 0;
        z-index:2;
        width: 100%;
        height: 100%;
        transform:translate(0,100%);
        background:rgb(253, 115, 184);
        transition: all .3s;
        &_wave{
          width: 200%;
          position: absolute;
          bottom: 100%;
          &_back {
            right: 0;
            fill: rgb(255, 180, 218);
            animation: wave-back 2.4s infinite linear;
          }
          &_front {
            left: 0;
            fill: rgb(253, 115, 184);
            margin-bottom: -1px;
            animation: wave-front 1.3s infinite linear;
          }
        }
      }
    }
    @keyframes wave-front {
      100% {
        transform: translate(-50%, 0);
      }
    }

    @keyframes wave-back {
      100% {
        transform: translate(50%, 0);
      }
    }
  }
</style>
