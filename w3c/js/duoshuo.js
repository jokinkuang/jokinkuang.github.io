/**
 * jquery.duoshuo.js
 * http://github.com/hello-xk/
 *
 * Copyright 2016, JokinKuang
 * Free to use under the MIT license.
 *
 * JokinKuang
 * 2016-8-4
 */
(function($, undefined) {
    // Create Object
    $.Duoshuo = function(options, element) {
        this.$el = $(element);
        this._init(options);
    };

    // Settings
    $.Duoshuo.defaults = {
      text: {
        views: "[views]",
        comments: "[comments]",
        likes: "[likes]",
        dislikes: "[dislikes]",
        shares: "[shares]"
      },
      domain: "http://api.duoshuo.com",
      name: "",
      api: {
        comments: function(threadKey) {
          return this.options.domain+"/threads/counts.jsonp?short_name="+this.options.name+"&threads="+threadKey+"&callback=?";
        },
        likes: function(threadKey) {
          return this.options.api.comments.call(this, threadKey);
        }
      },
      cbs: {
        comments: function(jsonObj) {
          return this.$el.text(jsonObj.response[0].comments);
        }
      }
    };
    $.Duoshuo.options = $.Duoshuo.defaults;

    // Functions
    $.Duoshuo.fn =
    $.Duoshuo.prototype = {
        _init: function(options) {
          //save options
          this.options = $.extend(true, {}, $.Duoshuo.defaults, options);
        },
        comments: function(text, threadKey) {
          console.log("this");
          console.log(this);
          var self = this.$el;
          $PC(this.options.api.comments.call(this, threadKey), function(jsonObj){
            console.log(jsonObj);
            self.text(jsonObj.response[threadKey].comments);
          });
        }
    };

    var logError = function(message) {
        if (this.console) {
            console.error(message);
        }
    };

    // jQuery plugin common-code which supports $("selector").duoshuo("methodString") call
    $.fn.duoshuo = function(options) {
        if (typeof options === 'string') {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var instance = $.data(this, 'duoshuo');
                console.log("getout")
                console.log(instance);
                if (!instance) {
                    logError("cannot call methods on duoshuo prior to initialization; " + "attempted to call method '" + options + "'");
                    return;
                }
                // You can call methods with "methodNameString" But not those start with "_"
                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    logError("no such method '" + options + "' for duoshuo instance");
                    return;
                }
                console.log(args);
                instance[options].apply(instance, args);
            });
        } else {
            $.Duoshuo.options = $.extend(true, {}, $.Duoshuo.defaults, options);

            this.each(function() {
                var instance = $.data(this, 'duoshuo');
                if (!instance) {
                    $.data(this, 'duoshuo', new $.Duoshuo(options, this));
                    console.log("new===");
                    console.log(new $.Duoshuo(options, this));
                }
            });
        }
        return this;
    };
})(jQuery);

/*
插件学习时间：
1，详解插件化过程
$.fn.duoshuo = function(options) {      //表示第一个参数赋值给options，其余参数只能通过arguments对象获取
  if (typeof options === 'string') {    //如果第一个参数是字符串，则将其认为是要调用的 方法名
    var args = Array.prototype.slice.call(arguments, 1);
    //slice有两个作用，
    //其一： 数组变量.slice()，用于提取数组一部分
    //其二： Array.prototype.slice.call(类数组对象)，用于将类数组对象(array-like)转换为数组，比如这里的参数列表 等
    //见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    //例子是，将arguments从下标1开始转换为数组args，其实就是去除第一个参数options，剩余的作为数组存储
    this.each(function() {
        var instance = $.data(this, 'duoshuo');     //相当于 $(this).data('duoshuo') 从当前对象获取key为'duoshuo'的数据
        instance[options].apply(instance, args);    //相当于 call，不一样的是，call参数为参数列表call(thisArg[, arg1[, arg2[, ...]]])，
                                                    //而apply参数为参数数组fun.apply(thisArg[, argsArray])。
                                                    //但对于被调用的函数，接收到的实参仍旧是fun([, arg1[, arg2[, ...]]])这种形式
    });
  } else {
    this.each(function() {
        var instance = $.data(this, 'duoshuo');
        if (!instance) {
            $.data(this, 'duoshuo', new $.Duoshuo(options, this));    //创建一个Duoshuo对象存储到this里面，这里的options则作为初始化参数
        }
    });
  }
  return this;
};

$(".ds").duoshuo("stop"); //因为第一次调用，所以是初始化
$(".ds").duoshuo("stop"); //因为非第一次调用，所以是调用Duoshuo的stop方法
$(".ds").duoshuo("get", "comment"); //调用的是Duoshuo的get方法，参数是comment

因为duoshuo里面是调用了each的，所以$(".ds")集合里面每一个对象都含有自己的Duoshuo对象！

2，多个对象公用一个全局变量
// Create a constructor
function A() {}

// Add a prototype property
A.prototype.name = "Freddy";

// Create two object instances from
// the constructor
var a = new A();
var b = new A();

// Both instances have the property
// that we created on the prototype
console.log(a.name); // Freddy
console.log(b.name); // Freddy

// Now change the property on the
// prototype
A.prototype.name = "George";

// Both instances inherit the change.
// Really they are just reading the
// same property from the prototype
// rather than their own property
console.log(a.name); // George
console.log(b.name); // George

如果在任意一个实例中修改这个值，这个值就会改变。

注：这个值是存储在静态的对象里，上述例子的a、b是没有这个属性的。
b.name = "Chris";
console.log(b.hasOwnProperty("name")); // true
console.log(A.prototype.name); //George - 修改的是对象实例，对类prototype里面的变量不受影响
console.log(a.name); // George
console.log(b.name); // Chris - 覆盖了prototype里的同名属性

delete b.name;
console.log(b.hasOwnProperty("name")); // false
console.log(b.name); // George

出处http://stackoverflow.com/questions/16751230/why-declare-properties-on-the-prototype-for-instance-variables-in-javascript

3，jQuery的extend函数详解
this.options = $.extend(true, {}, $.Duoshuo.defaults, options);
//jQuery.extend( [deep ], target, object1 [, objectN ] )
//第一个参数【禁止】为false。true表示递归处理对象内部
//target参数：merge过程修改的载体对象
//objectN：参与merge的对象，越往后面的覆盖前面的同名属性，对象是否覆盖则由第一个参数是否为true决定

//则后者覆盖前者。第一个参数为true，则后者和前者属性合并。
//比如 {"apple":0, "banana": {"weight":52,"price":100}} 与 {"banana": {"price":200}, "durian":100}

//$.extend( object1, object2 );   => Merge object2 into object1
//结果： {"apple":0,"banana":{"price":200},"cherry":97,"durian":100} 后者的"banana"覆盖前者

//$.extend( true, object1, object2 );   => Merge object2 into object1, recursively
//结果：{"apple":0,"banana":{"weight":52,"price":200},"cherry":97,"durian":100} 后者的"banana"和前者合并

//$.extend( {}, defaults, options );    => Merge defaults and options, without modifying defaults   No recursively!!!
//如果defaults和options里面都有对象"banana"，则options的对象覆盖defaults里面的对象，options的同名属性覆盖defaults的同名属性。

//$.extend( true, {}, defaults, options);   => Merge defaults and options recursively
//合并defaults和options里面的对象，options的同名属性覆盖defaults的同名属性。
*/
