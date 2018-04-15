<template>
  <div class="scanPha">
    <div id="bcid">
      <div style="height:40%"></div>
      <p class="tip">...载入中...</p>
    </div>
    <footer>
        <div id="tip-content" style="color:red"><button @click="nextPage('')">关闭</button>*请扫输液瓶贴<button @click="nextPage('SY123')">直接传送</button></div>
    </footer>
  </div>
</template>

<script type='text/ecmascript-6'>
  let scan = null;

  export default {
    data() {
      return {
        patInfo:[]
      }
    },
    props:[],
    methods: {
      //创建扫描控件
      startRecognize() {
   
        let that = this;
        if (!window.plus) return;
        scan = new plus.barcode.Barcode('bcid');
        scan.onmarked = onmarked;
  
        function onmarked(type, result, file) {
          switch (type) {
            case plus.barcode.QR:
              type = 'QR';
              break;
            case plus.barcode.EAN13:
              type = 'EAN13';
              break;
            case plus.barcode.EAN8:
              type = 'EAN8';
              break;
            default:
              type = '其它' + type;
              break;
          }
         
          var triResult = result.replace(/\n/g, '');
         
          var type = triResult.substring(0,2);
      
          if(type == 'SY'){
          	//把triResult返回后台判断与病人id是否符合成功后返回医嘱id关闭 假设医嘱id为'123'
            that.closeScan();
           that.nextPage('SY123'); 
              


            
          }else{
              alert("类型不符，请扫输液瓶贴！");
              that.startScan();
          }
          
            
        }
      },
      //开始扫描
      startScan() {
  
        if (!window.plus) return;
       
          scan.start();
     	
      },
      //关闭扫描
      cancelScan() {
        if (!window.plus) return;
        scan.cancel();
      },
      //关闭条码识别控件
      closeScan() {
      
        if (!window.plus) return;
        scan.close();
      },
      nextPage(id) {
          //传回医嘱id
          this.closeScan();
          this.$emit('toggleShow',id)
      }
     	
    },
     mounted () {
        
      },

  }
</script>
<style lang="less">
  .scanPha {
    height: 100%;
    #bcid {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom:2rem;
      text-align: center;
      color: #fff;
      background: black;
    }
    footer {
      position: absolute;
      left: 0;
      bottom: 0rem;
      width:100vw;
      height: 2rem;
      line-height: 2rem;
      z-index: 2;
      
      #tip-content{
        position:relative;
        height:100%;
        width:100%;
        text-align:center
      }
    }
  }
</style>
