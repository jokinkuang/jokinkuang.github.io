$(document).ready(function(){

  //Get URL Parameters
  function getUrlParam(name) {
      var re = /<meta.*charset=([^"]+).*?>/i;
      var charset = document.documentElement.innerHTML.match(re)[1];
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        //console.log(unescape(r[2]));
        //console.log(decodeURIComponent(r[2]));
        if (charset == "utf-8") {
          // alert("document charset utf-8");
          return decodeURIComponent(r[2]);
        }
        else {
          // alert("document charset gbk");
          return unescape(r[2]);
        }
      }
      return null;
  }

  var category = getUrlParam('category');

  $.ajax({
    type: "get",
    url: postfile,
    dataType: "json",
    success: function (data) {
      loadPosts(data);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Postfile的JSON格式化错误" + errorThrown);
    }
  });

  //TimeAgo
  var showTimeAgo = function() {
    $("span.time").each(function(){
        $(this).text( $.timeago($(this).attr('date-time')) );
    });
  }

  var loadPosts = function(posts) {
    console.log(posts);
    var text = baidu.template('post-list', posts);
    console.log(text);
    $(".article-list").html(text);
    showTimeAgo();
  }

  $(".article-list").ready(function(){
    //showTimeAgo();
  });

});
