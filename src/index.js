import './utils/console';
import createAsyncData from './createAsyncData';

export default {
  install: function (Vue, router, store) {

    const asyncData = createAsyncData({router, store});
    router.beforeResolve(asyncData);

    Vue.mixin({
      async beforeRouteUpdate(to, from, next) {
        const {asyncData} = this.$options;
        if (asyncData) {
          asyncData(to, from, next, Vue, {asyncData});
        } else {
          next();
        }
      },
    });

    console.dev('Init AsyncData plugin');
  },
};
