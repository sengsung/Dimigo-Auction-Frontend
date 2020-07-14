<!-- eslint-disable max-len -->
<template>
  <div id="d" class="d-flex align-center justify-center" style="height: 100vh">
    <div
      class="d-flex align-center"
      style="font-weight: 800; font-size: 100px; transform: translateY(-60px)"
    >
      404
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
export default class NotFound extends Vue {

}
</script>

<style lang="scss">
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
