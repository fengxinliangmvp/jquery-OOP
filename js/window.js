define(['widget', 'jquery', 'jqueryUI', 'template'], function (widget, $, $UI, template) {
    function Window() {
        this.cfg = {
            winType: null,
            width: 500,
            height: 300,
            content: '',
            title: '系统消息',
            text4AlertBtn: '确定',
            text4ConfirmBtn: '确定',
            text4CancelBtn: '取消',
            handler4AlertBtn: null,
            handler4ConfirmBtn: null,
            handler4CancelBtn: null,
            hasCloseBtn: false,
            handler: null,
            skinClassName: null,
            hasMask: true,
            isDraggable: true
        };
        this.list = ["a","b","c"]
    }

    Window.prototype = $.extend({}, new widget.Widget(), {
        showMe: function (content) {
            alert(content || 'sss');
        },
        renderUI: function () {
            var footerContent = '';
            switch (this.cfg.winType) {
                case 'alert':
                    footerContent = 
                    '<input type="button" class="window_alertBtn" value="' + this.cfg.text4AlertBtn + '">';
                    break;
                case 'confirm':
                    footerContent = '<input type="button" class="window_confirmBtn" value="' + this.cfg.text4ConfirmBtn + '">' +
                        '<input type="button" class="window_cancelBtn" value="' + this.cfg.text4CancelBtn + '">';
                    break;
                default:
                    break;
            }
            var showMe = this.showMe;

            var boundingBox = 
            '<div class="window_boundingBox">' +
                '<div class="window_header">' + this.cfg.title + '</div>';
            for (let index = 0; index < this.list.length; index++) {
                var random = Math.floor(Math.random() * 1000);
                boundingBox += '<div class="fxlmvp_' + random + '" >' + index + '</div>'
            }
            boundingBox += '<div class="window_body">' + this.cfg.content + '</div>' +
                '<div class="window_footer">' + footerContent + '</div>';
            '</div>';
            this.boundingBox = $(boundingBox);
            console.log(this.boundingBox);
            if (this.cfg.hasMask) {
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo("body");
            }
            if (this.cfg.hasCloseBtn) {
                this.boundingBox.append('<span class="window_closeBtn">X</span>');
            }
            this.boundingBox.appendTo(document.body);
        },
        bindUI: function () {
            var that = this;
            this.boundingBox.delegate('.window_alertBtn', 'click', function () {
                that.fire('alert');
                that.destroy();
            }).delegate('.window_closeBtn', 'click', function () {
                that.fire('close');
                that.destroy();
            }).delegate('.window_confirmBtn', 'click', function () {
                that.fire('confirm');
                that.destroy();
            }).delegate('.window_cancelBtn', 'click', function () {
                that.fire('cancel');
                that.destroy();
            }).delegate('[class^="fxlmvp_"]', 'click', function (event) {
                // that.showMe(event.target.className);
                var className = event.target.className;
                console.log();
                
                // $('.'+className).html(className);
                that.showMe(className);
                // console.log($('.'+className));
            });
            if (this.cfg.handler4AlertBtn) {
                this.on("alert", this.cfg.handler4AlertBtn);
            }
            if (this.cfg.handler4CloseBtn) {
                this.on("close", this.cfg.handler4CloseBtn);
            }
        },
        syncUI: function () {
            this.boundingBox.css({
                width: this.cfg.width + 'px',
                height: this.cfg.height + 'px',
                left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
                top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + 'px'
            });
            if (this.cfg.skinClassName) {
                this.boundingBox.addClass(this.cfg.skinClassName);
            }
            if (this.cfg.isDraggable) {
                this.boundingBox.draggable();
            }
        },
        destructor: function () {
            this._mask && this._mask.remove();
        },
        alert: function (cfg) {
            $.extend(this.cfg, cfg, { winType: 'alert' });
            this.render();
            return this;
        },
        confirm: function (cfg) {
            $.extend(this.cfg, cfg, { winType: 'confirm' });
            this.render();
            return this;
        }
    });
    return {
        Window: Window
    }
});
