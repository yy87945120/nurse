<template>
    <div id='scanResult'>
    
      <nheader :routechoice='router'><span slot="title">扫码结果</span><i @click="showScan" class='icon iconfont icon-saoma' style='font-size:2.4rem' slot='choice'></i></nheader>
     
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
        <p v-show='!nullOEOI'>暂无输液信息</p>
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
                          <i class='icon iconfont icon-linshi' style='font-size:3rem;
                          position:relative;top:0.5rem;color:rgb(255,142,166)'></i>&nbsp;qd&nbsp;|&nbsp;静脉注射&nbsp;|&nbsp;40ml/h
                        </td>
                      </tr>
               
                   </table>
          </div>
       </div>

    </div>
    <div class='tab-btn-container'>

      <div class='tab-btn' @click="changeTab('tab-preview')">
          输液预览
      </div>
      <div class='tab-btn' @click="changeTab('tab-order')">
          医嘱详情
      </div>
      <div class='tab-btn' @click="changeTab('tab-process')">
          输液过程
      </div>
    </div>
    <div class="page-tab-container">   
      
          <mt-tab-container v-model="active" swipeable>
          
             <mt-tab-container-item id="tab-preview" >  
             <div class="layout">   
                <div class='preview-dateAndstate'>
                    <div class='tab-preview-dateAndstate-div' style='float:left'>5-1</div>
                    <div class='tab-preview-dateAndstate-div' style='float:right'>未执行</div>
                 </div>
                 <div>
                    <img src='../../../assets/img/infusion.png' width="100%"/>
                 </div>
                 </div>  
                 <div class='preview-time-div'>
                    <div style='font-size:1.4rem'>计划执行时间</div>
                    <div style='font-size:2.5rem'>10:00</div>
                 </div>
            </mt-tab-container-item>
          <mt-tab-container-item id="tab-order">
            <div id="InfusionInfo">
            <div class="layout"> 
                医嘱详情
            </div>
               </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-process">
           <div class="layout"> 
              过程
                     </div>
          </mt-tab-container-item>
          </mt-tab-container>
      
    </div>
    <div id="footer-scan"  @click="execute">
        <div class='footer-scan-div'>
          执行
        </div>
    </div>

     <div v-transfer-dom>
      <popup v-model="show" height="100%">
        <div class="popup">
            <scanpha ref='scanphaMethod' @toggleShow='closeScan'></scanpha>
        </div>
      </popup>
    </div>

    

    <mt-popup
          v-model="showExecute"
          position="bottom">
            <div class='ExecuteForm'>
              <div class='layout'>
                <div class='execute-btn execute-btn-left' >请录入输液的低速</div><div class='execute-btn execute-btn-right' @click="showExecute = !showExecute">取消</div>
              </div>
              <div class='layout'>
              <table>
              <tr class='execute-table-tr'>
                <td class='execute-table-title-td'>滴速</td>
                <td>
                  <div class='speedSelected selectControl'>-</div>
                  <div class='speedSelected selectContent'><input type='text' style="position:relative;width:100%;height:100%;text-align:center" value='30'/></div>
                  <div class='speedSelected selectControl'>+</div>
                </td>
              </tr>
              <tr class='execute-table-tr'>
                <td class='execute-table-title-td'>单位</td>
                <td>
                  <div class='unit unit-focus'>小时</div>
                  <div class='unit'>分钟</div>
                  <div class='unit'>秒</div>
                </td>
              </tr>
            </table>
              </div>
            <div class='popup-execute-div'>
                <div class='popup-execute-btn'>
                    开始输液
                </div>
            </div>
            </div>
            
            
        </mt-popup>
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
      router:'goback',
      active:'tab-preview',
      showExecute:false
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
      execute(){
        this.showExecute = true
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
     },
     changeTab(par){
        this.active = par;
        console.log(this.active)
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
.page-tab-container{
  height:41.3vh;
  
  overflow:auto
}
.tab-btn{
  display:inline-block
}
.tab-btn-container{
  height:4.5vh;
  width:100vw;
  margin-top:2vh;
  border-bottom:5px solid rgb(244,244,244)
}
.tab-btn{
  width:29.8vw;
  font-size:1.4rem;
  border-right:1px solid rgb(230,230,230)
}
.tab-btn:last-child{
  border-right:none
}
.preview-dateAndstate{
   height:5vh;

}
.tab-preview-dateAndstate-div{
   color:white;
   width:15vw;
   margin-top:1.5vh;
   height:3.5vh;
   line-height:3.5vh;
   text-align:center;
   background:rgb(148,148,148);
   font-size:1.2rem
}
.preview-time-div{
    height:8vh;
    background:rgb(242,242,242);
    width:100vw;
    padding-top:0.5rem
}
#footer-scan{
  position:fixed;
  bottom:0px;
  width:100vw;
  height:7vh;
  text-align:center;
  background:white;
  border-top:1px solid rgb(230,230,230)
}
.footer-scan-div{
  height:4vh;
  line-height:4vh;
  display:inline-block;
  margin-top:1.5vh;
  background:white;
  border-radius:2px;
  width:90vw;
  background:rgb(228,228,228);
  font-size:1.4rem
}
.ExecuteForm{
  height:30vh;
  width:100vw;
  background:white
}
.execute-btn{
   display:inline-block;
   width:45vw;
   font-size:1.4rem;
   height:6vh;
   line-height:6vh
}
.execute-btn-left{
  text-align:left
} 
.execute-btn-right{
  text-align:right
}
.popup-execute-div{
  position:absolute;
  bottom:0px;
  height:6vh;
  background:white;
  width:100vw;
  border-radius:2px;
  border-top:1px solid rgb(230,230,230);

}
.popup-execute-btn{
  display:inline-block;
  margin-top:1vh;
  height:4vh;
  line-height:4vh;
  font-size:1.4rem;
  background:rgb(228,228,228);
  width:90vw
}
.speedSelected{
  float:left;
  border-left:1px solid rgb(230,230,230);
  border-top:1px solid rgb(230,230,230);
  border-bottom:1px solid rgb(230,230,230);
  height:4vh;
  line-height:4vh;
  font-size:1.2rem
}
.selectContent{
  width:15vw;

}
.selectControl{
   width:5vw;
}
.speedSelected:last-child{
  border-right:1px solid rgb(230,230,230)
}
.unit:first-child{
  margin-left:0vw
}
.unit{
  border:1px solid rgb(230,230,230);
  float:left;
  margin-left:4vw;
  width:17.8vw;
  height:4vh;
  line-height:4vh;
  font-size:1.4rem
}
.unit-focus{
  background:url('../../../assets/img/selected.png') no-repeat right bottom;
  background-size:cover;
  -moz-background-size:cover;
  -webkit-background-size:cover;
  border:1px solid rgb(98,175,56)
}
.execute-table-tr{
  height:8vh
}
.execute-table-title-td{
  width:10vw;
  font-size:1.4rem;
  color:rgb(150,150,150);
  text-align:left
}
</style>

