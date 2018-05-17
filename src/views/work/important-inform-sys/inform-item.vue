<template>
    <div id="InformItem">
        <nheader :routechoice='routechoice'><span slot='title'>手术通知</span><i slot='choice' class='icon iconfont icon-ic_hearing_px' style='font-size:2rem'></i></nheader>
        <div class='item-scroll-div' >
        	<div v-for='item in 2'>
        	<div class='layout'>
        	  	<div class='item-time-div'  >
        	  		<div class='item-time'>
        	  			<div>星期三</div>
        	  			<div>15:30</div>
        	  		</div>
        	  	</div>
        	  	<div class='item-desc' @click='itemDetailShow(item)'>
        	  		<div class='item-desc-from-state-div' >
        	  			<div class='item-desc-from' >1001床 &nbsp; pat Name</div>
        	  			<div class='item-desc-state' >未读</div>
        	  		</div>
        	  		<div class='item-desc-content-div'>
        	  			患者将于2009-10-2 12:00在硬膜外进行"椎间盘髓核摘除手术"手术,请您合理安排时间...
        	  		</div>
        	  	</div>
        	 </div>
        	 </div>
        </div>


        <mt-popup v-model="showInfoDetail" position="right">
        	<div class='showInfoDetail-div'>
        	  <dheader @close='closeItemDetail'><span slot='title'>1001&nbsp;pat Name</span><i slot='icon' class='icon iconfont icon-ic_hearing_px' style='font-size:2rem'></i></dheader>
        	  <div class='item-detail-scroll-div'>
        	  		<div style='text-decoration:underline;color:blue;font-size:1.6rem' @click='linkToPat'>pat Name</div>
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
      par:this.$route.params.par,
      patId:1
    }
  },
  components:{nheader,dheader},
  methods :{
   		itemDetailShow(item){
   			this.showInfoDetail = true;
   			console.log(item);
   		},
   		closeItemDetail(){
   			this.showInfoDetail = false
   		},
   		linkToPat(){
   			this.$router.push({name:"PatsInfo", params:{ par: this.patId }})
   		}
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.showInfoDetail-div{
	  height:100vh;
  	width:100vw;
  	background:white;	
}
.item-scroll-div{
	margin-top:6vh;
	background:rgb(228,228,228);
	height:94vh;
	width:100vw;
	overflow-y:auto
}
.item-time-div{
	height:9vh;
}
.item-time{
	display:inline-block;
	height:5vh;
	margin-top:1.5vh;
	width:20vw;
	background:rgb(188,188,188);
	font-size:1.2rem;
	color:white;
	padding-top:.3vh;
	padding-bottom:.3vh;
}
.item-desc{
	width:90vw;
	height:12vh;
	background:white;
	  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
	padding-left:3vw;
	padding-right:3vw;
}
.item-desc-from-state-div{
	height:4.5vh;
	line-height:4.5vh;
	font-size:1.4rem
}
.item-desc-from{
	float:left
}
.item-desc-state{
	color:rgb(119,87,255);
	float:right
}
.item-desc-content-div{
	text-align:left;
	font-size:1.5rem;
	height:7vh;
	color:rgb(120,120,120);
	line-height:3.5vh
}
.item-detail-scroll-div{
	height:94vh;
	width:100vw;
	background:white
}
</style>



