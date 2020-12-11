<template>
	<view>
		<view v-if="pageLoad">
			<view class="flex flex-center mgt-10 mgb-10">
				<image @click="upload()" mode="widthFix" class="wh-200 pointer" :src="user_head"></image>
			</view>
			<view class="tou mgt-10">
				点击上方切换头像
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageLoad: false,
				pageData: {},
				user_head: "",
				user: {},
				unLogin: true,
				ssuserid: ""
			}
		},
		onLoad: function(option) {
			//start 检测登录
			this.ssuserid = getApp().globalData.ssuserid;
			this.unLogin = getApp().globalData.unLogin;
			if (this.ssuserid == '') return
			//End 检测是否登录  
			this.getPage();
		},

		methods: {
			getPage: function() {
				var that = this;
				uniCloud.callFunction({
					name: "user-center",
					data: {
						"action": "get",
						id: this.ssuserid
					},
					success: function(e) {

						var res = e.result;
						if (res.error) {
							return false;
						}
						console.log(res)
						that.pageLoad = true;
						that.user = res.data.user;
						that.user_head = res.data.user.avatar;
					}
				})
			},
			upload: function() {
				var that = this;
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uniCloud.uploadFile({
							filePath: tempFilePaths[0],
							cloudPath: this.ssuserid+'.uhead.jpg',
							onUploadProgress: function(progressEvent) {
								console.log(progressEvent);
								var percentCompleted = Math.round(
									(progressEvent.loaded * 100) / progressEvent.total
								);
							},
							success(res) {
								if(res.fileID!=undefined){
									uniCloud.callFunction({
										name:"user-center",
										data:{
											"action":"setAvatar",
											uniIdToken: uni.getStorageSync('uniIdToken'),
											params:{
												avatar:res.fileID
											}
										},
										success:function(e){
											if(e.result.code!=0){
												uni.showToast({
													title:e.result.msg
												})
												return false;
											}
											that.user_head=res.fileID
										}
									})
								}
								 
							},
							fail() {},
							complete() {}
						});
						
					}
				});
			}
		},
	}
</script>

<style scoped>
	.tou {
		margin-top: 90rpx;
		color: #888;
		font-size: 24rpx;
		margin: 0 auto;
	}
</style>
