require.config({
    paths : {
        "jquery" : "jquery1.11.3.min",
        "jqueryUI":"jquery-ui.min"
    }
})

require(['jquery','window'],function($,w){
    var win = new w.Window();
    $("#a").click(function(){
        win.alert({
            content:'welcome!!',
            width:300,
            height:150,
            y:50,
            hasCloseBtn:true,
            skinClassName:'window_skin_b',
            title:'提示',
            text4AlertBtn:'确定?'
            // handler4AlertBtn:function(){
            //     alert("you click the alert button");
            // },
            // handler4CloseBtn:function(){
            //     alert("you click the close button");
            // }
        });
    });
    win.on("alert",function(){
        alert("the second alert button");
    }).on("alert",function(){
        alert("the third alert button");
    }).on("close",function(){
        alert("the second close button");
    });
    // win.on("alert",function(){
    //     alert("the second alert button");
    // });
    // win.on("alert",function(){
    //     alert("the third alert button");
    // });
    // win.on("close",function(){
    //     alert("the second close button");
    // });
});