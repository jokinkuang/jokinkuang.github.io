<script type="text/javascript">
  var duoshuoQuery = {short_name:"{{ site.duoshuo_short_name }}"};
  var duoshuoDir = "{{ site.duoshuo_path }}";
  var duoshuoShortName = "{{ site.duoshuo_short_name }}";
  var duoshuoUserName = "{{ site.duoshuo_user_name }}";
</script>
<script src="{{ site.duoshuo_path }}embed.js"></script>
<style type="text/css">
/**************override duoshuo css*************/
#ds-share #ds-reset.ds-share-inline {
  margin: 0 7px;
}
#ds-thread {
  margin: 5px 10px 5px 5px;
}
#ds-thread #ds-reset .ds-login-buttons .ds-social-links {
	width: auto;
}
#ds-notify {
  bottom: 5px;
  right: 5px;
}
#ds-thread #ds-reset a.ds-user-name[data-user-id='{{ site.duoshuo_user_uid }}']:after {
	content: "博主";
	margin-left: 6px;
	font-size: 12px;
	color: #ffffff;
	background: rgba(62, 46, 46, 0.35);
	border-radius: 4px;
	padding: 1px 3px;
}
#ds-thread #ds-reset span.ds-user-name:after {
  content: "游客";
  margin-left: 6px;
  font-size: 12px;
  color: #bbb6ae;
  /* background: rgba(62, 46, 46, 0.35); */
  border-radius: 4px;
  padding: 1px 3px;
}
</style>
<!--多说的通知区域是从脚本插入的，要覆盖它的样式，也需要在脚本里覆盖，暂时不做 @2016-8-2-->
