<template>
	<Spin v-if="spinShow" size="large" fix><Icon type="ios-loading" size="50" class="demo-spin-icon-load" /></Spin>
</template>

<script>
export default {
  data() {
    return {
      spinShow: false,
      accessToken: '',
    };
  },
  methods: {
    // 登录
    login() {
      // let accessToken = this.getUrlParam("accessToken");
      const _this = this;
      this.spinShow = true;
      this.$post({
        data: {
          CONSUMER_ID: 'ConfinedSpace',
          token: this.accessToken,
          SERVICE_CODE: 'szsti.proxy.user.SingleLogin',
        },
        success(res) {
          _this.initUserInfo(res);
        },
        error(res) {
          _this.spinShow = false;
          _this.$Message.error('该账号无登录权限，请检查账号');
          setTimeout(() => {
            _this.logoutMethod();
          }, 2000);
          throw res;
        },
      });
    },
    // 初始化用户信息
    initUserInfo(res) {
      const _this = this;
      // console.log(res.data.BODY.roleId)
      if (_this.rememberStatus) {
        _this.saveUser();
      } else if (localStora.getItem('USER_NAME')) {
        localStora.removeItem('USER_NAME');
      }

      // if(res.data.BODY.data.)
      _this.spinShow = false;
      if (res.data.BODY.roleId == 8 || res.data.BODY.roleId == 9 || res.data.BODY.roleId == 10 || res.data.BODY.roleId == 11) {
        _this.$Message.success('登录成功');
        localStora.setItem('userInfo', JSON.stringify(res.data.BODY));
        _this.$store.commit('setuserInfo', res.data.BODY);
        setTimeout(() => {
          _this.$router.push('/c/HomeView');
          _this.$store.commit('setLog', true);
        }, 1000);
      } else {
        _this.$Message.error('该账号无权限登录!', 4000);
        setTimeout(() => {
          _this.logoutMethod();
        }, 4000);
      }
    },
    logoutMethod() {
			   const accessToken = this.$accessToken;
			   const appCode = 'YXKJ';
			   const timestamp = `${Date.parse(new Date())}`;
			   const sign = this.$md5.md5(appCode + accessToken + timestamp);// hexMD5();
			   this.axios({
			      method: 'post',
			      url: this.$token,
			      headers: {
			         Authorization: accessToken,
			      },
			     data: {
			         appCode,
			         timestamp,
			         sign,
			      },
			   }).then((res) => {
				   location.href = 'http://121.37.249.70/pai/zhzw-user-platform/#/sso/login?appCode=YXKJ';
			   });
    },
  },
  mounted() {
    this.accessToken = this.$accessToken;
    if (this.accessToken) {
      this.login();
    } else {
      this.$nextTick(() => {
        this.$router.push({ path: '/login' });
      });
    }
  },
};
</script>

<style>

</style>
