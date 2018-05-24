<template>
    <div id="Voice">
        <div class='voice-icon' @click='startRecognize'><i class='icon iconfont icon-yuyin1'></i></div>
        <div class='tip' v-show='showVisible'>
          <div class='tip-title'>
            <span class='tip-title-content' >{{CID}}关于 {{text}} 可能的操作：</span><span class='close-icon'><i class='icon iconfont icon-guanbi' style='font-size:2.4rem' @click='showVisible = false'></i></span>
          </div>
          <div class='tip-content'>   
            <ol>
              <li class='tip-content-li'>查看 {{text}} 床病人扫码结果</li>
              <li class='tip-content-li'>查看 {{text}} 床病人病历页</li>
              <li class='tip-content-li'>查看 {{text}} 床病人执行单详情</li>
              <li class='tip-content-li'>查看 {{text}} 床病人医嘱详情</li>
              <li class='tip-content-li' @click='goTO'>查看 {{text}} 床病人基础信息</li>
            </ol>       
          </div>
          <div class='tip-footer'>
            <label for='selection'>
                病区选择：
            </label>
            <select>
              <option v-for='item in depList' :value="item.row_id">
                  {{item.dep_desc}}
              </option>
            </select>
          </div>
        </div>
    </div>
</template>

<script>
import {getDepartment} from "@/config";
export default {
  name: 'Voice',
  data () {
    return {
      text:'',
      depList:[],
      showVisible:false,
      CID:''
    }
  },
  components:{},
  methods :{
    getCid(){
      if (!window.plus) return;
      this.CID = plus.push.getClientInfo();
      alert(this.CID);
    },
    startRecognize () {
        let _this = this;
        if (!window.plus) return;
        var options = {};
        options.engine = 'iFly';
        _this.text = "";

        localStorage.removeItem('pats');

        let patsInfo = {
              pat_id:item.pat_id,
              pat_name:item.pat_name,
              bed_desc:item.bed_desc,
              nurse_id:item.nurse_id,
              doctor_id:item.doctor_id
        };
      localStorage.setItem('pats', JSON.stringify(patsInfo));
        this.$router.push({path:'./PatsInfo'});
          indicator.close();
       }
        plus.speech.startRecognize( options, function ( s ) {
        _this.text += parseInt(s);

        _this.showVisible=true;
      }, function ( e ) {
        alert( "语音识别失败："+e.message );
    } );
}
  },
  mounted () {
    this.depList = getDepartment();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.close-icon{
  float:right;
  right:5vw;
  margin-right:3vw;

}
.tip{
  height:60vh;
  border-radius:5px;
  position:fixed;
  top:50%;
  left:50%;
  margin-left:-40vw;
  margin-top:-30vh;
  width:80vw;
  z-index:99;
  background:white; 
  border:1px solid rgb(230,230,230)
}
.tip-title{
  height:6vh;
  width:80vw;
  line-height:6vh;
  border-bottom:1px solid rgb(230,230,230)
}
.tip-title-content{
  float:left;
  margin-left:3vw;
  font-size:1.4rem
}
.tip-content{
  width:77vw;
  margin-left:3vw;
  height:47vh;
  overflow-y:auto;
} 
.tip-content-li{
  width:77vw;
  height:6vh;
  line-height:6vh;
  text-align:left;
  font-size:1.4rem;
  list-style-type:block;
  list-style-position:inside;
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */;
  border-bottom:1px solid rgb(230,230,230)
  
}
.tip-footer{
  height:6vh;
  width:80vw;
  line-height:6vh;
  font-size:1.4rem;
  text-align:left;
  border-top:1px solid rgb(230,230,230);
  padding-left:3vw;
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
}
.voice-icon{
  position:fixed;
  width:14vw;
  height:14vw;
  background:rgb(254, 110, 161);
  border-radius:50%;
  box-shadow: 0px 5px 10px rgb(150,150,150);
  bottom:12vh;
  right:8vw
}
.icon-yuyin1{
  color:white;
  line-height:14vw;
  font-size:3rem;

}
</style>


