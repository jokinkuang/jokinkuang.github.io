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

  function isInArray(item, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == item) {
        return true;
      }
    }
    return false;
  }

  var category = getUrlParam('category');

  $.ajax({
    type: "get",
    url: postfile,
    dataType: "json",
    success: function (data) {
      var posts = getPostsWithCategory(data, category);
      console.log(posts);
      loadPosts(posts);
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

  var getPostsWithCategory = function(data, category) {
    if (category == null || category == "") {
      return data;
    }
    var tmp = data; // this is a reference, if need copy use $.extend
    for (var i = 0; i < tmp.posts.length; i++) {
      if (! isInArray(category, tmp.posts[i].categories)) {
        tmp.posts.splice(i, 1);
        i--;  //while delete, the index should not increase
      }
    }
    return tmp;
  }

  var loadPosts = function(posts) {
    //console.log(posts);
    var text = baidu.template('post-list', posts);
    //console.log(text);
    $(".article-list").html(text);
    showTimeAgo();
  }

  $(".article-list").ready(function(){
    //showTimeAgo();
  });

});
