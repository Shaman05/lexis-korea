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
        for(var name in navMap){
            if(url.indexOf(name) >= 0){
                $mainNav.find(">ul>li").eq(navMap[name]).addClass("active");
                return;
            }
        }
    }

    function tabInit(){
        var $slide = $(".slide");
        var contentSelector = ".tab-content > div";
        var navSelector = ".tab-nav > span";
        var $content = $slide.find(contentSelector);
        var $nav = $slide.find(navSelector);
        $nav.click(function(){
            var index = $(this).index(navSelector);
            $slide.find(".active").removeClass("active");
            $(this).addClass("active").parent().attr("class", "tab-nav cf active-" + index);
            $content.each(function(i){
                i !== index ? $(this).fadeOut(500) : $(this).fadeIn(500);
            });
        });
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