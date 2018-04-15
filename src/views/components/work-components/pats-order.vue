
<template>
    <div id="PatsOrder">
    	<div id="filter" >
        <div class='layout'>           
            <ul class='filter-detail-ul'>
              <li class='filter-detail-li' @click='pickDetail'>医嘱类型:({{filter.type}})</li>
              <li class='filter-detail-li' @click='pickDetail'>排序:({{filter.project}})</li>
              <li class='filter-detail-li' @click='pickDetail'>状态:({{filter.state}})</li>
            </ul>   
        </div> 
        
      
    </div>
    <div id="content">
        	  <div class='content-div'>
        	  	<div class='content-title'>
        	  			<div class='layout'>
        	  				<div class='text-align-left-class'>
        	  					<i class='icon iconfont icon-icon-'></i><i class='icon iconfont icon-dengdaizhihang'></i><i class='icon iconfont icon-zhixingchenggong'></i><i class='icon iconfont icon-chexiao'></i><strong style='font-size:1.6rem'>1</strong> &nbsp;&nbsp; 2018-03-30 15:17:00
        	  				</div>
        	  				<div class='text-align-right-class'>
        	  					<div><i class='icon iconfont icon-zhuyuanyishengzhan'></i>&nbsp;&nbsp;姚展锋</div>
        	  				</div>
        	  			</div>
        	  	</div>
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
        	  				 		<td  class='order-detail-td-text-style'>静脉输液&nbspqd&nbsp接瓶加药</td>
        	  				 	</tr>
        	  				 	<tr>
        	  				 		<td  class='order-detail-td-text-style'>首日用药：1 &nbsp; 末日用药：0 </td>
        	  				 	</tr>
        	  				 	<tr>
        	  				 		<td  class='order-detail-td-text-style'>检查&nbsp;qd</td>
        	  				 		
        	  				 	</tr>
        	  				 </table>
        	  			</div>
        	  	</div>
        	  </div>
        </div>
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
  name: 'PatsOrder',
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
            ["所有","时间","最近更新"],
            ["所有","当前有效","仅停止","仅撤销","仅作废"]
        ],
        popupVisible:false
    }
  },
  components:{Picker},
  methods :{
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
.PatsOrder-div{
	height:86vh;
	width:100vw;
	background:rgb(244,244,244);
}
#filter{
	position: fixed;
	padding-top: 1rem;
	padding-bottom: 1rem;
	width: 100vw;
	background: rgb(244,244,244);
}

.filter-detail-ul{
  
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
#content{
 display:inline-block;
  margin-top:5.2016rem;
  height:22vh;
  width:100vw;
}
.content-div{
 	display:inline-block;
 	margin-top:2vh;
}
.content-div:first-child{
	margin-top:2vh;
}
.content-title{
 	width:100vw;
  	height:2.5rem;
  	border-top:2px solid rgb(244,244,244);
  	border-bottom:2px solid rgb(244,244,244);
  	//text-align:left;
  	line-height:2.5rem;
  	background:white;
  	font-size:1.4rem;
  	color:rgb(120,120,120)
}
.content-main{
	border-bottom:2px solid rgb(244,244,244);
}
.text-align-left-class{
	float:left
}
.text-align-right-class{
	float:right
}
.order-td-text-style{
	font-size:1.6rem;
	font-weight:bold;
	text-align:left;
	width:40vw
}
.dosage-td-text-style{
	text-align:right;
	width:50vw;
	color:rgb(245,179,112);
	font-size:1.4rem;
	font-weight:600
}
.order-detail-td-text-style{
	text-align:left;
	font-size:1.3rem;
	color:rgb(120,120,120)
}

</style>


