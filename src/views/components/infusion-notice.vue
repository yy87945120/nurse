<template>
    <div id="InfusionNotice">
        <div  :class="arrLength==0?'null-notice':(!seeMore?'notice-box':'notice-box-see')"  @click="seeMore = !seeMore">
           
                       需处理数目:{{arrLength}}人
                
                  
                  <table v-show="seeMore" style="width:100%">

                      <tr v-for="item in List">
                        <td>{{item.name}}</td> 
                        <td><countdown :value="item.needTime" :start="true"></countdown></td> 
                        <td><span>{{item.state | stateFormat}}</span></td> 
                      </tr>
                  </table>
                  
              
         
        </div>
    </div>
</template>

<script>
import {Countdown} from 'vux';
import {getConfig} from '@/config';
//import { getInfusion } from '@/api/api';
export default {
  name: 'InfusionNotice',
  components:{Countdown},
  data () {
    return {
      show:false,
      seeMore:false,
      List:[],
      arrLength:0
    }
  },
  methods :{
      getInfusionData(){
        let config = getConfig();

        
          getInfusion('').then((res) => {
          
          let InfusionData = res.data.InfusionInfo;
          
        
          let arr = InfusionData.filter(item=>{
              if(item.needTime < 360 && item.needTime>0){
                return true;
              }else{
                return false;
              }
          })
          this.arrLength = arr.length;
          this.List = arr;
          let vibrateTime = 0;
          if(!window.plus){
            return
          }else{
            if(this.arrLength > 0){
              if(config.voiceOn){
                 var main = plus.android.runtimeMainActivity();
                var SpeechUtility = plus.android.importClass('com.iflytek.cloud.SpeechUtility');
                SpeechUtility.createUtility(main,"appid=5ad6ddb3");

                var SynthesizerPlayer = plus.android.importClass('com.iflytek.cloud.SpeechSynthesizer');
                var play = SynthesizerPlayer.createSynthesizer(main, null);
                play.startSpeaking('当前有'+this.arrLength+'位病人需要关注输液',null);
              }
              if(config.shakeOn){
                plus.device.vibrate( 2000 );
              }
                
              
              }
            }
        
        })
     
        }
  },
  mounted () {
  
    //this.getInfusionData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#InfusionNotice{
  position:fixed;
  right:0;
  top:6.67rem;
  index:99;
  
}
.null-notice{
  width:0vw;
  height:0rem;
  
  border-radius:10px 0 0 10px;
  transition:all .3s;
  
}


.notice-box{
  width:15vw;
  height:2.668rem;
  border-left:3px green solid;
  border-bottom:3px green solid;
  border-top:3px green solid;
  border-radius:10px 0 0 10px;
  background:white;
  transition:all .3s;
}

.notice-box-see{
  width:50vw;
  border-left:3px green solid;
  border-bottom:3px green solid;
  border-top:3px green solid;
  border-radius:10px 0 0 10px;
  background:white;
  border-radius:10px 0 0 10px;
   
}
</style>