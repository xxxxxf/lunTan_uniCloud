<template>
	<view>
		<un-login v-if="unLogin"></un-login>
		<view v-else-if="pageLoad">

			<view class="main-body">
				<view class="uhead">
					<!-- #ifndef MP-WEIXIN -->
						<image @click="gourl('../user/user_head')" 
							class="uhead-img" 
							:src="user.avatar+'?x-oss-process=image/resize,m_fixed,h_100,w_100'"
						></image>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
						<view class="uhead-img" @click="gourl('../user/user_head')">
							<open-data type="userAvatarUrl"></open-data>
						</view>
					<!-- #endif -->
					
					<view class="uhead-box">
						<view class="uhead-nick">{{user.nickname}}</view>

						<view class="uhead-rnum flex-ai-center flex">

							金币
							<text class="cl-money mgl-5 mgr-5">{{user.gold}}</text>

							积分
							<text class="cl-money mgl-5">{{user.grade}}</text>

						</view>

					</view>
					<navigator url="../user/set" class="flex-center btn-small btn-link iconfont icon-settings"></navigator>
				</view>

				<view class="row-box">
					<view @click="gourl('../../bbs/topic/my')" class="row-item">
						<view class="row-item-title">我的帖子</view>
					</view>
					<view @click="gourl('../../bbs/comment/my')"  class="row-item">
						<view class="row-item-title">我的评论</view>
					</view>
					<view @click="gourl('../../bbs/fav/my')"  class="row-item">
						<view class="row-item-title">我的收藏</view>
					</view>
					<view @click="gourl('../../bbs/love/my')" class="row-item">
						<view class="row-item-title">我的点赞</view>
					</view>
					
				</view>


			</view>

		</view>

		<mt-footer tab="my"></mt-footer>
	</view>
</template>

<script>
	import mtFooter from "../../components/footer.vue";
	export default {
		name: 'UserIndex',
		components: {
			mtFooter
		},
		data() {
			return {
				pageLoad: false,
				pageHide: false,
				user: {},
				unLogin: true,
				ssuserid: ""
			}
		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: "个人中心",
			})
			//start 检测登录
			this.ssuserid = getApp().globalData.ssuserid;
			this.unLogin = getApp().globalData.unLogin;
			if (this.ssuserid == '') {
				return false;
			}
			//End 检测是否登录 
			this.getPage();
		},
		onShow: function() {
			//start 检测登录
			this.ssuserid = getApp().globalData.ssuserid;
			this.unLogin = getApp().globalData.unLogin;
			if (this.ssuserid == '') {
				return false;
			}
			//End 检测是否登录 
			this.getPage();
		},
		onHide: function() {

		},
		methods: {
			gourl: function(url) {
				uni.navigateTo({
					url: url,
				})
			},
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
					}
				})
			}
		},
	}
</script>

<style>
	.uhead {
		display: flex;
		flex-direction: row;
		padding: 22upx;
		background-color: #fff;
		margin-bottom: 11upx;
	}
	
	.uhead-img {
		width: 172upx;
		height: 172upx;
		margin-right: 22upx;
		display: block;
		border-radius: 50%;
	}
	
	.uhead-box {
		flex: 1;
	}
	
	.uhead-nick {
		margin-bottom: 10upx;
		font-size: 34upx;
	}
	
	.uhead-rnum {
		color: #999;
		margin-bottom: 32upx;
		line-height: 29upx;
		display: flex;
		font-size: 29upx;
	}
	.row-item-icon{
		font-size: 42rpx;
	}
	.cl-u, .cl-u:before {
	    color: #ed6d53;
		
	}
</style>
