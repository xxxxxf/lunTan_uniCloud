<template>
	<view>
		<view class="footer-row"></view>
		<view class="footer">
			<view @click="goHome()"  :class="{'footer-active':tab=='index'}" class="footer-item icon-home">首页</view>
			<view  @click="goAdd()" :class="{'footer-active':tab=='add'}"  class="footer-item footer-add icon-edit_light">发布</view>
			<view  @click="goUser()" :class="{'footer-active':tab=='my'}"  class="footer-item icon-my_light">我的</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			tab:''
		},
		data() {
			return {
				
			};
		},
		methods:{
			goHome:function(){
				console.log("goHone")
				uni.reLaunch({
					url:"/pages/index/index"
				})
			},
			goAdd:function(){
				console.log("add")
				uni.navigateTo({
					url:"/bbs/topic/add",
					fail:function(e){
						console.log(e, 'goAdd+++')
					} 
				}) 
			},
			goUser:function(){
				uni.reLaunch({
					url:"/pages/user/index"
				})
			}
		}
	}
</script>

<style>
	.footer-active:after{
		color: #FFF;
		background-color: #007AFF;
	}
</style>
