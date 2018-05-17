<template>
    <div id="NurseRecordNormal">
        <nheader routechoice='goback'><span slot='title'>1001床 病人</span><span @click='newRecordMethod' slot='choice'><i class='icon iconfont icon-plus'></i><span style='font-size:1.4rem'>&nbsp;添加</span></span></nheader>
        <div id="pats-list">
              <div class='pats-list-div'>
            <table class="pats-list-table">
              <tr >
                <td class='pats-list-title pats-bed'>1001床</td>
                <td class="pats-name">aa</td>
                <td class="pats-sex">1</td>
                <td class="pats-age">18</td>
                <td class='pats-list-text-align-right'>状态图标栏</td>
              </tr>
              <tr class="font-format-class">
                <td class='pats-list-title'>入院:</td>
                <td colspan='4' class="pats-list-text-align-left">2018-05-11 (第一天)</td>
              </tr>
              <tr class="font-format-class">
                <td class='pats-list-title'>医生:</td>
                <td colspan='4' class="pats-list-text-align-left">bb</td>
              </tr>
              <tr class="font-format-class">
                <td class='pats-list-title'>诊断:</td>
                <td colspan='4' class="pats-list-text-align-left">cc:ss</td>
              </tr>
            </table>
        </div>
         </div>
         <div class='time-filter'>
          <div class='layout'>
            <div class='time-filter-normal time-filter-pre'><i class='icon iconfont icon-next'></i></div>
            <div class='time-filter-normal time-filter-date'>2018-05-11 (第十天)</div>
            <div class='time-filter-normal time-filter-next'><i class='icon iconfont icon-goLeft'></i></div>
           </div>
         </div>
         <div class='record-scroll-div'>
            <div class='record-main-content-div'>
              <div class='record-time'>
                <div class='layout'>
                  <div class='record-time-left'>14:00</div>
                  <div class='record-time-right' @click="sign">点击签名</div>
                 </div>
              </div>
   
              <div class='record-content' @click='editContent1'>
                <div class='layout'>
                  <div class='record-content-left'>护理记录 护理记录 护理记录 护理记录护理记录 护理记录 护理记录 护理记录护理记录 护理记录 护理记录 护理记录</div>
                  <div class='record-content-right'><i class='icon iconfont icon-goLeft'></i></div>
                </div>
              </div>

            </div>


            <div class='record-main-content-div'>
              <div class='record-time'>
                <div class='layout'>
                  <div class='record-time-left'>14:00</div>
                  <div class='record-time-right' @click="sign" v-show='editStatus'>点击签名</div>
                 </div>
              </div>
   
              <div class='record-content'  @click='editContent2'>
                <div class='layout'>
                  <div class='record-content-left'>护理记录 护理记录 护理记录 护理记录护理记录 护理记录 护理记录 护理记录护理记录 护理记录 护理记录 护理记录</div>
                  <div class='record-content-right'><i class='icon iconfont icon-goLeft'></i></div>
                </div>
              </div>
              
            </div>
         </div>

         <mt-popup v-model="newRecordVisible" position="bottom">
            <div class='popup-div'>
                <dheader @close='closeNewRecordMethod'><span slot='title'>1001床 病人</span></dheader>
               <div class="content-main">
                <table class='content-table'>
                  <tr>
                    <td class='text-align-left-td-class table-td'>日期</td>
                    <td class='text-align-right-td-class table-td'>2018-05-11</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>时间</td>
                    <td class='text-align-right-td-class table-td'>08:00</td>
                  </tr>
                </table>
            </div>
        
            </div>
         </mt-popup>

          <mt-popup v-model="editRecordVisible" position="right" >
            <div class='popup-div'>
                <dheader @close='closeEditRecordMethod'><span slot='title'>1001床 病人</span><span slot='icon'><i class='icon iconfont icon-icon10'></i><span style='font-size:1.4rem'>&nbsp;删除</span></span></dheader>

            </div>
         </mt-popup>

    </div>
</template>

<script>
import nheader from '@/views/components/nheader'
import dheader from '@/views/components/dheader'
import { MessageBox,Indicator } from 'mint-ui'

export default {
  name: 'NurseRecordNormal',
  data () {
    return {
      editStatus:false,
      newRecordVisible:false,
      editRecordVisible:false
    }
  },
  components:{nheader,dheader},
  methods :{
     closeNewRecordMethod(){
        this.newRecordVisible = false
     },
     closeEditRecordMethod(){
        this.editRecordVisible = false
     },
     newRecordMethod(){
        this.newRecordVisible = true
     },
     sign(){
     MessageBox({
        $type:'confirm',
        title:'注意',
        confirmButtonText:'确认签名',
        message:'签名后将不能再编辑此护理记录数据<br/>请您确认',
        showCancelButton:true
    }).then(( value ) => {
         
    }).catch((e)=>{
     console.log(e)
    });
     },
     editContent1(){
          this.editRecordVisible=true
     },
     editContent2(){
        if(!this.editStatus){
            MessageBox({
        $type:'confirm',
        title:'提示',
        confirmButtonText:'申请确认',
        message:'此护理记录已经签名确认不可修改<br/>是否申请修改?',
        showCancelButton:true
    }).then(( value ) => {
        console.log(value)
    }).catch((e)=>{
        console.log(e)
    });
        }
     }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#NurseRecordNormal{
  background:rgb(248,248,248)
}
.popup-div{
  width:100vw;
  height:100vh;
  background:rgb(248,248,248)
}
.content-main{
  background:white
}
.content-table{
  width:95vw;
  margin-left:5vw;
  margin-top:3vh;
  
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
.record-main-content-div:first-child{
  margin-top:0vh;
}
.record-main-content-div{
  margin-top:2vh;
}
.record-content{
  background:white;
  padding-top:1vh;
  width:100vw;
  padding-bottom:1vh;
  display:inline-block;
  padding-top:1vh;
  padding-bottom:1vh;
  position:relative;
}
.record-content-left{
  float:left;
  width:80vw;

  font-size:1.4rem;
  
  
  text-align:left
}
.record-content-right{
  float:left;
  width:10vw;
  font-size:1.4rem;
  position:absolute;
  right:0px;
  top:50%;
  margin-right:5vw;
  margin-top:-12px;
  text-align:center
}
.record-scroll-div{
  width:100vw;
  height:72vh;
}
.record-time{
  height:3vh;
  font-size:1.4rem;
  line-height:3vh;
  background:white;
  border-bottom:1px solid rgb(220,220,220)
}
.record-time-left{
  float:left;
  color:rgb(150,150,150);

}
.record-time-right{
  float:right;
  color:red;
}
.pats-list-div:first-child{
    margin-top:8vh
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
  background:rgb(128,200,114);
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
.time-filter{
  height:4vh;

}
.time-filter-normal{
  float:left;
  height:4vh;
  line-height:4vh;
  font-size:1.4rem;
}
.time-filter-pre{
  
  font-size:1.8rem;
  color:rgb(150,150,150)
}
.time-filter-date{
  margin-left:1vw;
}
.time-filter-next{
  font-size:1.8rem;
  color:rgb(150,150,150);
  margin-left:1vw;
}
</style>


