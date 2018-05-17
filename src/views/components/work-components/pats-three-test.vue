<template>
    <div id="PatsThreeTest">
        <div class="filter" id='filter'>
        <div class='layout'>           
            <ul class='filter-date-ul'>
              
              <li class='filter-date-li' v-text="index==5?'今天':index+1" :class="index==5?'focus-class':''"  v-for = '(item,index) in 6' ></li>
              <li class='filter-date-li' @click='openPicker'><i class='icon iconfont icon-icon12' style="font-size:2rem"></i></li>
            </ul>   
        </div>
        </div>

        <div id="content">
          <div>
            <div class='content-title'>
              <div class='layout'>
                2017-11-08
              </div>
            </div>
            <div class="content-main">
                <table class='content-table'>
                  <tr>
                    <td class='text-align-left-td-class table-td'>总出量</td>
                    <td class='text-align-right-td-class table-td'>960ml</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>总入量</td>
                    <td class='text-align-right-td-class table-td'>900ml</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td border-bottom-none'>大便</td>
                    <td class='text-align-right-td-class table-td border-bottom-none'>0次</td>
                  </tr>
                </table>
            </div>
          </div>

          <div>
            <div class='content-title'>
              
                <div class='layout'>
                  2017-11-08 22:00
                </div>
            
            </div>
            <div class="content-detail-main">
                <table class='content-table'>
                  <tr>
                    <td class='text-align-left-td-class table-td'>腋下体温</td>
                    <td class='text-align-right-td-class table-td'>36.8℃</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>脉搏</td>
                    <td class='text-align-right-td-class table-td'>99ml</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td border-bottom-none'>呼吸</td>
                    <td class='text-align-right-td-class table-td border-bottom-none'>22次</td>
                  </tr>
                </table>
            </div>
          </div>
        </div>
        <mt-datetime-picker ref="picker" type="date" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" :startDate='startDate' :endDate='endDate' @confirm='startDates' v-model="datePickerValue">
        </mt-datetime-picker>
        <mt-popup style="height:100vh;width:100vw"
          v-model="popupVisible"
             position="bottom">
              <div class="close">
                <i class='icon iconfont icon-guanbi' @click='closeTable'></i> 
              </div>
            <div id="temperature-table">
              
            </div>
        </mt-popup>
        <mt-popup style="height:100vh;width:100vw;background:white"
          v-model="popupVisibleForm"
             position="right">
             
              <div class='newRecord-div'>
              <div class='mask' v-show='showMask'><div @click='showMask = !showMask'><i class='icon iconfont icon-yuyin' style='font-size:5rem;line-height:100vh;color:white'></i></div></div>
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
           
            <div class='form-scroll-div-new-record'>
                <div style='position:absolute;width:100vw;background:rgb(239,239,244);height:4.6rem;' v-show='true'>
                        
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
           
          <div class='footer-new-div' @click='showMask = !showMask'>开始语音

        </div>
   
        </div>
        </div>
        </mt-popup>
        <div id='controller'>
          <div class='controller-btn' @click="toggleRightPopup">体温单</div>
          <div class='controller-btn' @click="createForm">新建</div>
        </div>
        

       <mt-popup
          v-model="popupVisibleNewRecord"
          position="bottom">
            <div class='detail-picker-btn' @click="cancelDetailPickerNewRecord">取消</div><div class='detail-picker-btn' @click="handleDetailPickerNewRecord">确认</div>
            <picker :data='detailArrNewRecord' v-model='detailValueNewRecord' class='detailPicker'></picker> 
        </mt-popup>
        
    </div>
   
</template>

<script>
import { Picker} from 'vux';
import dheader from '@/views/components/dheader'
import indicator from 'mint-ui'
let echarts = require('echarts/lib/echarts')

require('echarts/lib/chart/line')

require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')
require("echarts/lib/component/legendScroll");
export default {

  name: 'PatsThreeTest',
  data () {
    return {
      startDate:new Date('2014-1-1'),
      endDate:new Date('2015-1-2'),
      datePickerValue:'',
      popupVisible:false,
      popupVisibleForm:false,
      popupVisibleNewRecord:false,
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
      showMask:false,
      detailValue:[],
      detailValueNewRecord:[],
      detailArr:[
          ["普外科护理一单元","普外科护理二单元"],
          ["2018-03-11","2018-03-12"]
      ],
      detailArrNewRecord:[
          ["2018-03-11","2018-03-12"],
          ["7:00","8:00","9:00","10:00"]
      ]
    }
  },
  components:{dheader,Picker},
  methods :{
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
      pickDetail(){
        this.popupVisible = true
      },
      submitForm(){

      },
      closeTable(){
          this.popupVisible = false
          if (!window.plus) return;
          plus.screen.lockOrientation("portrait-primary");
      },
      createForm(){
          this.popupVisibleForm = true;
      },
      closeForm(){
          this.popupVisibleForm = false;
      },
      openPicker() {
        this.$refs.picker.open();
      },
    
      startDates(){
        console.log(this.datePickerValue)
      },
      toggleRightPopup(){
       
        this.popupVisible = true;
        if (!window.plus) return;
       
          plus.screen.lockOrientation("landscape-primary");
        setTimeout(()=>{
          
          this.drawLine();
          
        },500)
      },
      drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('temperature-table'))
      // 绘制图表
      myChart.setOption({
        title: { 
            left:'center',
            text: '体温单' 
        },
       
        xAxis: {
          axisTick:{
              alignWithLabel:true
          },
          axisLabel: {  
              interval:0,  
              rotate:-20  
          }  ,
          boundaryGap: false,
          data: ["4-13 2","4-13 6", "4-13 10", "4-13 14", "4-13 18", "4-13 22","4-14 2","4-14 6", "4-14 10", "4-14 14", "4-14 18", "4-14 22"],

          splitLine:{  
            show:true,
            lineStyle:{
            color:'#00ff00',
            width: 2,
            alignWithLabel:true

            }
           }     
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                handleSize: 20,//滑动条的 左右2个滑动条的大小
                height: 8,//组件高度
                left: 40, //左边的距离
                right: 50,//右边的距离
                bottom: 20,//右边的距离
                handleColor: '#ddd',//h滑动图标的颜色
                handleStyle: {
                    borderColor: "#cacaca",
                    borderWidth: "1",
                    shadowBlur: 2,
                    background: "#ddd",
                    shadowColor: "#ddd",
                },
                fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    //给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变
                    //给第一个设置0，第四个设置1，就是垂直渐变
                    offset: 0,
                    color: '#1eb5e5'
                }, {
                    offset: 1,
                    color: '#5ccbb1'
                }]),
                backgroundColor: '#ddd',//两边未选中的滑动条区域的颜色
                showDataShadow: false,//是否显示数据阴影 默认auto
                showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
                handleIcon: 'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',
                filterMode: 'filter',
            },
            //下面这个属性是里面拖到
            {
                type: 'inside',
                show: true,
                xAxisIndex: [0],
                start: 1,
                end: 100
            }
        ],
        grid:{
                show:true
        },
        legend: {
          data:['体温','脉搏'],
          right:100,
          top:8
        },
        yAxis: [{
            splitNumber: 35,
            name: '体温 ℃',
            type:'value',
            max:42,
            min:35,
            axisLabel : {
            formatter :  function (value, index) {
                    if(Math.round(value) === value){
                        return value;
                    }else{
                        return '';
                    }
              }
            },
            minInterval : 0.2 ,
            
            
            
        },
        {
            splitNumber: 44,
            name: '脉搏 次/分',
            type:'value',
            max:180,

            min:40,
            minInterval : 20 ,
            
        }],
        series: [{
          name: '体温',
          type: 'line',
          data: [37.10,36.50,37.00,37.40,38.00,37.00,37.10,36.50,37.00,37.40,38.00,37.00],
          yAxisIndex:0,
          itemStyle : { normal: {label : {show: true}}}
        },
        {
          name: '脉搏',
          type: 'line',
          data: [70,88,99,120,130,70,70,88,99,120,130,70],
          yAxisIndex:1,
          itemStyle : { normal: {label : {show: true}}}
        }]
      })
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text{
  height:200px
}
.filter{
  position:fixed;
  padding-top:0.667rem;
  padding-bottom:0.667rem;
  width:100vw;
  background:rgb(244,244,244);
}
.filter-date-ul{
  display:inline-block
}
.filter-date-li{
  height:4.669rem;
  width:12.5vw;
  float:left;
  line-height:4.669rem;
  background:white;
  border-left:1px solid rgb(200,200,200);
  border-top:1px solid rgb(200,200,200);
  border-bottom:1px solid rgb(200,200,200)
}
.filter-date-li:last-child{
    border-right:1px solid rgb(200,200,200)
}
.focus-class{
    background:rgb(244,244,244)
}
#content{
  display:inline-block;
  width:100vw;
  margin-top:9.9vh
}
#temperature-table{
  position:absolute;
  //left:-14.274rem;
  //top:14.674rem;
  //height:37.5rem;
  //width:66.7rem;
  height:100vh;
  width:100vw;
  overflow:hidden;
  background:white;
  
  //transform:rotate(90deg);
  //-ms-transform:rotate(90deg);   /* IE 9 */
  //-moz-transform:rotate(90deg);  /* Firefox */
  //-webkit-transform:rotate(90deg); /* Safari 和 Chrome */
  //-o-transform:rotate(90deg);
}
.icon-guanbi{
  font-size:2.6rem;

}
#scrollDiv{
  overflow:hidden;
  //height:37.5rem;
  //width:66.7rem;
 height:100vh;
  width:100vw;
}
#table-content{
  //height:37.5rem;
  //width:66.7rem;
  height:100vh;
  width:100vw;
}
.close{
  position:fixed;
  left:0rem;
  z-index:99
}
#controller{
  position:fixed;
  bottom:0px;
  height:7vh;
  width:100vw;
  background:white;
  border-top:1px solid rgb(220,220,220)
}
.controller-btn{
  display:inline-block;
  width:45vw;
  height:5vh;
  line-height:5vh;
  background:rgb(254, 110, 161);
  font-size:1.4rem;
  color:white;
  margin-top:1vh

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






.pat-onfocus{
  background:rgb(239, 239, 244)
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
  width:100vw;
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
  width:100vw;
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
  width:45vw
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


.footer-new-div{
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
  width:100vw;
  overflow-y:auto;
  float:left;
  background:rgb(239, 239, 244)
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




