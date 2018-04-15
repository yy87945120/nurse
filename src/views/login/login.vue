<template>
    <div id="Login">
    	<div id="Login-info">
          <div id="username-box">
          <i class="icon iconfont icon-account"></i>
    			<input  id="username" class="input-box" v-model="username"  type='text' placeholder="工号"/>
          </div>
          <div id="password-box">
          <i class="icon iconfont icon-password"></i>
    			<input id="password" class="input-box" v-model="password" type='password' placeholder="密码"/>
          </div>
    	</div>



    	<button id="Login-submit" @click="submit">登录</button>
      <div id="text"> 
          <div>NurseApp v1.0.0</div>
          <div>2018-4-1 RRD</div>
      </div>
    </div>
</template>

<script>
import { requestLogin } from '@/api/api';
import { Indicator } from 'mint-ui';
export default {
  name: 'Login',
  data () {
    return {
      username:'',
      password:'',
      tip:"",
    
      logining:false,
      locList: [{"locDesc":"中西医结合一病区","locId":1},{"locDesc":"中西医结合二病区","locId":2}]
    }
  },
  methods :{
   
   	loadLoc(){
   		
   	},
    submit(){
     
         
        let loginParams = { username: this.username, password: this.password };
        requestLogin(loginParams).then(data => {
         Indicator.open('登录中..');
          let { msg, code, user } = data;
          if (code !== 200) {
                 this.tip="账号或者密码错误";
              } else {
                this.tip="登录成功";
                setTimeout(() => {
                Indicator.close();
                  sessionStorage.setItem('user', JSON.stringify(user));
                  this.$router.push({ path: '/Home' });
                },1000)      
              }
            });
    }
  },
  mounted () {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Login{
  //background:rgb(255,246,249);
  background:url('../../assets/img/bg.png');
  //background:rgba(40,40,40,.8);
  background-size: cover;
  background-repeat:no-repeat;

}
#Login-info{
  margin:17.342rem auto 0rem;
  width:37.5rem;
}
.icon{
  position:absolute;
  font-size:2.5rem;
  line-height:4.9358rem;
  margin-left:1.3125vw;
   color:rgb(254,110,161)
}

 
.input-box{
    width:32.25rem;
    height:4.9358rem;
    background:white;
    border-radius:2px;
    border:none;
    outline:none;
    box-sizing:border-box;
    padding-left:4.5rem;
    padding-right:4.5rem;
    font-family:inherit;
    font-size:1.6rem;
    
}

 #username{
     

 }    
 #password{
   
 }
#password-box{
   margin-top:2.668rem
}

 #Login-submit{
  background:rgb(253,124,178);
  border:none;
  height:4.669rem;
  width:86vw;
  color:white;
  box-shadow:5px 7px 15px rgb(220,220,220);
  border-radius:50px;
  font-size:1.8rem;
  letter-spacing:10px;
  font-family:inherit;
  text-align:center;
  outline:none;
  margin-top:4.669rem
 }

 #text{
    margin-top:14.674rem;
    color:rgb(150,150,150)
 }
</style>
