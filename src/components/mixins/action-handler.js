export default {
  methods: {
    actionClick(action) {
      if (this._.isFunction(this[action])) this[action]();
    }
  }
};
