<template>
    <div style=''>
    
        <blur :blur-amount=40 style="height:30vh;width:100vw" :url="url">
          <p class="center"><img :src="url"></p>
          <p>小姚</p>
        </blur>
        <div id='formPlane'>
            <group class="group">
              <cell class="cell" :title="myInfoFormText.myInfoTitle"></cell>
              <cell class="cell" :title="myInfoFormText.myBasicInfo" :is-link="true"></cell>
              <cell class="cell" :title="myInfoFormText.myPassword" :is-link="true"></cell>
              <cell class="cell" :title="myInfoFormText.myOperation" :is-link="true"></cell>
            </group>
            <group class="group">
              <cell class="cell" :title="productionFormText.productTitle"></cell>
              <cell class="cell" :title="productionFormText.productTip" :is-link="true"></cell>
              <cell class="cell" :title="productionFormText.productWorkTime" :is-link="true"></cell>
              
            </group>
            <button class="login-out-btn" @click="loginOutConfirm">退出登录</button>
        </div>
    </div>
</template>

<script>
import { Blur,Group,Cell } from 'vux';
import {MessageBox} from 'mint-ui';
export default {
  name: 'Mine',
   components: {
    Blur,
    Group,
    Cell
  },
  data () {
    return {
      url:require('../../assets/img/user.jpg'),
      myInfoFormText:{
           myInfoTitle:"我的资料",
           myBasicInfo:"基本资料",
           myPassword:"密码修改",
           myOperation:"操作记录"
      },
      productionFormText:{
           productTitle:'产品设置',
           productTip:'提示功能',
           productWorkTime:'执行单默认时间'
      }

    }
         
     
   
  },
  methods :{
    loginOutConfirm(){
        
        MessageBox.confirm('确定退出登录吗?').then(action =>{
           this.$router.push({path:'/Login'})
        }).catch(action =>{

        })
    }
  },
  mounted () {

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
</style>

