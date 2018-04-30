<template>
    <div id="ImportantInform">
        <nheader :routechoice='router'><span slot='title'>重要通知</span><div slot='choice' class='notice-num' v-show='remain > 0' @click='toggleShow'>{{this.remain}}</div></nheader>
        <div class='scroll-div'>
        <div v-for='item in 10' class='cell-swipe-div'>
        	<mt-cell-swipe   class='cell-info' :right="[{
      content: options.topOption,
      style: { background: 'rgb(65,138,206)', color: '#fff' },
      handler(){deleteInfo(item)}
    },
    {
      content: options.soundOption,
      style: { background: 'rgb(77,163,73)', color: '#fff' },
      handler(){deleteInfo(item)}
    }]"><div class='content-div' @click='informDetail(item)'>
  	<div class='content-img-div'>img</div>
  	<div class='content-title-word-div'>
  		<div class='content-word'>{{title}}</div>
  		<div>最新通知简介</div>
  	</div>
  	<div class='content-time-notice-div'>
  		<div class='content-time'>16:40</div>
  		<div class='content-notice-div'>
  			<div class='content-notice'>2</div>
  		</div>
  	</div>
  </div></mt-cell-swipe>
  </div>
  	</div>
        
    </div>
</template>

<script>
import nheader from '@/views/components/nheader'
import dheader from '@/views/components/dheader'
export default {
  name: 'ImportantInform',
  data () {
    return {
      router:'gohome',
      remain:4,
      toggleShow:true,
      options:{
      	 "topOption":"<i class='icon iconfont icon-zhiding'>&nbsp;置顶</i>",
      	 "soundOption":"<i class='icon iconfont icon-ic_hearing_px'>&nbsp;语音播报</i>",
      },
      title:'手术通知'
    }
  },
  components:{nheader,dheader},
  methods :{
    deleteInfo(item){
  		console.log(item)
  	},
  	informDetail(item){
  		this.$router.push({name:"InformItem", params:{ par: item }})
  	},
  	closeDetailInfo(){
  		
  	}
  },
  mounted () {

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notice-num{
	height:3vh;
	width:7vw;
	background:rgb(244,67,54);
	color:white;
	line-height:3vh;
	border-radius:50%;
	margin-top:1.6vh;
	font-size:1.4rem
}
.scroll-div{
	height:90vh;
	width:100vw;
	background:white;
	margin-top:7vh;
	padding-top:1vh;
	padding-bottom:1vh;
}
.cell-swipe-div:first-child{
	margin-top:0vh;
}
.cell-swipe-div{
	margin-top:1.5vh;
}

.cell-info{
	position:relative;
	height:9vh;
}
.mint-cell{
	min-height:9vh;
	border-bottom:1px solid rgb(230,230,230);

}

.content-div{
	position:absolute;
	height:9vh;
	width:90%;
	line-height:4vh;
	left:5%;
}
.content-img-div{
	width:16vw;
	height:9vh;
	box-sizing:border-box;
	border:1px solid rgb(230,230,230);
	position:absolute;
	
}

.content-title-word-div{
	position:absolute;
	width:59vw;
	height:9vh;
	text-align:left;
	margin-left:17vw;
	padding-top:5px;
	padding-left:5px;
	font-size:1.6rem;

}
.content-time-notice-div{
	position:absolute;
	width:15vw;
	right:0px;
	height:9vh;
	padding-top:5px;
	
}
.content-time{
	color:rgb(60,60,60)
}
.content-word{
	color:black
}
.content-notice{
	display:inline-block;
	height:2.5vh;
	width:6vw;
	font-size:1.3rem;
	color:white;
	line-height:2.5vh;
	background:rgb(244,67,54);
	border-radius:40%
}

</style>


