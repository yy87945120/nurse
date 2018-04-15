<template>
    <div id='scanResult'>
    
      <nheader :routechoice='router'><span slot="title">扫码结果</span></nheader>
     
    <div class="title first-title"><div class='layout'>当前患者信息</div></div>
    <table id='PatInfo' v-for="item in PatInfoList">
      <tr>
        <td id="pat-bed">0101床</td>
        <td id="pat-name">{{ item.name }}</td>
        <td id="pat-sex">{{ item.sex | sex }}</td>
        <td id="pat-age">{{ item.age | ageFormat }}</td>
        <td d="pat-state" rowsspan='2'>病人状态icons</td>
      </tr>
      <tr class="font-format-class">
        <td >医生:</td>
        <td class="text-align-left-class" colspan='3'>蒋勇孟</td>
      </tr>
      <tr class="font-format-class">
        <td >诊断:</td>
        <td class="text-align-left-class" colspan='4'>入院诊断:发热</td>
      </tr>
      <tr class="font-format-class">
        <td>护士:</td>
        <td class="text-align-left-class" colspan='4'>冯红</td>
      </tr>
    	
    </table>
    <div class="title"><div class='layout'>当前执行单信息</div></div>
    <div id="infusion-content" >
        <p v-show='nullOEOI'>暂无输液信息</p>
        <div class='content-main'>
            <div class='layout'>
                 <table>
                      <tr class='order-main-tr'>
                        <td class="order-td-text-style">0.9%氯化钠注射液(软袋)</td>
                        <td class='dosage-td-text-style'>100毫升 100毫升/瓶</td>
                      </tr>
                      <tr class='order-main-tr'>
                        <td class="order-td-text-style">注射用灯盏花素</td>
                        <td class='dosage-td-text-style'>25毫克 25毫克/支</td>
                      </tr>
                 </table>
                  <table>
                      <tr>
                        <td  class='order-detail-td-text-style'>
                          <i class='icon iconfont icon-linshi'></i>&nbsp;qd&nbsp;|&nbsp;静脉注射&nbsp;|&nbsp;40ml/h
                        </td>
                      </tr>
               
                   </table>
          </div>
       </div>

    </div>
    <div id="footer-scan"  @click="showScan">扫描输液瓶贴</div>

     <div v-transfer-dom>
      <popup v-model="show" height="100%">
        <div class="popup">
            <scanpha ref='scanphaMethod' @toggleShow='closeScan'></scanpha>
        </div>
      </popup>
    </div>
 </div>
 
</template>

<script>
import nheader from '@/views/components/nheader';
import scanpha from '@/views/scan/scan-action/scan-pha';
import {getPatInfo, getOEOrderItm} from '@/api/api';
import { Popup, TransferDom } from 'vux';
import { Indicator } from 'mint-ui';
export default {
  name: 'scanResult',
  directives: {
    TransferDom
  },
  components:{Indicator,nheader,Popup,TransferDom,scanpha},
  data () {
    return {
      PatInfoList:[],
      show: false,
      OEorderList:[],
      nullOEOI:true,
      router:'goback'
    }
  },
  
  methods :{
   		loadPatInfo() {
			Indicator.open('加载患者信息...');
			let pars = this.$route.params.patId
			
   			getPatInfo(pars).then((res) => {

   				setTimeout(()=>{
   					this.PatInfoList = res.data.PatInfo;
   					Indicator.close();
   				},500);					
   			})
   		},
      closeScan(id) {

      if(id == "" || id == null || id == undefined){
          
          this.show = !this.show;
      }else{
          
          this.show = !this.show;
          this.nullOEOI = false;
          Indicator.open('加载输液信息...');
          getOEOrderItm(id).then((res) => {
              setTimeout(()=>{
                this.OEorderList = res.data.OEInfo;  
                Indicator.close();
              },500); 
          })
      }
        
     },
     showScan(){
        this.show = true;
        setTimeout(()=>{
            this.$refs.scanphaMethod.startRecognize();
            this.$refs.scanphaMethod.startScan();
        
        },600)
     }
  },
  mounted () {
  		this.loadPatInfo();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#PatInfo{
  width:90vw;
  margin:0px auto 0px;

  height:15vh
}

.popup {
  width:100%;
  height:100%;
}



.title{
  width:100vw;
  margin:0px auto 0px;
  line-height:4vh;
  text-align:left;
  background:rgb(240,240,240);
}

.first-title{
  margin-top:6vh;
}

#pat-bed{
  background:rgb(102,240,102);
  width:12vw;
  color:white;
  font-weight:bold;
}
#pat-name{
  width:15vw;
  font-size:1.6rem;
  font-weight:bold;
}
#pat-sex{
  width:4vw;
}
#pat-age{
  width:10vw;
}
.text-align-left-class{
  text-align:left
}
.font-format-class{
  font-size:1.4rem;
}
#infusion-content{
  width:90vw;
  margin:1vh auto 0px;
}

.text-align-left-class{
  float:left
}
.text-align-right-class{
  float:right
}
.order-td-text-style{
  font-size:1.4rem;
  
  text-align:left;
  width:50vw
}
.dosage-td-text-style{
  text-align:right;
  width:40vw;
  color:rgb(255,142,166);
  font-size:1.1rem;
 
}
.order-detail-td-text-style{
  text-align:left;
  font-size:1.3rem;
  color:rgb(120,120,120)
}







#footer-scan{
  position:fixed;
  bottom:0px;
  width:100vw;
  height:5vh;
  line-height:5vh;
  background:#ccc
}
</style>

