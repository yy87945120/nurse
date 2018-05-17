<template>
    <div id="ThreeTest">
        <nheader :routechoice='router'><p slot='title'>护理体征记录</p></nheader>
         <div id="filter"><search ref='selectOne' @on-change="onChange"  v-model='searchValue' placeholder="床位号 || 姓名 || 登记号" :results="res" :on-cancel="onCancel" class="search">
      <table slot='res'>
      <tr v-for="item in resData" @click="handleResultClick(item)">
            <td>{{item.name}}</td>
            <td>{{item.bed}}</td>   
            <td>{{item.sex}}</td>
            <td>{{item.id}}</td>
      </tr>
        
      </table>
      </search>
      
      </div>
      <div style='display:inline-block;width:100vw;background:rgb(239,239,244);height:4.6rem' >
        <div class='layout'>           
            <ul class='filter-detail-ul'>
              <li class='filter-detail-li' @click='pickDetail'>{{filter.ward}}</li>
              <li class='filter-detail-li' @click='pickDetail'>{{filter.date}}</li>
              
            </ul>   
        </div> 
      </div> 
      <div class='scroll-div'>
        <div id="pats-list">
          <div class='pats-list-div' v-for='item in pats'>
            <table class="pats-list-table" @click='showPatDetail'>
              <tr>
                <td class='pats-list-title pats-bed'>1011</td>
                <td class="pats-name">{{item.name}}</td>
                <td class="pats-sex">{{item.sex | sex}}</td>
                <td class="pats-age">{{item.age | ageFormat}}</td>
                <td class='pats-list-text-align-right'>状态图标栏</td>
              </tr>
              <tr class="font-format-class">
                <td colspan='5' class='pats-status'>14:00&nbsp;脉搏&nbsp;70次/分,腋下体温&nbsp;36.7℃</td>
                
              </tr>
              
            </table>
        </div>
          </div>
        </div>
        <mt-popup
          v-model="popupVisible"
          position="bottom">
            <div class='detail-picker-btn' @click="cancelDetailPicker">取消</div><div class='detail-picker-btn' @click="handleDetailPicker">确认</div>
            <picker :data='detailArr' v-model='detailValue' @on-change='detailChange' class='detailPicker'></picker> 
        </mt-popup>

        <mt-popup
          v-model="popupVisibleNewRecord"
          position="bottom">
            <div class='detail-picker-btn' @click="cancelDetailPickerNewRecord">取消</div><div class='detail-picker-btn' @click="handleDetailPickerNewRecord">确认</div>
            <picker :data='detailArrNewRecord' v-model='detailValueNewRecord' class='detailPicker'></picker> 
        </mt-popup>

        <div class="footer-new">
        <div class='new-footer-new-div' @click="creatRecord">
          新建批量三测单
        </div>
        </div>
      <mt-popup v-model="createNewRecord" position="right">
        <div class='newRecord-div'>
            <dheader @close='closeForm' ><span slot='title'>体征录入</span><i class='icon iconfont icon-shouye2' slot='icon' style='font-size:2.4rem' @click='submitForm'></i></dheader>
            <div style='display:inline-block;width:100vw;background:rgb(239,239,244);height:4.6rem;' v-show='false'>
              <div class='layout'>           
                <ul class='filter-detail-ul' style='margin-top:.5rem'>
                  <li class='filter-detail-li' @click='pickDetailNewRecord'>{{filterNewRecord.ward}}</li>
                  <li class='filter-detail-li' @click='pickDetailNewRecord'>{{filterNewRecord.time}}</li>
                </ul>   
              </div> 
            </div> 
            <div class='main-new-record-scroll-div'>
           <div class='bed-scroll-div-new-record'>
                <div class='bed-item' :class="index==1?'pat-onfocus':''" v-for='(item,index) in 10'>
                    {{index+1}}床
                    <div v-show='index==1' >王大锤</div>
                </div>
           </div>
            <div class='form-scroll-div-new-record'>
                <div style='position:absolute;width:76vw;background:rgb(239,239,244);height:4.6rem;' v-show='true'>
                        
                <ul class='filter-detail-ul-new' style='margin-top:.5rem;margin-left:5vw'>
                  <li class='filter-detail-li-new' @click='pickDetailNewRecord'>{{filterNewRecord.ward}}</li>
                  <li class='filter-detail-li-new' @click='pickDetailNewRecord'>{{filterNewRecord.time}}</li>
                </ul>   
             
            </div> 
            <div class='new-record-form'>
              <div class='group-item group-item-basic'>
                  <table class='new-record-table'>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>腋下体温:</td>
                      <td class='new-record-input-td'><input type='text' class='new-record-input' placeholder='请填写体温'/></td>
                      <td class='new-record-unit'>℃</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>脉搏:</td>
                      <td class='new-record-input-td'><input type='text' class='new-record-input' placeholder='请填写脉搏'/></td>
                      <td class='new-record-unit'>次/分</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>心率:</td>
                      <td class='new-record-input-td'><input class='new-record-input' type='text' placeholder='请填写心率'/></td>
                      <td class='new-record-unit'>次/分</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>呼吸:</td>
                      <td class='new-record-input-td'><input type='text' class='new-record-input' placeholder='填写呼吸次数'/></td>
                      <td class='new-record-unit'>次/分</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>物理降温后:</td>
                      <td class='new-record-input-td'><input type='text' class='new-record-input' placeholder='物理降温后'/></td>
                      <td class='new-record-unit'>℃</td>
                    </tr>
                  </table>
              </div>
              <div class='group-item group-item-all'>
                  <table class='new-record-table'>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>血压:</td>
                      <td class='new-record-input-td'><input type='text' class='new-record-input' placeholder='请填写血压'/></td>
                      <td class='new-record-unit'>mmHg</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>总入量:</td>
                      <td class='new-record-input-td'><input type='text' class='new-record-input' placeholder='请填写总入量'/></td>
                      <td class='new-record-unit'>ml</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>大便:</td>
                      <td class='new-record-input-td'><input class='new-record-input' type='text' placeholder='填写大便次数'/></td>
                      <td class='new-record-unit'>次</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>尿量:</td>
                      <td class='new-record-input-td'><input type='text' class='new-record-input' placeholder='请填写总出量'/></td>
                      <td class='new-record-unit'>ml</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>总出量:</td>
                      <td class='new-record-input-td'><input type='text' class='new-record-input' placeholder='请填写总出量'/></td>
                      <td class='new-record-unit'>ml</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>体重:</td>
                      <td class='new-record-input-td'><input type='text' class='new-record-input' placeholder='请填写体重'/></td>
                      <td class='new-record-unit'>kg</td>
                    </tr>
                  </table>
              </div>
              <div class='group-item group-item-event'>
                   <table class='new-record-table'>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>护理事件:</td>
                      <td class='new-record-input-td'><input type='text' class='new-record-input' placeholder='请填写护理事件'/></td>
                      
                    </tr>
                 
                  </table>
              </div>
           </div>
           </div>
            </div>
           <div class='footer-new'>
            <div class='footer-new-left-right-div'>上床</div>
          <div class='footer-new-div' @click='showMask = !showMask'>开始语音

        </div>
        <div class='footer-new-left-right-div'>下床</div>
        </div>
        </div>
        <div class='mask' v-show='showMask'><div @click='showMask = !showMask'><i class='icon iconfont icon-yuyin' style='font-size:5rem;line-height:100vh;color:white'></i></div></div>
      </mt-popup>
      
    </div>
</template>

<script>
import nheader from '@/views/components/nheader';
import dheader from '@/views/components/dheader';

import { Search,Picker} from 'vux';

export default {
  name: 'ThreeTest',
  components :{
    nheader,Search,Picker,dheader
  },
  data () {
    return {
      loading:false,
      showMask:false,
      createNewRecord:false,
      popupVisibleNewRecord:false,
      Pat:[],
      BedList:[],
      router:'gohome',
      searchValue:'',
      resData:[],
      filter:{
          date:0,
          ward:'普外科护理一单元',
          date:'2018-03-11'
        },
      filterNewRecord:{
          date:0,
          ward:'2018-03-11',
          time:"8:00"
      },
      detailValue:[],
      detailValueNewRecord:[],
      detailArr:[
          ["普外科护理一单元","普外科护理二单元"],
          ["2018-03-11","2018-03-12"]
      ],
      detailArrNewRecord:[
          ["2018-03-11","2018-03-12"],
          ["7:00","8:00","9:00","10:00"]
      ],
      popupVisible:false,
      res:[],
      formList:[
          {
              "prj":'呼吸',
              "formRes":[
                    {
                          "index":0,
                          "value":''
                    }
              ]
          }

      ],
      pats:[
        {
          name:'姚展锋',
          sex:1,
          age:22,
          id:1,
          bed:'1001',
          doctorDr:1,
          nurseDr:2,
          icon:[]
        },
        {
          name:'yy',
          sex:1,
          age:22,
          id:1,
          bed:'1001',
          doctorDr:1,
          nurseDr:2,
          icon:[]
        },

      ],

    }
  },
  methods :{
    pickDetail(){
        this.popupVisible = true
      },
      handleDetailPicker(){
          this.popupVisible = false;
          this.filter.ward = this.detailValue[0];
          this.filter.date = this.detailValue[1];
     
      },
      cancelDetailPicker(){
          this.popupVisible = false
      },
      detailChange(res){
         
      },
      mytime($event,index){
          this.InfusionInfo[index].needTime = $event;
      },
      onChange (){

        this.resData = this.InfusionInfo.filter((item)=>{

              if(this.searchValue!=''){
              
                if(item.name.indexOf(this.searchValue)!=-1 || item.bed.indexOf(this.searchValue)!=-1){
                  return true;
                }
              }else{
                return false;   
              }
        })

      },
      handleResultClick(item){
      console.log(item)
          
    
      },
      onCancel(){

      },
      creatRecord(){
          this.createNewRecord = true
      },
      closeForm(){
          this.createNewRecord = false
      },
      showPatDetail(){
          this.$router.push({path:'./PersonalThreeTest'})
      },
      submitForm(){
          console.log('检查表单')
      },
      pickDetailNewRecord(){
          this.popupVisibleNewRecord = true
      },
      cancelDetailPickerNewRecord(){
          this.popupVisibleNewRecord = false
      },
      handleDetailPickerNewRecord(){
          this.popupVisibleNewRecord = false;

          this.filterNewRecord.ward = this.detailValueNewRecord[0];
          this.filterNewRecord.time = this.detailValueNewRecord[1];
          
      },
      choiceItem(){
          
      },
      ifEmpty(){

      }

      
  },
  mounted () {

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.child-view {  
  position: absolute;  
  left: 0;  
  top: 0;  
  width: 100%;  
  height: 100%;  
  transition: all .5s cubic-bezier(.55,0,.1,1);  
}  
.pat-onfocus{
  background:rgb(239, 239, 244)
}
.slide-left-enter, .slide-right-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(30px, 0);  
  transform: translate(30px, 0);  
}  
.slide-left-leave-active, .slide-right-enter {  
  opacity: 0;  
  -webkit-transform: translate(-30px, 0);  
  transform: translate(-30px, 0);  
}  
.new-record-table{
  display:inline-block
}
.new-record-tr{
  height:4.5vh;
}
.new-record-form{
  margin-top:7vh;
  height:79vh;
  width:76vw;
  overflow-y:auto
}
.new-record-unit{
  font-size:1.4rem;
  text-align:left
}
.group-item:first-child{
  margin-top:0vh
}
.group-item{
  display:inline-block;
  width:76vw;
  background:white;
  
  margin-top:2vh
}
.group-item-basic{
  height:25vh
}
.group-item-all{
  height:31vh
}
.group-item-event{
  height:19vh
}

#filter{
  width:100vw;
  height:4.84rem;
  line-height:4.002rem;
  margin-top:4.002rem;
  
}
#filter .search{
    margin-top:4.002rem;
    height:4.002rem;
    line-height:3.335rem;
}
.filter-detail-ul{
  margin-top:0.3335rem;
}

.filter-detail-li{
  float:left;
  height:3.2016rem;
  background:white;
  font-size:1.4rem;
  line-height:3.2016rem;
  border-left:1px solid rgb(200,200,200);
  border-top:1px solid rgb(200,200,200);
  border-bottom:1px solid rgb(200,200,200);
  position:relative;
  font-size:1.4rem;
  width:44.5vw
}
.filter-detail-ul-new{
  margin-top:0.3335rem;
}

.filter-detail-li-new{
  float:left;
  height:3.2016rem;
  background:white;
  font-size:1.4rem;
  line-height:3.2016rem;
  border-left:1px solid rgb(200,200,200);
  border-top:1px solid rgb(200,200,200);
  border-bottom:1px solid rgb(200,200,200);
  position:relative;
  font-size:1.4rem;
  width:33vw
}
.filter-detail-li-new:last-child{
    border-right:1px solid rgb(200,200,200)
}
.detailPicker{
  width:100vw
}
.detail-picker-btn{
  float:left;
  height:40px;
  font-size:1.6rem;
  line-height:40px;
  color:#26a2ff;
  width:50vw;
  border-bottom:2px solid rgb(244,244,244)
}

.footer-new{
  position:fixed;
  bottom:0px;
  width:100vw;
  height:4.669rem;
  text-align:center;
  background:white;
  border-top:1px solid rgb(230,230,230)
}
.footer-new-left-right-div{
  height:2.668rem;
  line-height:2.668rem;
  margin-top:1.0005rem;
  color:white;
  border-radius:2px;
  width:18vw;
  display:inline-block;
  background:rgb(254, 110, 161);
}

.footer-new-div{
  height:2.668rem;
  line-height:2.668rem;
  display:inline-block;
  margin-top:1.0005rem;
  color:white;
  border-radius:2px;
  width:60vw;
  background:rgb(254, 110, 161);
  font-size:1.4rem
}
.new-footer-new-div{
  height:2.668rem;
  line-height:2.668rem;
  display:inline-block;
  margin-top:1.0005rem;
  color:white;
  border-radius:2px;
  width:90vw;
  background:rgb(254, 110, 161);
  font-size:1.4rem
}

#pats-list{
  width:100vw;
  background:rgb(244,244,244)
}
.pats-list-div:first-child{
  margin-top:0vh
}
.pats-list-table{
  width:90vw;
  margin:0.667rem auto 0.667rem;
  background:white;

}
.pats-list-div{
  display:inline-block;
  width:100vw;
  background:white;
  margin-top:0.667rem
}
.new-record-title-td{
  font-size:1.4rem;
  text-align:right;
  width:20vw
}
.new-record-input-td{
  
}
.new-record-input{
  border:none;
  border-bottom:1px solid rgb(230,230,230);
  width:25vw;
  text-align:center
}
.pats-list-text-align-left{
  text-align:left
}
.pats-list-text-align-right{
  text-align:right
}
.pat-basic-info-td{
  
}

.pats-bed{
  background:rgb(102,240,102);
  width:12vw;
  color:white;
  font-weight:bold;
}
.pats-name{
  width:15vw;
  font-size:1.6rem;
  font-weight:bold;
}
.pats-sex{
  width:4vw;
}
.pats-age{
  width:10vw;
}
.pats-status{
  text-align:left;
  height:2.668rem;
  color:rgb(150,150,150)
}
.font-format-class{
  font-size:1.4rem;
}
.scroll-div{
  width:100vw;
  height:45.7572rem;
  overflow-y:auto
}
.newRecord-div{
  height:100vh;
  width:100vw;
  background:white
}
.main-new-record-scroll-div{
  height:86vh;
  width:100vw;

}
.bed-scroll-div-new-record{
  
  display:inline-block;
  height:86vh;
  width:23vw;
  overflow-y:auto;
  float:left;
  border-right:1px solid rgb(230,230,230);
}
.form-scroll-div-new-record{
  position:relative;
  height:86vh;
  display:inline-block;
  width:76vw;
  overflow-y:auto;
  float:left;
  background:rgb(239, 239, 244)
}
.bed-item{
  padding-top:.8vh;
  padding-bottom:.8vh;
  width:23vw;
  border-bottom:2px solid rgb(230,230,230);
  line-height:3.5vh;
  font-size:1.4rem
}
.mask{
  position:absolute;
  z-index:101;
  width:100vw;
  height:66.7rem;
  background:red;
  top:0px;
  background:#000;
  opacity:0.7;
}
.form-ul-li-item{
  display:inline-block;
  padding-top:.5vh;
  padding-bottom:.5vh;
  background:red
}

</style>

