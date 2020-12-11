<template>
	<view>
		<view v-if="pageLoad">
			<view class="row-box">
				 
				<view class="row-item-text"  >
					<view class="row-item-icon icon-people"></view>
					<view class="flex-1"> {{user.nickname}}</view>
					 
				</view>
				
				<view class="row-item" @click="gourl('../user/password')" >
					<view class="row-item-icon icon-password"></view>
					<view class="flex-1">登录密码</view>
				</view>
				 
			</view>
			 
			 <view class="btn-row-submit bg-danger" @click="loginOut()">注销</view>
		</view>
	</view>
</template>

<script>
	 
	export default{
		data:function(){
			return {
				pageLoad:false,
				user: {},
				unLogin:true,
				ssuserid:""
			}
		},
		onLoad:function(option){
		 
			//start 检测登录
			this.ssuserid=getApp().globalData.ssuserid;
			this.unLogin=getApp().globalData.unLogin;
			if(this.ssuserid==''){
				return false;
			} 
			//End 检测是否登录 
			this.getPage();
		},
		 
		methods:{
			getPage: function () {
				var that=this;
				uniCloud.callFunction({
					name:"user-center",
					data:{
						"action":"get",
						id:this.ssuserid
					},
					success:function(e){
						
						var res=e.result;
						if(res.error){
							return false;
						}
						console.log(res)
						that.pageLoad=true;
						that.user=res.data.user;
					}
				}) 
			},
			gourl:function(url){
				uni.navigateTo({
					url:url,
				})
			},
			loginOut:function(){
				var that=this; 
				uni.removeStorageSync('uniIdToken');
				getApp().globalData.ssuserid='';
				getApp().globalData.unLogin=true;
				uni.reLaunch({
					url:"/"
				})
			} 
		},
	}
</script>

<style>
</style>
