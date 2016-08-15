//
// Only For Post
//

$(document).ready(function(){

  $.ajax({
    type: "get",
    url: sitefile,
    dataType: "json",
    success: function (data) {
      loadSiteData(data);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Sitefile的JSON格式化错误" + errorThrown);
    }
  });

  var loadSiteData = function(data) {
    $("#totalPosts").text(data.site.totalPosts);
    $("#totalWords").text(data.site.totalWords);
  }

  //Duoshuo
  var loadDuoshuoData = function() {
    $PC("http://jokin.duoshuo.com/api/posts/list.json", function(data){
      $("#totalComments").text(data.cursor.total);
    });
    $.Duoshuo.settings = { shortName: shortName };
    $(".ds-comments").duoshuo("comments");
    $(".ds-likes").duoshuo("likes");
    $(".ds-reposts").duoshuo("reposts");
  }

  loadDuoshuoData();
});
