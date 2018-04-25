<template>
    <div id="PatsWorkList">
        
        <div class="filter" id='filter'>
        <div class='layout'>      	   
            <ul class='filter-date-ul'>
              
              <li class='filter-date-li' v-text="index==3?'今天':index+1" :class="index==3?'focus-class':''"  v-for = '(item,index) in 6' ></li>
              <li class='filter-date-li' @click='openPicker'><i class='icon iconfont icon-icon12' style="font-size:2rem"></i></li>
            </ul>   
        </div>
        <div class='layout'>           
            <ul class='filter-detail-ul'>
              <li class='filter-detail-li' @click='pickDetail'>医嘱类型:({{filter.type}})</li>
              <li class='filter-detail-li' @click='pickDetail'>项目:({{filter.project}})</li>
              <li class='filter-detail-li' @click='pickDetail'>状态:({{filter.state}})</li>
            </ul>   
        </div>  

        </div>
    	  <div style="height:87.5vh;width:100vw;overflow:auto;background:rgb(244,244,244)">
          <div class='work-list-div'>
            <div class='work-list-main-content' style="display:inline-block">
           <div class='work-list-title'> <div class="layout"><div class='title-float-left-text'><i class='icon iconfont icon-shuye icon-font-style icon-font-active'></i>【18-04-01】 14:00</div><div class='title-float-right-done-text'><i class='icon iconfont icon-zhuyuanhushizhan icon-font-style'></i>&nbsp;姚展锋 14:05</div><div class='title-float-right-ing-text'><i class='icon iconfont icon-shouye9 icon-font-style'></i>&nbsp;60滴/分</div></div></div>
            <div class='work-list-content' >
            
              <div class="layout">
                 <table style='width:90vw'>
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
 <div class='work-list-main-content' style="display:inline-block">
             <div class='work-list-title'> <div class="layout"><i class='icon iconfont icon-yiliaoqixie icon-font-style'></i></div></div>
            <div class='work-list-content'><div class="layout"></div></div>
            </div>
             </div>
        </div>
        <div id="bottom-tip">
           
        </div>
        <mt-datetime-picker ref="picker" type="date" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" :startDate='startDate' :endDate='endDate' @confirm='startDates' v-model="datePickerValue">
        </mt-datetime-picker>
        <mt-popup
          v-model="popupVisible"
          position="bottom">
            <div class='detail-picker-btn' @click="cancelDetailPicker">取消</div><div class='detail-picker-btn' @click="handleDetailPicker">确认</div>
            <picker :data='detailArr' v-model='detailValue' @on-change='detailChange' class='detailPicker'></picker> 
        </mt-popup>
    </div>
</template>

<script>
import { Picker } from 'vux'
export default {
  name: 'PatsWorkList',
  data () {
    return {
        filter:{
          date:0,
          project:'所有',
          type:'所有',
          state:'所有'
        },
        detailValue:[],
        detailArr:[
            ["所有","长期","临时"],
            ["所有","输液","注射"],
            ["所有","未执行","执行中","已执行"]
        ],
      	startDate:new Date('2014-1-1'),
        endDate:new Date('2014-1-2'),
        datePickerValue:'',
        popupVisible:false   
    }
  },
  components:{Picker},
  methods :{
    
      openPicker() {
        this.$refs.picker.open();
      },
      startDates(){
        console.log(this.pickerValue)
      },
      pickDetail(){
        this.popupVisible = true
      },
  	  detailChange(res){
         
      },
      cancelDetailPicker(){
          this.popupVisible = false
      },
      handleDetailPicker(){
          this.popupVisible = false
          this.filter.type = this.detailValue[0]
          this.filter.project = this.detailValue[1]
          this.filter.state = this.detailValue[2]
      }
  },
  mounted () {
   
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#PatsWorkList{
	background:rgb(244,244,244);
	overflow:auto
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
.filter-detail-ul{
  margin-top:0.3335rem;
}
.filter-detail-li{
  float:left;
  width:29.5vw;
  height:3.2016rem;
  background:white;
  font-size:1.4rem;
  line-height:3.2016rem;
  border-left:1px solid rgb(200,200,200);
  border-top:1px solid rgb(200,200,200);
  border-bottom:1px solid rgb(200,200,200);
  position:relative;
  font-size:1.4rem
}
.filter-detail-li:last-child{
    border-right:1px solid rgb(200,200,200)
}
.float-right{
  right:0px;
  position:absolute;
  margin-right:3px;
  margin-top:1px
}

.focus-class{
    background:rgb(244,244,244)
}
#bottom-tip{
  position:fixed;
  height:4.002rem;
  bottom:0px;
  background:green;
  width:100vw;
  z-index:99
}
.date-span{
  display:inline-block;
  background:blue;
  line-height:11vw
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
.work-list-div{
  display:inline-block;
  width:100vw;
  background:rgb(244,244,244);
  margin-top:10.4052rem
}

.work-list-main-content{
  margin-top:1.0005rem;

}
.work-list-main-content:first-child{
  margin-top:0vh
}
.work-list-title{
  width:100vw;
  height:2.668rem;
  border-top:1px solid rgb(230,230,230);
  border-bottom:1px solid rgb(230,230,230);
  //text-align:left;
  line-height:2.668rem;
  background:white 
}
.work-list-content{

  width:100vw;
  border-bottom:1px solid rgb(230,230,230);
  background:white
}
.icon-font-style{
  font-size:2.4rem;
}
.icon-font-active{
  color:rgb(254, 110, 161)
}
.title-float-left-text{
  float:left
}
.title-float-right-done-text{
  float:right
}
.title-float-right-ing-text{
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
  color:rgb(120,120,120);
  height:1vh
}
</style>


