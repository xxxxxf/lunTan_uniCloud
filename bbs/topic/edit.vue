<template>
	<view v-if="pageLoad">
		<form @submit="formSubmit">
			<input type="text" class="none" name="_id" :value="data._id" />
			<view class="input-flex">
				<view class="input-flex-label">主题</view>
				<input :value="data.title" name="title" type="text" class="input-flex-text" />
			</view>
			<view class="textarea-flex">
			<view class="textarea-flex-label">内容</view>
			<textarea :value="data.content" name="content" class="textarea-flex-text"></textarea>
			</view>
			<upimg-box @callParent="callImgList" :defaultImgsList="data.imgList"></upimg-box>
			<button class="btn-row-submit" form-type="submit">发布</button>
		</form>
	 
	</view>
</template>

<script>
	 
	import upimgBox from "../../components/upimgbox.vue";
	export default {
		components:{
			 
			upimgBox
		},
		data:function(){
			return {
				imgsList:[],
				id:"",
				data:{},
				pageLoad:false,
				ssuserid:""
			}
		},
		onLoad:function(ops){
			this.id=ops.id;
			this.getPage();
		},
		methods:{
			callImgList:function(e){
				this.imgsList=e;
			},
			getPage:async function(){
				var that=this;
				//start 检测登录
				this.ssuserid=getApp().globalData.ssuserid;
				this.unLogin=getApp().globalData.unLogin;
				if(this.ssuserid==''){
					return false;
				} 
				//End 检测是否登录 
				uniCloud.callFunction({
					name:"bbs_topic",
					data:{
						cloudAction:"add",
						params:{
							ssuserid:this.ssuserid,
							id:this.id
						}
						
					}
				}).then((result)=>{
					var res=result.result;
				 
					 
					if(res.error){
						uni.showToast({
							title:res.message
						})
						return false; 
					}
					that.pageLoad=true; 
					that.data=res.data.data[0];
					console.log(that.data) 
				})
			},
			formSubmit:function(e){
				var params=e.detail.value;
				params.createTime=Date.now();
			 
				params.imgList=this.imgsList;
				params.ssuserid=this.ssuserid;
				uniCloud.callFunction({
					name: 'bbs_topic',
					data: {
						cloudAction:"save",
						params:params
					}
				}).then((result) => {
					var res=result.result;
					if(res.error){
						uni.showToast({
							title:res.message
						})
						return false; 
					}
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

<style>
</style>
