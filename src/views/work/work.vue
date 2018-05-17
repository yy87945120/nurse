<template>
    <div id="Work">
    	<div id='main-header'>
         <div class="layout">
         <div id="title"> <span><i class='icon iconfont icon-shouye11' style='font-size:2rem'></i></span>护士app<i class='icon iconfont icon-shouye14' style='float:right;font-size:2.3rem;margin-top:.3vh' @click='notice'></i></div>
         
        </div>
       </div>
      
      <div id="main-banner">
        <mt-swipe :auto="5000" style="border-radius:5px">
  <mt-swipe-item><img src='../../assets/img/banner1.jpg' /></mt-swipe-item>
  <mt-swipe-item><img src='../../assets/img/banner2.jpg'/></mt-swipe-item>

</mt-swipe>
      </div>
     
    	<div class="layout">
    	<div id="nav">
          <ul>
            <li @click="delay(PatsNav,'Pats')" ><div class="circle circle-pat"><i class="icon iconfont icon-zhuyuanguanli icon-nav"></i></div><p class="nav-text">{{PatsNav}}</p></li>
            <li @click="delay(WorkListNav,'WorkList')" ><div class="circle circle-wl"><i class="icon iconfont icon-shouye4 icon-nav"></i></div><p class="nav-text">{{WorkListNav}}</p></li>
            <li @click="delay(ThreeTestNav,'ThreeTest')"><div class="circle circle-tt"><i class="icon iconfont icon-shouye13 icon-nav"></i></div><p class="nav-text">{{ThreeTestNav}}</p></li>
            <li @click="delay(InfusionNav,'Infusion')"><div class="circle circle-sy"><i class="icon iconfont icon-shuye icon-nav"></i></div><p class="nav-text">{{InfusionNav}}</p></li>
            <li @click="delay(NurseFormNav,'NurseRecord')" ><div class="circle circle-nr"><i class="icon iconfont icon-icon9 icon-nav"></i></div><p class="nav-text">{{NurseFormNav}}</p></li>
            <li @click="delay(ImportantInformNav,'ImportantInform')" ><div class="circle circle-ii"><i class="icon iconfont icon-shouye19 icon-nav"></i></div><p class="nav-text">{{ImportantInformNav}}</p></li>
          </ul>
    		</div>
      </div>
        <notice></notice>
       
    	   <div class="hr-bar"></div>
        <!--<div class='title-hr'><div class="layout"><div class="title-hr-bar"></div><div class='title-hr-word'>待办事务</div></div></div>-->
         <!--<div class='title-hr'><div class="title-hr-bar"></div><div class='title-hr-word'>公告</div></div>-->
        
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';

import notice from '@/views/components/infusion-notice';
export default {
  name: 'Work',
  components:{notice},
  data () {
    return {
      PatsNav:"在院患者",
      WorkListNav:"执行单",
      ThreeTestNav:"三测单",
      InfusionNav:"输液管理",
      NurseFormNav:"护理记录单",
      ImportantInformNav:"重要通知"
    }
  },
  methods :{
     
   	  delay(titleText,route){
   	  	Indicator.open();
   	  
   	  	setTimeout(() => {
   	  		this.$router.push({name:route, params:{ title: titleText }})
            Indicator.close();   
        },500)
   	  },
      notice(){
          console.log(1)
      }
      
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#title{
  
  text-align:left;
  font-size:1.6rem
}
.icon-shouye11{
  
}
#main-header{
  height:8vh;
  width:100vw;
  line-height:8vh;
  background:white
}
#main-banner{
  height:20vh;
  width:90vw;
  display:inline-block;
  margin-top:2vh auto 0vh;
  background:#ccc;
  border-radius:5px
}
#main-banner img{
  height:100%;
  width:100%;
  border-radius:5px
}
#nav{
	margin:0vh auto 0vh;
  display:inline-block
}
#nav>ul>li{
  float:left;
  width:22.5vw;
  margin-top:3vh;
 
}
#delayLoading{
  position:absolute;
  left:45%;
  top:45%;
  transform:translate(-50% -50%);
}



.circle{
  width: 14vw; 
  height: 14vw;
  margin:0px auto; 
   
  -moz-border-radius: 50px; 
  -webkit-border-radius: 50px; 
  border-radius: 50px;
  box-shadow:0px 5px 10px rgb(150,150,150);
  line-height:14vw;
}
.icon-nav{
  font-size:3.2rem;
  color:white
}
.nav-text{
  font-size:1.6rem;
  margin-top:2.5vh;
  color:rgb(80,80,80)
}
.circle-pat{
  background:rgb(138,217,218)
}
.circle-wl{
  background:rgb(127,198,254)
}
.circle-tt{
   background:rgb(252,156,116)
}
.circle-sy{
   background: rgb(249,143,183);
}
.circle-nr{
  background:rgb(127,198,254)
 } 
.circle-ii{
   background: rgb(249,143,183);
 
}
.hr-bar{
  height:2vh;
  width:100vw;
  background:rgb(244,244,244);
  margin-top:2vh
}


.title-hr{
  height:5vh;
  border-radius:3px
}
.title-hr-bar{
  float:left;
  height:5vh;
  width:2vw;
  background:green;
  border-radius:3px 0px 0px 3px;
}
.title-hr-word{
  float:left;
  line-height:5vh;
  margin-left:1.5vw
}
</style>

