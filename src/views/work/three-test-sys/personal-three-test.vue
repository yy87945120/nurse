<template>
    <div id="PersonalThreeTest">
        <nheader :routechoice='router'><p slot='title'>1001床 姚展锋</p></nheader>
        <ptt style='margin-top:6.3vh'></ptt>
    
    </div>
</template>

<script>
import nheader from '@/views/components/nheader';
import ptt from '@/views/components/work-components/pats-three-test';
export default {
  name: 'PersonalThreeTest',
  data () {
    return {
      router:'goback'
    }
  },
  components:{nheader,ptt},
  methods :{
    
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>


