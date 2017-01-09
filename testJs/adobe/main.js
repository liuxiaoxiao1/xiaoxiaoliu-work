$(function(){
	$(".login-shijue").click(function() {
		location.href = '/user/login?redirect=' + encodeURIComponent(location.href);
	})
});