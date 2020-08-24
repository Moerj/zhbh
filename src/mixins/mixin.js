const mixin = {
  methods: {
    back() {
      this.$router.go(-1);
      console.log(this);
    },
  },
};

export default mixin;
