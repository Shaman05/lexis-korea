/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 13-10-17
 * Time: 下午1:37
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */
$(function(){
    navInit();
    tabInit();
    topicInit();
    splitter();

    var setting = {
        view: {
            showIcon: showIconForTree
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    };

    //该数据应该由服务器返回
    var zNodes =[
        { id:0, pId:0, name:"전체", open:true},
        { id:1, pId:1, name:"법원종류", open:true},
        { id:11, pId:1, name:"대법원(61)"},
        { id:12, pId:1, name:"고등법원(9)"},
        { id:13, pId:1, name:"하급심(28)"},
        { id:2, pId:2, name:"판례등급", open:true},
        { id:11, pId:2, name:"전원합의체(25)"},
        { id:12, pId:2, name:"간행판결(72)"},
        { id:13, pId:2, name:"미간행판결(1)"}
    ];

    function showIconForTree(treeId, treeNode) {
        return !treeNode.isParent;
    }
    $.fn.zTree.init($("#tree"), setting, zNodes);

    function navInit(){
        var $mainNav = $(".main-nav");
        if($mainNav.size() === 0)return;
        var navOffsetTop = $mainNav.offset().top;
        var navMap = {
            "index": 0,
            "search": 1,
            "regulation": 2,
            "cases": 3
        };
        var url = window.top.location.href;
        $(window).scroll(function(){
            if($("html").scrollTop() > navOffsetTop || $("body").scrollTop() > navOffsetTop){
                $mainNav.css("position", "fixed");
            }else{
                $mainNav.css("position", "relative");
            }
        });
        var active = 0;
        for(var name in navMap){
            if(url.indexOf(name) >= 0){
                active = navMap[name];
                break;
            }

        }
        $mainNav.find(">ul>li").eq(active).addClass("active");
    }

    function tabInit(){
        var $slide = $(".slide");
        var contentSelector = ".tab-content > div";
        var navSelector = ".tab-nav > span";
        var $content = $slide.find(contentSelector);
        var $nav = $slide.find(navSelector);
        var $tabContent = $(".tab-content");
        var stepWidth = $tabContent.width();
        var index = 0;
        var timer = null;
        $content.css("width", stepWidth - parseInt($content.css("padding-right"))).eq(0).fadeIn(500);
        $tabContent.css("width", 9999);
        autoPlay();
        $nav.click(function(){
            clearInterval(timer);
            index = $(this).index(navSelector);
            play(index);
            autoPlay();
        });

        function play(index){
            $slide.find(".active").removeClass("active");
            $nav.eq(index).addClass("active").parent().attr("class", "tab-nav cf active-" + index);
            $tabContent.stop().animate({marginLeft: - index*stepWidth}, 500);
        }

        function autoPlay(){
            timer = setInterval(function(){
                index = ++index % $content.size();
                play(index);
            }, 3000);
        }
    }

    function topicInit(){
        var $topic = $(".topic");
        var $items = $topic.find(".item");
        $topic.find(".btn-expand").click(function(){
            $(this).toggleClass("on");
            var isExpandAll = $(this).hasClass("on");
            $items.each(function(){
                if(isExpandAll && !$(this).hasClass("more-show")){
                    $(this).addClass("more-show");
                }
                if(!isExpandAll){
                    $(this).removeClass("more-show");
                }
            });
        });
        $items.find(".cate-more").click(function(){
            $(this).parent().toggleClass("more-show");
        });
    }

    function splitter(){
        var $leftBtn = $(".splitter-left").find(".splitter-btn");
        $leftBtn.data("data-expand", true);
        $leftBtn.click(function(){
            var isExpand = $(this).data("data-expand");
            if(isExpand){
                colSpan();
                $(this).data("data-expand", false);
            }else{
                expand();
                $(this).data("data-expand", true);
            }
        });

        function colSpan(){
            $(".left")
                .css("width", "10px")
                .find(".toc-bar h4,.toc").css("visibility", "hidden");
            $(".right-content").css("margin-left", "-208px");
        }
        function expand(){
            $(".left")
                .css("width", "240px")
                .find(".toc-bar h4,.toc").css("visibility", "visible");
            $(".right-content").css("margin-left", "18px");
        }
    }
});