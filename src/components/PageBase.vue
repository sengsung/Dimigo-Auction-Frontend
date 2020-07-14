<template>
  <v-container fluid fill-height>
    <v-layout wrap column>
      <div class="display-1 mt-4" v-if="title">
        {{ title }}
      </div>

      <div class="subtitle-1 pl-1 my-2" v-if="desc">
        {{ desc }}
      </div>

      <slot/>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class PageBase extends Vue {
  @Prop() title!: string;

  @Prop() desc!: string;
}
</script>
