<template>
  <div>
    User Item
  </div>
</template>

<script>
import { getUserInfo } from '@/services/sign';
  export default {
    name: 'UserItem',
    created() {
      console.log(this.$route);
      getUserInfo(this.$route.params.userId);
    }
  }
</script>