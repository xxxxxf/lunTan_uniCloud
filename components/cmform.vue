<template>
	<div>
		<div v-if="Object.keys(list).length==0" class="emptyData">暂无评论</div>
		<div v-else id="comment-list" class="comment-list">
			
			<div class="comment-item" v-for="(item,key) in list" :key="key">
				<image class="comment-item-head" :src="item.user.avatar+''"></image>
				<div class="flex-1">
					<view class="flex mgb-5">
						<div class="cl2 f14">
							{{item.user.nickname}}
						</div>
						<view class="flex-1"></view>
						<div class="f12 cl3">
							{{item.createTime}}
						</div>
					</view>
					 
					<div class="comment-item-content" :pid="item.id" :title="'回复@'+item.nickname" :reply_text="'回复@'+item.nickname">
						{{item.content}}
					</div>
				</div>
			</div>
		</div>
		<div class="h60"></div>
		<div class="comment-formbox">
			<div class="comment-input-btn js-write" @click="cmFormShow()" v-bind:class="cmBtnClass">写跟帖</div>
			<form @submit="cmFormSubmit" class="comment-formbox-form js-form" v-bind:class="cmFormClass">
				<div class="none">
					<input type="text" name="tablename" :value="tablename" />
					<input type="text" name="objectid" :value="objectid" />
				</div>
				<textarea name="content" class="comment-formbox-textarea"></textarea>
				<div class="comment-formbox-btns">
					<button formType="submit" class="comment-formbox-bt btn-success  js-submit">评论</button>
					<div class="w60"></div>
					<div @click="cmFormHide()" class="comment-formbox-bt js-cancel">取消</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import mdate from "../common/date.js"; 
	export default {
		props:{
			tablename:"",
			objectid:""
		},
		data:function(){
			return {
				rscount:0,
				list:[],
				cmFormClass:"",
				cmBtnClass:"",
				unLogin:true,
				ssuserid:""
			}
		},
		created:function(){
		 
			this.getList();
			//start 检测登录
			this.ssuserid=getApp().globalData.ssuserid;
			console.log(getApp().globalData)
			this.unLogin=getApp().globalData.unLogin;
			 
			//End 检测是否登录 
		},
		methods:{
			getList:function(){
				var that=this;
				console.log(this.objectid)
				uniCloud.callFunction({
					name:"comment",
					data:{
						cloudAction:"list",
						params:{
							objectid:this.objectid,
							tablename:this.tablename,
							start:0,
							limit:12,
						}
					},
					success:function(e){
						var res=e.result.data;
						that.list=res.list;
						console.log(that.list)
					},
					fail:function(e){
						console.log(e)
					}
					 
				})
			},
			cmFormShow:function(){
				console.log("show");
				this.cmBtnClass="none";
				this.cmFormClass="flex-col";
			},
			cmFormHide:function(){
				console.log("hide");
				this.cmBtnClass="";
				this.cmFormClass="";
			},
			cmFormSubmit:function(e){
				var that=this;
				var params=e.detail.value;
				
				params.userid=this.ssuserid;
				params.status=0;
				params.createTime=new Date().Format("yyyy-MM-dd hh:mm:ss");
				uniCloud.callFunction({
					name:"comment",
					data:{
						cloudAction:"save",
						params:params
					},
					success:function(e){
						if(e.result.error){
							unis.showToast({
								title:e.result.message
							})
							return false;
						}
						that.getList();
						that.cmFormHide();
					}
				})
			}
		}
	}
</script>

<style>

</style>
