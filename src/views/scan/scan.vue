<template>
  <div class="scan">
    <div id="bcid">
      <div style="height:40%"></div>
      <p class="tip">...载入中...</p>
    </div>
    <footer>
        <div id="tip-content" style="color:red"><button @click="backhome">回主菜单</button>*请先扫描患者腕带或床头卡 <button @click="nextPage">直接传送</button></div>
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
      
          if(type == 'WD'){
              that.closeScan();
              that.$router.push({name:'scanResult', params:{ patId: triResult, title: '扫描结果' }});
              
              
          }else{
              alert("类型不符，请先扫描病人！");
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
      nextPage() {
          this.closeScan();
          this.$router.push({name:'scanResult', params:{ patId: "WD195790", title: '扫描结果' }});
      },
      backhome() {
          this.closeScan();
          this.$router.push({path : './Home'})
      }
     
    },
     mounted () {
        this.startRecognize();
        this.startScan();
      }
  }
</script>
<style lang="less">
  .scan {
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
