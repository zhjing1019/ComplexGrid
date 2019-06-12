import { request } from "@/common/utils/api.js";

// 通用查询的mixin，使用者必须定义有queryInfo
export default {
  data() {
    return {
      data: [],
      orders: [],
      itemConditions: {}
    };
  },
  methods: {
    queryChange(_uid, condition) {
      let uid = _uid.toString();
      if (condition == null) delete this.itemConditions[uid];
      this.$set(this.itemConditions, uid, condition);
      const keys = Object.keys(this.itemConditions);
      this.queryInfo.conditions = keys.length == 0 ? null : keys.map(key => this.itemConditions[key]);
      this.$nextTick(this.doQuery);
    },
    doQuery() {
      request("query", this.queryInfo).then(result => (this.data = result.data));
    }
  }
};
