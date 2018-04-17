define(['widget', 'jquery', 'text!components/window/window.html','template'], function (widget, $, header,template) {
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
            isDraggable: true,
            random:Math.floor(Math.random()*1000)
        };
        this.list = { dataList: ["a", "b", "c"] }
    }

    Window.prototype = $.extend({}, new widget.Widget(), {
        showMe: function (content) {
            alert(content || 'sss');
        },
        renderUI: function () {
            var render = template.compile(header);
            var html = render(this);
            this.boundingBox = $(html);
            if (this.cfg.hasMask) {
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo("body");
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
