<template>
	<view v-if="pageLoad">
		<view class="row-box">
			<view class="d-userbox">
				<image class="d-userbox-head" mode="widthFix" :src="author.avatar+'?x-oss-process=image/resize,m_fixed,h_100,w_100'"></image>
				<view class="flex-1">
					<view class="d-userbox-nick">{{author.nickname}}</view>
					<view class="d-userbox-follows flex-ai-center">
						<text class="mgr-5">粉丝</text>
						<text class="cl-num mgr-5 flex-center">0</text>
						<view class="flex-1"></view>
						<text class="mgr-5">关注</text>
						<text class="cl-num flex-center">0</text>
					</view>
				</view>
			</view>
		</view>
		<view class="row-box">
			<view class="d-title">{{data.title}}</view>
			<view class="block">
				<image 
					v-for="(item,index) in data.imgList" 
					:key="index" 
					class="wmax" 
					:src="item.imgurl" 
					@click="showImg(item.imgurl)"
					mode="widthFix"></image>
			</view>

			<view class="d-content">
				{{data.content}}
			</view>
			<view class="flex flex-center mgb-10">
				<view class="btn-love  mgr-10" @click="loveToggle(data._id)" v-bind:class="islove?'btn-love-active':''">
					喜欢
				</view>

				<view class="btn-fav mgr-10" @click="favToggle(data._id)" v-bind:class="isfav?'btn-fav-active':''">收藏</view>

			</view>
		</view>
		<view class="comment-hd">跟帖列表</view>
		<cmform tablename="bbs-topic" :objectid="data._id"></cmform>
	</view>
</template>

<script>
	import cmform from "../../components/cmform.vue";
	export default {
		components: {
					cmform
		},
		data: function() {
			return {
				pageLoad:false,
				author: {},
				data: {},
				id: "",
				islove: false,
				isfav: false,
				ssuserid:"",
				unLogin:true
			}
		},
		onLoad: function(ops) {
			this.id = ops.id;
			
			//start 检测登录
			this.ssuserid=getApp().globalData.ssuserid;
			console.log(this.ssuserid);
			console.log(getApp().globalData)
			this.unLogin=getApp().globalData.unLogin;
			//End 检测是否登录 
			this.getPage();
			this.addView();
		},
		methods: {
			getPage: function() {
				var that = this;
				uniCloud.callFunction({
					name: "bbs_topic",
					data: {
						cloudAction: "show",
						params:{
							id: this.id
						}
						
					}
				}).then((res) => {
					var res = res.result.data;
					that.data = res.data;
					 
					that.author = res.user;
					that.pageLoad=true;
				})
				
				uniCloud.callFunction({
					name:"love",
					data:{
						cloudAction:"get",
						params:{
							objectid:this.id,
							tablename:"bbs-topic",
							ssuserid:this.ssuserid,
						}
					},
					success:function(e){
						console.log("love",e);
						if(e.result.data==1){
							that.islove=true;
						}else{
							that.islove=false;
						}
					},
				})
				
				uniCloud.callFunction({
					name:"fav",
					data:{
						cloudAction:"get",
						params:{
							objectid:this.id,
							tablename:"bbs-topic",
							ssuserid:this.ssuserid,
						}
					},
					success:function(e){
						if(e.result.data==1){
							that.isfav=true;
						}else{
							that.isfav=false;
						}
					},
				})
			},
			addView: function() {
				var that = this;
				uniCloud.callFunction({
					name: "bbs_topic",
					data: {
						cloudAction: "addView",
						params:{
							id: this.id,
						}
					}
				}).then((res) => {


				})
			},
			favToggle: function(id) {
				
				var that = this;
				var that = this;
				uniCloud.callFunction({
					name:"fav",
					data:{
						cloudAction:"toggle",
						params:{
							objectid:id,
							tablename:"bbs-topic",
							ssuserid:this.ssuserid,
						}
					},
					success:function(e){
						if(e.result.data.action=='add'){
							that.isfav=true;
						}else{
							that.isfav=false;
						}
						 
					},
					fail:function(e){
						console.log(e)
					}
				}) 
			},
			loveToggle: function(id) {
				console.log(id)
				var that = this;
				uniCloud.callFunction({
					name:"love",
					data:{
						cloudAction:"toggle",
						params:{
							objectid:id,
							tablename:"bbs-topic",
							ssuserid:this.ssuserid,
						}
					},
					success:function(e){
						if(e.result.data.action=='add'){
							that.islove=true;
						}else{
							that.islove=false;
						}
						 
					},
					fail:function(e){
						console.log(e)
					}
				})
			},
			showImg(url) {
				uni.previewImage({
					urls: [url]
				})
			}
		}
	}
</script>

<style>
</style>
