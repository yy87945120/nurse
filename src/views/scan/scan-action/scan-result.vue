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
        <td class="text-align-left-td-class" colspan='3'>蒋勇孟</td>
      </tr>
      <tr class="font-format-class">
        <td >诊断:</td>
        <td class="text-align-left-td-class" colspan='4'>入院诊断:发热</td>
      </tr>
      <tr class="font-format-class">
        <td>护士:</td>
        <td class="text-align-left-td-class" colspan='4'>冯红</td>
      </tr>
        
    </table>
    <div class="title"><div class='layout'>当前执行单信息</div></div>
    <div id="infusion-content" >
        <p v-show='!nullOEOI'>暂无输液信息</p>
        <div class='content-main-info'>
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
            
            
                <div class='scroll-container'>
                   
                        <div class="content-main">
                            <table class='content-table'>
                               <tr>
                                  <td class='text-align-left-td-class table-td'>类型</td>
                                  <td class='text-align-right-td-class table-td'>长期医嘱</td>
                               </tr>
                               <tr>
                                  <td class='text-align-left-td-class table-td'>医嘱序号</td>
                                  <td class='text-align-right-td-class table-td'>1</td>
                               </tr>
                               <tr>
                                  <td class='text-align-left-td-class table-td'>途径</td>
                                  <td class='text-align-right-td-class table-td'>静脉滴注</td>
                               </tr>
                               <tr>
                                  <td class='text-align-left-td-class table-td'>频次</td>
                                  <td class='text-align-right-td-class table-td'>qd</td>
                               </tr>
                               <tr>
                                  <td class='text-align-left-td-class table-td'>执行时间</td>
                                  <td class='text-align-right-td-class table-td'>8:00</td>
                               </tr>
                               <tr>
                                  <td class='text-align-left-td-class table-td border-bottom-none'>医生说明</td>
                                  <td class='text-align-right-td-class table-td border-bottom-none'>接瓶</td>
                               </tr>

                            </table>
                        </div>
                        <div class="content-main">
                            <table class='content-table'>
                               <tr>
                                  <td class='text-align-left-td-class table-td'>开始时间</td>
                                  <td class='text-align-right-td-class table-td'>2017-01-15&nbsp;08:31</td>
                               </tr>
                               
                               <tr>
                                  <td class='text-align-left-td-class table-td'>开始医生</td>
                                  <td class='text-align-right-td-class table-td'>钟文星</td>
                               </tr>
                               <tr>
                                  <td class='text-align-left-td-class table-td border-bottom-none'>校对护士</td>
                                  <td class='text-align-right-td-class table-td border-bottom-none'>黄晓丽</td>
                               </tr>

                            </table>
                        </div>
                         <div class="content-main">
                            <table class='content-table'>
                               <tr>
                                  <td class='text-align-left-td-class table-td'>停止时间</td>
                                  <td class='text-align-right-td-class table-td'>2017-01-15&nbsp;08:31</td>
                               </tr>
                               <tr>
                                  <td class='text-align-left-td-class table-td'>开始医生</td>
                                  <td class='text-align-right-td-class table-td'>钟文星</td>
                               </tr>                
                               <tr>
                                  <td class='text-align-left-td-class table-td border-bottom-none'>校对护士</td>
                                  <td class='text-align-right-td-class table-td border-bottom-none'>黄晓丽</td>
                               </tr>

                            </table>
                        </div>
                         
                 
                </div>
                 <div class="layout"> 
                    </div>
             </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-process">
            <div class='scroll-container' style="background:white">
              <div class="layout"> 
              <!--yzf-->
                  <div class='step-date'>
                    2018-04-24(过滤器过滤得出今天，昨天)
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td style='position:relative;background:rgb(242,242,242);padding-top:20px;width:18vw;' valign="top"><div style='position:absolute;top:0px;z-index:9;background:rgb(242,242,242);width:18vw;'>10:05</div><div style='position:absolute;width:18vw;height:100%;background:red;top:0px'></div></td>
                        <td style='background:rgb(242,242,242);' rowspan=2 valign="top"><div>病人情况稳定，无特殊要求病人情况稳定，无特殊要求病人情况稳定，无特殊要求病人情况稳定，无特殊要求病人情况稳定，无特殊要求病人情况稳定，无特殊要求病人情况稳定，无特殊要求病人情况稳定，无特殊要求v</div><div>10:40&nbsp;姚展锋</div></td>
                      </tr>
                      
                      </tbody>
                  </table>
                  
              </div>
            </div>
          </mt-tab-container-item>
          </mt-tab-container>
      
    </div>
    <div id="footer-scan"  >
        <div class='footer-control-operation-div'>
            <div class='footer-control-operation-item'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-yanjing operation-icon'></i></div><div class='footer-control-operation-item-word'>添加巡视</div></div>
            <div class='footer-control-operation-item'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-guanlianfujian operation-icon'></i></div><div class='footer-control-operation-item-word'>接瓶</div></div>
            <div class='footer-control-operation-item'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-zanting1 operation-icon'></i></div><div class='footer-control-operation-item-word'>暂停</div></div>
            <div class='footer-control-operation-item footer-control-operation-item-stop'>结束</div>
        </div>
        <div class='footer-execute-div' @click="execute" v-if='false'>
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
                  <div class='speedSelected selectContent'><input class='selectContent-input' type='text' style="text-align:center" value='30'/></div>
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
                <div></div>
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
  line-height:4.002rem;
  text-align:left;
  background:rgb(240,240,240);
}

.first-title{
  margin-top:4.002rem;
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
.text-align-left-td-class{
  text-align:left
}
.font-format-class{
  font-size:1.4rem;
}
#infusion-content{
  width:90vw;
  margin:0.667rem auto 0px;
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
  height:27.5471rem;
  
  overflow:auto
}
.tab-btn{
  display:inline-block
}
.tab-btn-container{
  height:3.0015rem;
  width:100vw;
  margin-top:1.334rem;
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
   height:3.335rem;

}
.tab-preview-dateAndstate-div{
   color:white;
   width:15vw;
   margin-top:1.0005rem;
   height:2.3345rem;
   line-height:2.3345rem;
   text-align:center;
   background:rgb(148,148,148);
   font-size:1.2rem
}
.preview-time-div{
    height:5.336rem;
    background:rgb(242,242,242);
    width:100vw;
    padding-top:0.5rem
}
#footer-scan{
  position:fixed;
  bottom:0px;
  width:100vw;
  height:4.669rem;
  text-align:center;
  background:white;
  border-top:1px solid rgb(230,230,230)
}
.footer-control-operation-div{
    width:100vw;
    height:4.669rem;
    background:white;
}
.footer-control-operation-item:first-child{
    border-left:none
}
.footer-control-operation-item{
    width:21.25vw;
    height:4.5rem;
    border-left:1px solid rgb(230,230,230);
    float:left;
    margin-top:0.169rem;
}
.footer-control-operation-item-icon-div{
    margin-top:0.8004rem
}
.footer-control-operation-item-word{
    font-size:1.4rem
}
.footer-control-operation-item-stop{
    width:35vw;
    background:rgb(255,204,204);
    font-size:1.6rem;
    line-height:4.7rem;
}
.operation-icon{
    margin-top:1px
}
.footer-execute-div{
  height:2.668rem;
  line-height:2.668rem;
  display:inline-block;
  margin-top:1.0005rem;
  background:white;
  border-radius:2px;
  width:90vw;
  background:rgb(228,228,228);
  font-size:1.4rem
}
.ExecuteForm{
  height:20.01rem;
  width:100vw;
  background:white
}

.execute-btn{
   display:inline-block;
   width:45vw;
   font-size:1.4rem;
   height:4.002rem;
   line-height:4.002rem
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
  height:4.002rem;
  background:white;
  width:100vw;
  border-radius:2px;
  border-top:1px solid rgb(230,230,230);

}
.popup-execute-btn{
  display:inline-block;
  margin-top:0.667rem;
  height:2.668rem;
  line-height:2.668rem;
  font-size:1.4rem;
  background:rgb(228,228,228);
  width:90vw
}
.speedSelected{
  float:left;
  border-left:1px solid rgb(230,230,230);
  border-top:1px solid rgb(230,230,230);
  border-bottom:1px solid rgb(230,230,230);
  height:2.668rem;
  line-height:2.668rem;
  font-size:1.2rem
}
.selectContent{
  width:15vw;

}
.selectContent-input{
  width:15vw;
  height:2.668rem;
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
  height:2.668rem;
  line-height:2.668rem;
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
  height:5.336rem
}
.execute-table-title-td{
  width:10vw;
  font-size:1.4rem;
  color:rgb(150,150,150);
  text-align:left
}

.scroll-container{
  width:100vw;
  height:25.82624rem;
  overflow-y:auto;
  background:rgb(228,228,228)
}
.content-main:first-child{
  border-top:none;
  margin-top:0rem
}
.content-main{
  border-top:1px solid rgb(230,230,230);
  background:white;
  margin-top:.9rem
}
.content-table{
  width:95vw;
  margin-left:5vw;
}
.table-td{
  font-size:1.3rem;
  height:3.5vh;
  border-bottom:1px solid rgb(230,230,230)
}

.border-bottom-none{
  border-bottom:none
}
.content-title{
  border-top:1px solid rgb(220,220,220);
  text-align:left;
  border-bottom:1px solid rgb(220,220,220);
  font-size:1.2rem;
  background:rgb(242,242,242);
  height:3.5vh;
  line-height:4.3vh
}
.text-align-left-td-class{
  text-align:left;
}
.text-align-right-td-class{
  text-align:right;
  padding-right:5vw
}
.content-detail-main{
  border-bottom:1px solid rgb(230,230,230)
}
.step-date{
  text-align:left;
  height:6vh;
  width:90vw;
  background:blue;
  font-size:1.4rem
}

</style>

