<template>
    <div id='Mark'>
    	<div id='mark-banner'>
    		<img class="double-border" src='../../assets/img/mark-bg.jpg'/> 
    	</div>
    	<div @click='getRecord'>录音</div>
      <div @clikc='close'></div>
    </div>
</template>

<script>
var r = null;
export default {
  name: 'Mark',
  data () {
    return {
      
    }
  },
  methods :{
    getRecord(){

        if (!window.plus) return;
        r = plus.audio.getRecorder(); 
        alert("获取录音对象成功");
        if ( r == null ) {
            alert( "Device not ready!" );
            return; 
          } 
     
    r.record({filename:"_doc/audio/"}, function(){
      alert( "Audio record success!" );  
      
  }, function(e){
    outLine('录音失败：'+e.message);
  } );
    },
  
  },
  close(){
    r.stop();
    alert("录音停止了");
  },

  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mark-banner{
	

}
.double-border{
	
	 	border: 1.5vw solid #ddd;

        padding: 1.2vw;

        background: #fff;
	    width:95vw

}
</style>


