import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ec137f',
        secondary: colors.blue.base,
        accent: colors.red.base,
      },
    },
  },
});
