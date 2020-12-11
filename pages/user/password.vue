<template>
	<div>
		<div v-if="pageLoad">
			<form @submit="submit">
				<div class="input-flex">
					<div class="input-flex-label">旧密码</div>
					<input password="password" class="input-flex-text" name="oldpassword">
				</div>
				<div class="input-flex">
					<div class="input-flex-label">新密码</div>
					<input password="password" class="input-flex-text" name="password">
				</div>
				<div class="input-flex">
					<div class="input-flex-label">重复密码</div>
					<input password="password" class="input-flex-text" name="password2">
				</div>
				<button type="submit" form-type="submit" class="btn-row-submit">保存</button>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				pageLoad: true,
				pageData: {}
			}
		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: "登录密码"
			})

			this.getPage();
		},

		methods: {
			getPage: function() {

			},
			submit: function(e) {
				var oldPassword=e.detail.value.oldpassword;
				var password=e.detail.value.password;
				var password2=e.detail.value.password2;
				console.log(oldPassword,password,password2)
				uniCloud.callFunction({
					name:"user-center",
					data: {
						action: 'updatePassword',
						params: {
							oldPassword:oldPassword,
							newPassword:password,
							passwordConfirmation:password2
							 
						}
					},
					 
					success:function(e){
						 
						var res=e.result;
						if(res.code!=0){
							uni.showToast({
								title:res.msg
							})
							return false;
						}
						uni.navigateBack({
							
						})
					},
					fail:function(e){
						console.log(e)
					}
				})
			}
		},

	}
</script>

<style>
</style>
