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
             <dheader @close='closeForm'>
                <p slot='title'>新增记录</p>
              </dheader>
              
        </mt-popup>
        <div id='controller'>
          <div class='controller-btn' @click="toggleRightPopup">体温单</div>
          <div class='controller-btn' @click="createForm">新建</div>
        </div>
        
    </div>
   
</template>

<script>
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
      popupVisibleForm:false
    }
  },
  components:{dheader},
  methods :{
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
</style>




