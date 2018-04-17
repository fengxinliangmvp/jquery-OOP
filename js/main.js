require.config({
    paths : {
        "jquery" : "jquery1.11.3.min",
        "jqueryUI":"jquery-ui.min",
        "widget":"components/widget",
        "template":"template-web"
    }
})
require(['jquery','window'],function($,w){
    $("#b").click(function(){
        var win = new w.Window();
        win.list = {
            dataList:["kobe","james","dt","hd","ss"]
        }
        win.alert({
            content:'welcome!!',
            width:300,
            height:150,
            y:50,
            hasCloseBtn:true,
            skinClassName:'window_skin_b',
            title:'提示',
            text4AlertBtn:'确定?',
            handler4AlertBtn:function(){
                alert("you click the alert button");
            },
            handler4CloseBtn:function(){
                alert("you click the close button");
            }
        });
       
        console.log(win.list);
        window.win = win;
    });
    $("#a").click(function(){
        var win = new w.Window();
        console.log(win);
        
        win.confirm({
            content:'你确定要删除这个文件吗？',
            width:300,
            height:150,
            y:50,
            hasCloseBtn:true,
            skinClassName:'window_skin_b',
            title:'提示',
            text4ConfirmBtn:'是',
            text4CancelBtn:'否'
        }).on("confirm",function(){
            alert("确定");
        }).on("cancel",function(){
            alert("取消");
        });
        window.win = win;
        // win.on("cancel",function(){
        //     alert('cancel!!!~~~');
        // });
        // win.on("alert",function(){
        //     alert("the second alert button");
        // }).on("alert",function(){
        //     alert("the third alert button");
        // }).on("close",function(){
        //     alert("the second close button");
        // });
    });
    
});