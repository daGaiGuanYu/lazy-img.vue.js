<template lang="pug">
  .example
    img(v-for="url in list" v-lazy-src="url")
</template>

<script>
export default {
  data(){
    return {
      list: [
        'https://gitee.com/dggy/picpic/raw/master/demo/avatar.jpg',
        'https://gitee.com/dggy/picpic/raw/master/demo/c.jpg',
        'https://gitee.com/dggy/picpic/raw/master/demo/cs.jpg',
        'https://gitee.com/dggy/picpic/raw/master/demo/pic1.jpeg',
        'https://gitee.com/dggy/picpic/raw/master/demo/pic2.jpeg',
      ]
    }
  }
}
</script>

<style>
img{
  display: block;
  width: 400px;
  height: 400px
}
</style>