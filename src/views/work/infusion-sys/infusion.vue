<template>
    <div id="Infusion">
     <nheader :routechoice='router'><span slot="title">智慧输液</span><p slot='choice'><i class="icon iconfont" :class="transition?'icon-all-copy':'icon-all'" @click="togglePerformance"></i></p></nheader>
    
     
     
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
    	

    	
     <div class="page-tab-container">   
     <div class="layout">
     <mt-tab-container v-model="active" swipeable>
  <mt-tab-container-item id="tab-list">
       
  list
  </mt-tab-container-item>
  <mt-tab-container-item id="tab-detail">
  <div id="InfusionInfo">
          <ul>
            <li v-for="(item,index) in InfusionInfo">

              <p v-show="show">{{item.id}}<p/>
              <p>{{item.name}}<p/>
              <p>{{item.startDate}}<p/>
              <p>{{item.startTime}}<p/>
              <p>{{item.endDate}}<p/>
              <p>{{item.endTime}}<p/>
            
              <div class="progressBar"><div class="progressBar-content" :style="{width:((item.needTime/(item.endTime - item.startTime ))*100)+'%'}"></div></div>
              <p v-show="!show">{{item.needTime}}<p/>
              <p v-show="show">{{item.OEOrderDr}}<p/>
              <Countdown @gettime="mytime($event,index)" :value="item.needTime" :start="doStart"></Countdown>
              <p v-show="!show">{{item.state}}<p/>
            </li>
          </ul>
        </div>
     </mt-tab-container-item>
      
</mt-tab-container>

        </div>  
 
    		
  
        </div>
    </div>
</template>

<script>
import nheader from '@/views/components/nheader';
import { getInfusion } from '@/api/api';
import { Countdown,Search} from 'vux';
import { Indicator } from 'mint-ui';
 
export default {
  name: 'Infusion',
  components:{
  	Countdown,
    Indicator,
    Search,
    nheader
  },
  props:['title'],
  data () {
    return {
      	InfusionInfo:[],
      	filter:[],
      	doStart:true,
      	show:false,
        loading:false,
        timeLeft:0,
        active:'tab-list',
        transition:false,
        searchValue:'',
        res:[],
        router:'gohome',
        resData:[]
    }
  },
  methods :{
  		getRandom(){

   		},
      mytime($event,index){
          this.InfusionInfo[index].needTime = $event;
      },
   		getInfusionInfo(){
      let par = {
        name : this.filter.name
      }
       
        Indicator.open('加载中...');
   			getInfusion(par).then((res) => {
        
   				
   		    
  			
        setTimeout(()=>{
          this.InfusionInfo = res.data.InfusionInfo;
     
          Indicator.close();
        },1000)
			});

   		},
      togglePerformance(){
        if( this.active == 'tab-list'){
            this.active='tab-detail'
        }else{
            this.active='tab-list'
        }      
        this.transition = !this.transition;
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
          this.$refs.selectOne.isCancel = false
          this.$refs.selectOne.isFixed = false
          Indicator.open('加载中...');
          
          this.filter = item
           this.getInfusionInfo()
    
      },
      onCancel(){

      }
  },
  mounted () {
  		this.getInfusionInfo('');

  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#InfusionInfo{
	
}


.icon-all{
  float:right;
  font-size:2.2rem;
  font-weight:bold;
}
.icon-all-copy{
   float:right;
  font-size:2.2rem;
  font-weight:bold;
  
  color:rgb(254,110,161);
}

#InfusionInfo>ul>li{
	float:left;
	width:45vw;
	height:13.34rem;
	margin-top:1.334rem
}
#filter{
	
	width:100vw;
	height:5rem;
  line-height:4.002rem;
	margin-top:4.002rem;
	
}
#filter .search{
    margin-top:4.002rem;
    height:4.002rem;
    line-height:3.335rem;
}
#loadingData(){
  
}
.progressBar{
  position:relative;
  height:20px;
  width:120px;
  background:#ccc;
}
.progressBar-content{
  position:alsolute;
  left:0;
  top:0;
 
  height:100%;
  background:black
}
</style>

