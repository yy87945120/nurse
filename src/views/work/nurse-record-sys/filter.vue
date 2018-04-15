<template>
    <div id='NurseRecordFilter'>
    	<gohome v-bind:title='this.$route.params.title'></gohome>

    	<div id='fillter-box'> 
    		<div class='layout'>
    			<form> 
    				<table>
    					<tr> 
    						<td>
    							范围:
    						</td>
    						<td>
    							<select id="range">
    								<option value="1">
    									本人
    								</option>
    								<option value="2">
    									本科室
    								</option>
    							</select>
    						</td>
    						<td>
    							
    						</td>
    					 </tr>

    				</table>
    			 </form>
    		</div>
    	</div>
    	<div> 病人列表 </div>
    </div>
</template>

<script>
import nheader from '@/views/components/nheader';
//import {Group } from 'vux'
export default {
  name: 'NurseRecordFilter',
  components:{gohome},
  data () {
    return {
      
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
#fillter-box{
	margin-top:6vh;
	height:6vh;
	


}
</style>
