<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import './common/uni.css';
	@import '/static/icons/iconfont.css';
	/*每个页面公共css */
	page {
		background-color:#2F1F5B;
		color: rgb(255, 255, 255);
	}
</style>
