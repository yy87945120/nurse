<template>
    <div style=''>
    
        <blur :blur-amount=40 style="height:30vh;width:100vw" :url="url">
          <p class="center"><img :src="url"></p>
          <p>小姚</p>
        </blur>
        <div id='formPlane'>
            <group class="group">
              <cell class="cell" title="我的资料" ></cell>
              <cell class="cell" title="基本资料" :is-link="true" @click.native='basicInfoShow'></cell>
              <cell class="cell" title="密码修改" :is-link="true" @click.native='passwordShow'></cell>
              <cell class="cell" title="操作记录" :is-link="true" @click.native='operationShow'></cell>
            </group>
            <group class="group">
              <cell class="cell" title="产品设置" style='font-weight:500'></cell>
              <cell class="cell" title="提示功能" :is-link="true" @click.native='productTipShow'></cell>
              <cell class="cell" title="输液默认页" :is-link="true" @click.native='productInfusionListShow'></cell>
              
            </group>
            <button class="login-out-btn" @click="loginOutConfirm">退出登录</button>
        </div>
        <mt-popup v-model="toggleShow.myBasicInfoShow" position="right">
             <div class='operation-div'>
            <dheader @close='closeMethod'><span slot='title'>基本资料</span></dheader>

            <div class='scroll-div'>
                <group class="group">
                     <cell class="cell" title="姓名"  value="小姚" ></cell>
                     <cell class="cell" title="工号" value='411' ></cell>
                     <cell class="cell" title="职称" value='护师' ></cell>
                     <cell class="cell" title="电话" value='18819747163' ></cell>  
                     <cell class="cell" title="安全组" value='住院护士' ></cell>
                     <cell class="cell" title="登录科室" value='呼吸内科一单元' ></cell>             
                     <cell class="cell" title="上一次登录时间" value='2018-4-12 8:30' ></cell>
                </group>
                
            </div>
          </div>
        </mt-popup>

         <mt-popup v-model="toggleShow.myPasswordShow" position="right">
             <div class='operation-div'>
            <dheader @close='closeMethod'><span slot='title'>密码修改</span><i slot='icon' class="icon iconfont icon-shouye2" style="font-size: 2.4rem;" @click='passwordSubmit'></i></dheader>
            <div class='scroll-div'>
                <group class="group">
                  <mt-field label="原登录密码" placeholder="请填写原登录密码" :state=state.error></mt-field>
                  <mt-field label="新登录密码" placeholder="请填写新登录密码" :state=state.success></mt-field>
                </group>
                <group class="group">
                  <mt-field label="原医嘱密码" placeholder="请填写原医嘱密码" :state=state.warning></mt-field>
                  <mt-field label="新登录密码" placeholder="请填写新登录密码"></mt-field>
                </group>
            </div>
          </div>
        </mt-popup>

         <mt-popup v-model="toggleShow.myOperationShow" position="right">
             <div class='operation-div'>
            <dheader @close='closeMethod'><span slot='title'>操作记录</span></dheader>
            <div class='scroll-div'>
                <div class='filter'>
                  <div class='layout'>           
            <ul class='filter-detail-ul'>
              <li class='filter-detail-li' @click='openRecordDatePick'>查询日期:{{correctRecordDatePickerValue | dateYYYYMMddFormat}}</li>
              
            </ul>   
        </div> 
                </div>
                <div class='layout'>
                  <timeline>
      <timeline-item style='text-align:left'>
        <div class='date-time-div'>2018-5-1&nbsp;操作记录明细</div>
      </timeline-item>
      <timeline-item style='text-align:left'>
        <div class='record-detail-div'>
          <div class='record-detail-content'>登录操作 </div>
          <div class='record-detail-time'>7:50</div>
        </div>
      </timeline-item>
      <timeline-item style='text-align:left'>
        <div class='record-detail-div'>
          <div class='record-detail-content'>患者:姚展锋&nbsp;完成氯化钠输液医嘱 </div>
          <div class='record-detail-time'>8:00</div>
        </div>
      </timeline-item>
    </timeline>
    
                </div>
            </div>
          </div>
        </mt-popup>

         <mt-popup v-model="toggleShow.myProductTipShow" position="right">
             <div class='operation-div'>
            <dheader @close='closeMethod'><span slot='title'>提示功能</span></dheader>
            <div class='scroll-div'>
                <group class='group'>
                    <cell class="cell" title='输液震动提示' style='text-align:left'><mt-switch @change="changeConfig"  v-model="tipsSwitchValue.shakeOn"></mt-switch></cell>
                    <cell  class="cell" title='输液语音提示' style='text-align:left'><mt-switch @change="changeConfig"  v-model="tipsSwitchValue.voiceOn"></mt-switch></cell>
                </group>
              </div>
            
          </div>
        </mt-popup>

         <mt-popup v-model="toggleShow.myProductInfusionListShow" position="right">
             <div class='operation-div'>
            <dheader @close='closeMethod'><span slot='title'>输液默认页</span></dheader>
            <div class='scroll-div'>
                <group class='group'>
                    <mt-radio @input="changeConfig" style='text-align:left'
                      title="选择输液默认页"
                      align="right"
                      v-model="infusionShowValue"
                      :options="infusionShowOptions">
                    </mt-radio>

                </group>
            </div>
          </div>
        </mt-popup>

     

        <mt-datetime-picker ref="picker" type="date" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" :startDate='startDate' :endDate='endDate' @confirm='pickRecordDetail' v-model="recordDatePickerValue">
        </mt-datetime-picker>

    </div>
</template>

<script>
import { Blur,Group,Cell } from 'vux';
import {MessageBox} from 'mint-ui';
import { Timeline, TimelineItem } from 'vux'
import dheader from '@/views/components/dheader'
import {getConfig} from '@/config'
export default {
  name: 'Mine',
  components: {
    Blur,
    Group,
    Cell,
    dheader,
    Timeline,
    TimelineItem
  },
  data () {
    return {
      url:require('../../assets/img/user.jpg'),
      toggleShow:{
           "myBasicInfoShow":false,
           "myPasswordShow":false,
           "myOperationShow":false,
           "myProductTipShow":false,
           "myProductInfusionListShow":false
      },
      state:{error:'error',success:'success',warning:'warning'},
      startDate:new Date('2014-1-1'),
      endDate:new Date(),
      correctRecordDatePickerValue:new Date(),
      recordDatePickerValue:new Date(),
      tipsSwitchValue:{
        shakeOn:'',
        voiceOn:''
      },
      infusionShowOptions:[
        {
          label:"列表显示",
          value:"0"
        },
        {
          label:"图表显示",
          value:"1"
        }
      ],
      infusionShowValue:""
    }
         
     
   
  },
  methods :{
    loginOutConfirm(){
        
        MessageBox.confirm('确定退出登录吗?').then(action =>{
           sessionStorage.removeItem('user');
           this.$router.push({path:'/Login'})
        }).catch(action =>{

        })
    },
    basicInfoShow(){
        this.toggleShow.myBasicInfoShow = !this.toggleShow.myBasicInfoShow;
    },

    passwordShow(){
        this.toggleShow.myPasswordShow = !this.toggleShow.myPasswordShow;
    },
    passwordSubmit(){

    },
    openRecordDatePick(){
      this.$refs.picker.open();
    },
    pickRecordDetail(){
      this.correctRecordDatePickerValue = this.recordDatePickerValue

    },
    operationShow(){
        this.toggleShow.myOperationShow = !this.toggleShow.myOperationShow;
    },
    productTipShow(){
        this.toggleShow.myProductTipShow = !this.toggleShow.myProductTipShow;
    },
    productInfusionListShow(){
        this.toggleShow.myProductInfusionListShow = !this.toggleShow.myProductInfusionListShow;
    },   
    closeMethod(){
        let obj = this.toggleShow;
        for(var val in obj){
          if(obj[val] != false) obj[val] = false;
          
        }
        
    },
    getConfig(){
        let configData = getConfig();
        
        this.tipsSwitchValue.shakeOn = configData.shakeOn;
        this.tipsSwitchValue.voiceOn = configData.voiceOn;
        this.infusionShowValue = configData.infusionShowValue;
     
    },
    changeConfig(){  

       let _this = this;
       
       let updateConfigData = {
            shakeOn:_this.tipsSwitchValue.shakeOn,
            voiceOn:_this.tipsSwitchValue.voiceOn,
            infusionShowValue:_this.infusionShowValue
        };
        localStorage.setItem('config', JSON.stringify(updateConfigData));
       
    }
   
    
  },
  mounted () {
    this.getConfig()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#mine-div{

}
.center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
#formPlane{
  width:100vw;
  height:62vh;
  background:rgb(244,244,244);
  position:relative;
  overflow-y:auto
}
.group{
  margin-top:0px
}
.cell{
  text-align:left
}
.login-out-btn{
  width:90vw;
  height:6vh;
  background:rgb(230,67,64);
  border:none;
  border-radius:10px;
  color:white;
  margin:10px auto;
  font-size:1.6rem;
  outline:none
}
.weui-cells{
  margin-top:0px
}
.operation-div{
  height:100vh;
  width:100vw;
}
.scroll-div{
  height:94vh;
  width:100vw;
  overflow-y:auto;
  position:relative
}
.date-time-div{
  position:relative;
  left:3vw;
  top:.2vh;
  height:4vh;
  width:60vw;
 
  font-size:1.8rem
}
.record-detail-div{
  position:relative;
  left:3vw;
}
.record-detail-content{
  font-size:1.6rem
}
.record-detail-time{
  font-size:1.2rem
}
.filter{
  
  width:100vw;
  height:5rem
}

.filter-detail-li{
  float:left;
  width:90vw;
  height:3.2016rem;
  background:white;
  font-size:1.4rem;
  line-height:3.2016rem;
  border-left:1px solid rgb(200,200,200);
  border-top:1px solid rgb(200,200,200);
  border-bottom:1px solid rgb(200,200,200);
  position:relative;
  font-size:1.4rem;
  margin-top:1rem
}
.filter-detail-li:last-child{
    border-right:1px solid rgb(200,200,200)
}
</style>

