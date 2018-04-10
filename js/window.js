define(['jquery','jqueryUI'], function ($,$UI) {
    function Window() {
        this.cfg = {
            width: 500,
            height: 300,
            content: '',
            title: '系统消息',
            text4AlertBtn: 'OK',
            hasCloseBtn: false,
            handler: null,
            skinClassName: null,
            hasMask: true,
            isDraggable:true
        };
        this.handlers = {}
    }
    Window.prototype = {
        on:function(type,handler){
            if(typeof this.handlers[type]==="undefined"){
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;
        },
        fire:function(type,data){
            if(this.handlers[type] instanceof Array){
                var handlers = this.handlers[type];
                for(var i = 0,len=handlers.length;i<len;i++){
                    handlers[i](data);
                }
            }
        },
        alert: function (cfg) {
            var CFG = $.extend(this.cfg, cfg);
            var that = this;
            var boundingBox = $(
                '<div class="window_boundingBox">' +
                '<div class="window_header">' + CFG.title + '</div>' +
                '<div class="window_body">' + CFG.content + '</div>' +
                '<div class="window_footer"> <input type="button" value="' + CFG.text4AlertBtn + '"></div>' +
                '</div>'
            );
            var btn = boundingBox.find(".window_footer input");
            var mask = null;
            if (CFG.hasMask) {
                mask = $('<div class="window_mask"></div>');
                mask.appendTo("body");
            }
            boundingBox.appendTo("body");
            btn.click(function () {
                // CFG.handler4AlertBtn && CFG.handler4AlertBtn();
                boundingBox.remove();
                mask && mask.remove();
                that.fire("alert");
            });
            boundingBox.css({
                width: this.cfg.width + 'px',
                height: this.cfg.height + 'px',
                left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
                top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + 'px'
            });
            if (CFG.hasCloseBtn) {
                var closeBtn = $('<span class="window_closeBtn">X</span>');
                closeBtn.appendTo(boundingBox);
                closeBtn.click(function () {
                    // CFG.handler4CloseBtn && CFG.handler4CloseBtn();
                    boundingBox.remove();
                    mask && mask.remove();
                    that.fire("close");
                });
            }
            // if(CFG.handler4AlertBtn ){
            //     this.on("alert",CFG.handler4AlertBtn);
            // }
            // if(CFG.handler4CloseBtn ){
            //     this.on("close",CFG.handler4CloseBtn);
            // }
            if (CFG.skinClassName) {
                boundingBox.addClass(CFG.skinClassName);
            }
            if (CFG.isDraggable) {
                boundingBox.draggable();
            }
            return this;
        }
    }
    return {
        Window: Window
    }
});