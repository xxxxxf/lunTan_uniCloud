<script>
export default {
	onLaunch: function() {
		//检测是否登录
		var that=this;
		var callRes=uniCloud.callFunction({
			name:'user-center',
			data:{
				action:'checkToken',
				uniIdToken: uni.getStorageSync('uniIdToken')
			},
			success:function(callRes){
				
				if(callRes.result.uid==undefined){
					return false;
				}
				console.log(callRes.result.uid)
				setTimeout(function(){
					getApp().globalData.ssuserid=callRes.result.uid;
					getApp().globalData.unLogin=false;
				},30)
				
			}
		})
		 
		
		//End 检测是否登录 
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	globalData:{
		ssuserid:"",
		unLogin:true
	}
};
</script>

<style>
@import "./common/iconfont.css";
@import "./common/dt-ui-uni.css";
</style>
