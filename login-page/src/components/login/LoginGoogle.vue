<template>
  <img
    class="google-login"
    src="@/assets/imgs/google.png"
    alt="구글 로그인"
    @click="clickGoogleLogin"
  />
</template>

<script>
import { googleLogin } from '@/services/login';

export default {
  name: 'LoginGoogle',
  setup(props, { root }) {
    const clickGoogleLogin = async () => {
      await googleLogin();
      root.$router.push('/');
    };

    return {
      clickGoogleLogin,
    };
  },
}
</script>

<style lang="scss" scoped>
.google-login {
  width: 40px;
  cursor: pointer;
}
</style>