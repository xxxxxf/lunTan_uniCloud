<template>
	<view class="">
		<un-login v-if="unLogin"></un-login> 
		<view v-else >
			<view v-if="Object.keys(list).length==0 && isEmpty" class="emptyData">暂无数据</view>
			<view class="sglist">
				<view  class="sglist-item" v-for="(item,index) in list" :key="index">
					<view @click="goDetail(item._id)" class="sglist-title">
						{{item.title}}
					</view>
					<view  @click="goDetail(item._id)" class="sglist-imglist">
						<image class="sglist-imglist-img" mode="widthFix" v-for="(im,imIndex) in item.imgList" :key="imIndex" :src="im.imgurl+'?x-oss-process=image/resize,m_fixed,h_100,w_100'"></image>
					</view>
					<view @click="goDetail(item._id)" class="sglist-desc">
						{{item.content}}
					</view>
					 
				</view>
			</view>
		</view>
		 
	</view>
</template>

<script>
	 
	export default {
		 
		data() {
			return {
				pageLoad:false,
				list: [],
				isFirst:true,
				start:0,
				limit:4,
				unLogin:true,
				ssuserid:"",
				isEmpty: false
			}
		},
		onLoad:function(){
			this.getPage();
		},
		onPullDownRefresh:function(){
			 
			this.getPage();
			uni.stopPullDownRefresh();
		}, 
		onReachBottom:function(){
			
			this.getList();
			
		},
		methods: {
			goDetail:function(id){
				uni.navigateTo({
					url:"../topic/show?id="+id
				})
			},
			 
			getPage: async function(){
				var that=this;
				//start 检测登录
				this.ssuserid=getApp().globalData.ssuserid;
				this.unLogin=getApp().globalData.unLogin;
				if(this.ssuserid==''){
					return false;
				} 
				//End 检测是否登录 
				uniCloud.callFunction({
					name:"bbs_love",
					data:{
						cloudAction:"my",
						params:{
							ssuserid:this.ssuserid,
							start:0,
							limit:this.limit,
						}
					}
				}).then((result)=>{
					var res=result.result.data;
					that.list = res.list;
					if(!that.list.length) {
						that.isEmpty = true
					}
					that.isFirst=false;
					that.start=that.start+that.limit;
					that.pageLoad=true;
				})
			},
			getList: function() {
				var that = this;
				if(that.start==0 && !that.isFirst){
					return false;
				}
				 
				uniCloud.callFunction({
					name: "bbs_love",
					data: {
						cloudAction: "my",
						params:{
							ssuserid:this.ssuserid,
							start:this.start,
							limit:this.limit,
						}
					}
				}).then((result) => {
					var res=result.result.data;
					
					if(that.isFirst){
						that.list = res.list;
						that.isFirst=false;
					}else{
						console.log("getList")
						console.log(that.start,res.list)
						if(res.list.length==0){
							that.start=0;
							return false;
						}
						for(var i in res.list){
							that.list.push(res.list[i])
						}
					}
					that.start=that.start+that.limit;
				})
			},
			
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
