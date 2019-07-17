export default {
  methods: {
    handleQueryChange (conditions) {
      this.$emit('query-change', this._uid, conditions)
    }
  }
}
