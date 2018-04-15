<template>
    <div id="Pats">
    	<div id="Infusion">
    	<nheader :routechoice='router'><span slot="title">中西医结合一病区<i class='icon iconfont icon-moreunfold'></i></span></nheader>
        	
		<div id="filter">
    		<search class="search" placeholder="姓名 || 住院号 || 床位号"  @on-change="onChange"  v-model='searchValue' :results="res" :on-cancel="onCancel">
    		<table slot="res">
    			<tr v-for="item in resData" @click="handleResultClick(item)">
    				 <td>{{item.name}}</td>
    			</tr>

    		</table></search>
    		</div>
    	</div>
    	<div id="pats-list">
    		  <div class='pats-list-div' v-for='item in pats' @click="choosePats(item)">
            <table class="pats-list-table">
              <tr >
                <td class='pats-list-title pats-bed'>1011</td>
                <td class="pats-name">{{item.name}}</td>
                <td class="pats-sex">{{item.sex | sex}}</td>
                <td class="pats-age">{{item.age | ageFormat}}</td>
                <td class='pats-list-text-align-right'>状态图标栏</td>
              </tr>
              <tr class="font-format-class">
                <td class='pats-list-title'>医生:</td>
                <td colspan='4' class="pats-list-text-align-left">名字</td>
              </tr>
              <tr class="font-format-class">
                <td class='pats-list-title'>诊断:</td>
                <td colspan='4' class="pats-list-text-align-left">诊断内容</td>
              </tr>
            </table>
        </div>
     
    		
    	</div>
    </div>
</template>

<script>
import nheader from '@/views/components/nheader';
import {Search} from 'vux'
import {indicator} from 'mint-ui'
export default {
  name: 'Pats',
  components:{nheader,Search},
  data () {
    return {
      router:'gohome',
      searchValue:'',
      res:[],
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
      	}
      ],
      resData:[{name:'1'},{name:'2'},{name:'3'}]
    }
  },
 
  methods :{
   	onChange(){

   	},
   	onCancel(){

   	},
   	choosePats(item){
       indicator.open('加载中..');
   		 setTimeout(()=>{
   		 try{
   		 	localStorage.removeItem('pats');
   		 	let patsInfo = {
        			name: item.name,
    				 bed: item.bed,
        			  id: item.id
    	 	};
		 	localStorage.setItem('pats', JSON.stringify(patsInfo));
   		 	this.$router.push({path:'./PatsInfo'});
         	indicator.close();
   		 }
   		 catch(err){
   		 	alert(err+'不支持本地存储功能将导致页面数据无法传递')
   		 }
   		 
       },500)
   	}
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#filter{
	margin-top:4.002rem;
	width:100vw;
	height:5rem
}
#filter .search{
	height:4.002rem;
	margin-top:4.002rem	
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

.pats-list-text-align-left{
	text-align:left
}
.pats-list-text-align-right{
	text-align:right
}
.pat-basic-info-td{
	
}
.pats-list-title{
	width:12vw;
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
.font-format-class{
  font-size:1.4rem;
}

</style>

