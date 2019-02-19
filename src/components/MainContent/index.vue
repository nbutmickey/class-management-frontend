<template>
  <section class="app-main" :style="{heghit:bodyHeight+'px'}">
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </section>
</template>

<script>
    export default {
        name: "index",
        data(){
          return {
            bodyHeight:document.documentElement.clientHeight - 60
          }
        },
        mounted(){
          window.addEventListener('resize',()=>{
            this.bodyHeight = document.documentElement.clientHeight - 60;
          })
        }
    }
</script>

<style scoped>
  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
    padding: 20px;
  }
</style>
