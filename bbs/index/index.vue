<template>
	<view class="">

		<view class="sglist">
			<view @click="goDetail(item._id)" class="sglist-item" v-for="(item,index) in list" :key="index">
				<view class="sglist-title">
					{{item.title}}
				</view>
				<view class="sglist-imglist">
					<image class="sglist-imglist-img" mode="widthFix" v-for="(im,imIndex) in item.imgList" :key="imIndex" :src="im.imgurl+'?x-oss-process=image/resize,m_fixed,h_100,w_100'"></image>
				</view>
				<view class="sglist-desc">
					{{item.content}}
				</view>
				<view class="sglist-ft">
					<view class="sglist-ft-love">
						{{item.love_num}} </view>
					<view class="sglist-ft-cm">
						{{item.comment_num}} </view>
					<view class="sglist-ft-view">
						{{item.view_num}} </view>
				</view>
			</view>
		</view>
		<m-footer tab="index"></m-footer>
	</view>
</template>

<script>
	import mFooter from "../../components/footer.vue";
	export default {
		components: {
			mFooter
		},
		data() {
			return {
				pageLoad:false,
				list: [],
				isFirst:true,
				start:0,
				limit:4
			}
		},
		onLoad: function() {
			this.getPage();
			//检测是否登录
			var that=this;
			console.log('uniCloud.callFuncti')
			var callRes=uniCloud.callFunction({
				name:'user-center',
				data:{
					action:'checkToken',
					uniIdToken: uni.getStorageSync('uniIdToken')
				},
				// success:function(callRes){
					
				// 	if(callRes.result.uid==undefined){
				// 		return false;
				// 	}
				// 	console.log(callRes.result.uid)
				// 	getApp().globalData.ssuserid=callRes.result.uid;
				// 	getApp().globalData.unLogin=false;
				// }
			})
			 
			
			//End 检测是否登录 
		},
		onPullDownRefresh:function(){
			this.getPage();
			uni.stopPullDownRefresh();
		}, 
		onReachBottom:function(){
			
			this.getList();
		},
		methods: {
			goDetail: function(id) {
				uni.navigateTo({
					url: "../../bbs/topic/show?id=" + id
				})
			},
			getPage: function() {
				var that = this;
				uniCloud.callFunction({
					name: "bbs_topic",
					data: {
						cloudAction: "index",
						params:{
							start:0,
							limit:this.limit
						}
						
					}
				}).then((result) => {
					var res=result.result.data;
					that.list = res.list;
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
				console.log(that.start);
				uniCloud.callFunction({
					name: "bbs_topic",
					data: {
						cloudAction: "index",
						params:{
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
			}
		}
	}
</script>

<style>
 
</style>
