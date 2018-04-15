<template>
    <div id="WorkList">
    	 <div id="nheader" style="text-align:center">
      <div class="layout">
          <router-link :to="{path: './Work'}"  tag="i" class="icon iconfont icon-back"></router-link>
          <span class='header-title'>执行单</span>
         
    </div>
    </div>
    </div>
</template>

<script>

export default {
  name: 'WorkList',
  data () {
    return {
      
    }
  },
  components:{},
  methods :{
   
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nheader{
  position:fixed;
  top:0px;
  height:6vh;
  width:100%;
  height:6vh;;
  line-height:6vh;
  background:rgb(250,250,250);
  box-shadow:1px 0px 1px rgb(80,80,80);
  z-index:99;
  color:black;
  border-bottom:1px solid rgb(250,250,250)
  

}
.header-title{
  font-size:2rem;
}
.icon-back{
  font-size:3rem;
  float:left;
  font-weight:bold;
}
</style>



