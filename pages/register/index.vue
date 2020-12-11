<template>
	<view class="regBg">
		<view class="regBox" v-if="pageLoad">
			<form    @submit="formSubmit">
			
			
			<view class="input-flex">
				<view class="input-flex-label">昵称</view>
				 <input class="input-flex-text" name="nickname" type="text" placeholder="请填写昵称">
			</view>
			
			<view class="input-flex">
				<view class="input-flex-label">密码</view>
				<input class="input-flex-text" name="password" type="text" password=true  placeholder="请填写密码">
			</view>
			
			<view class="input-flex">
				<view class="input-flex-label">确认密码</view>
				<input class="input-flex-text" name="password2" type="text" password=true  placeholder="请填写密码">
			</view> 
			
			<button type="primary" form-type="submit" class="btn-row-submit btn-success">立即注册</button>
		   
			</form>
		</view>
	</view>
</template>

<script>
	 
	var yzmTimer=60,yzmTime=59,yzmEnable=true;
	export default{
		data:function(){
			return {
				pageLoad:false, 
				pageData:{},
				 
			 
			};
		},
		onLoad:function(option){
			this.pageLoad=true;
		},
		 
		methods:{
			 
			formSubmit:function(e){
				var that=this;
				e.detail.value.username=e.detail.value.nickname;
				if(e.detail.value.password2!=e.detail.value.password){
					uni.showToast({
						title:"两次密码不一样"
					})
					return false;
				}
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'register',
						params: {
							username: e.detail.value.username,
							password: e.detail.value.password,
							nickname:e.detail.value.nickname,
							gold:0,
							grade:0,
							avatar:"/static/user_head.jpg"
						}
					},
					success(e) {
						uni.showModal({
							showCancel: false,
							content: e.result.msg
						})
						if(e.result.code==0){
							uni.setStorageSync('uniIdToken', e.result.token);
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
									getApp().globalData.ssuserid=callRes.result.uid;
									getApp().globalData.unLogin=false;
									uni.reLaunch({
										url:"/"
									})
								}
							})
							
						}
						
					},
					fail(e) {
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '注册失败，请稍后再试'
						})
					}
				}) 
				
			}
		},
	}
</script>

<style>
	.yzmDisable{
		background-color: #eee;
		color: #999;
	}
	.regBox{
		position: absolute;
		top: 50%;
		left: 30upx;
		right: 30upx;
		margin-top: -390upx;
		padding:30upx 20upx;
		background-color: #fff; 
		border-radius: 20upx;
	}
	.regBg{
		background: linear-gradient( #29cee8,#619ad6);
		position: absolute;
		top: 0upx;
		bottom: 0upx;
		left: 0upx;
		right: 0upx;
	}
</style>
