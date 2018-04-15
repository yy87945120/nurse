<template>
    <div id="Bed">
        <nheader></nheader>
    </div>
</template>

<script>
import nheader from '@/views/components/nheader';
export default {
  name: 'Bed',
  components :{
    
  },
  data () {
    return {
      loading:false,
      Pat:[],
      BedList:[]
    }
  },
  methods :{
   
  },
  mounted () {

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
.child-view {  
  position: absolute;  
  left: 0;  
  top: 0;  
  width: 100%;  
  height: 100%;  
  transition: all .5s cubic-bezier(.55,0,.1,1);  
}  
.slide-left-enter, .slide-right-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(30px, 0);  
  transform: translate(30px, 0);  
}  
.slide-left-leave-active, .slide-right-enter {  
  opacity: 0;  
  -webkit-transform: translate(-30px, 0);  
  transform: translate(-30px, 0);  
}  

</style>

