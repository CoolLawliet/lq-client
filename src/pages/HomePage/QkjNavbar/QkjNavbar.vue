<template>
<!-- 导航栏 -->
	<div class="qkj-navbar">

	</div>
</template>

<script>
export default {
	name: 'QkjNavbar',
	props: {
		diretionDown: Boolean
	},
	data() {
		return {
			navList: ["相册","说说","视频","个性化"]
		}
	}
}
</script>

<style scoped>
.qkj-navbar{
	width: 100%;
	height: 70px;
	background: linear-gradient(to top, rgb(50,50,50) 0%,rgba(100,100,100,.2) 100%);
	box-shadow: 0 -20px 20px rgba(100,100,100,.1)
}
.qkj-navbar__navitem{
	width: 25%;
	line-height: 20px;
	text-align: center;
	font-size: 14px;
	color: white;
	list-style: none;
	float: left;
}
</style>
