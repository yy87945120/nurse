<template>
    <div id="InformItem">
        <nheader :routechoice='routechoice'><span slot='title'>手术通知</span></nheader>
        <div class='item-scroll-div'>
        	<div class='layout'>
        	  	<div class='item-time-div'>
        	  		<div class='item-time'>
        	  			星期三
        	  			15:30
        	  		</div>
        	  	</div>
        	  	<div class='item-desc'></div>
        	 </div>
        </div>


        <mt-popup v-model="showInfoDetail" position="right">
        	<div class='showInfoDetail-div'>
        	  <dheader ><span slot='title'></span></dheader>
        	  <div class='item-scroll-div'>
        	  	<div class='item-time'></div>
        	  	<div class='item-desc'></div>
        	  </div>
        	</div>
        </mt-popup>
    </div>
   	
</template>

<script>
import nheader from '@/views/components/nheader'
import dheader from '@/views/components/dheader'
export default {
  name: 'InformItem',
  data () {
    return {
      routechoice:'goback',
      showInfoDetail:false,
      par:this.$route.params.par
    }
  },
  components:{nheader,dheader},
  methods :{
   	
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.showInfoDetail-div{
	height:66.7rem;
  	width:100vw;
  	background:white;	
}
.item-scroll-div{
	margin-top:6vh;
	background:rgb(228,228,228);
	height:93vh;
	width:100vw;
	overflow-y:auto
}
.item-time-div{
	height:9vh;
	background:red;
	
}
.item-time{
	display:inline-block;
	height:6vh;
	margin-top:2.5vh;
	width:20vw;
	background:aqua;
	line-height:6vh
}
</style>



