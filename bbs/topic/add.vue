<template>
	<view>
		<un-login v-if="unLogin"></un-login> 
		<form v-else @submit="formSubmit">
			<view class="input-flex">
				<view class="input-flex-label">标题:</view>
				<input name="title" type="text" class="input-flex-text" />
			</view>
			<view class="textarea-flex">
				<view class="textarea-flex-label">内容:</view>
				<textarea name="content" class="textarea" />
			</view>
			<upimg-box @callParent="callImgList" :defaultImgsList="[]"></upimg-box>
			<button class="btn-row-submit" form-type="submit">发布</button>
		</form>
		<m-footer tab="add"></m-footer>
	</view>
</template>

<script>
	 
	import upimgBox from "../../components/upimgbox.vue";
	import mFooter from "../../components/footer.vue";
	export default {
		components:{
			mFooter, 
			upimgBox
		},
		data:function(){
			return {
				imgsList:[],
				unLogin:true,
				ssuserid:""
			}
		},
		onLoad:function(){
			this.getPage();
	
		},
		methods:{
			getPage:function(){
				//start 检测登录
				this.ssuserid=getApp().globalData.ssuserid;
				this.unLogin=getApp().globalData.unLogin;
				if(this.ssuserid==''){
					return false;
				} 
				//End 检测是否登录 
			},
			callImgList:function(e){
				this.imgsList=e;
			},
			formSubmit:function(e){
				var params=e.detail.value;
				params.createTime=Date.now()/1000;
				 
				params.imgList=this.imgsList;
				params.userid=this.ssuserid;
				params.love_num=0;
				params.view_num=1;
				params.comment_num=0;
				params.status=0;
				uniCloud.callFunction({
					name: 'bbs_topic',
					data: {
						cloudAction:"save",
						params:params
					}
				}).then((res) => {
					uni.showToast({
						title:"发布成功"
					}) 
					uni.navigateBack()
				}).catch((err) => {
					 
					console.error(err)
				})
			}
		}
	}
</script>

<style scoped>
	.textarea {
		width: 96%;
		font-size: 28rpx;
		color: #1E1E1E;
		border: 1rpx solid #eee;
		padding: 16rpx;
		border-radius: 8rpx;
	}
</style>
