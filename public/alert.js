 window.alert = function(text) {

        //实现alert
        var div = document.createElement("div");
        div.style.backgroundColor = " #22b9ff";
        div.style.color = " #fff";
        div.style.position = " fixed";
        div.style.zIndex = 9999999;
        div.style.height = " 60px";
        div.style.top = " 10%";
        div.style.left = "50%";
        div.style.lineHeight = " 60px";
        div.style.borderRadius = " 4px";
        div.style.fontSize = " 20px";
        div.style.textAlign = "center";
        div.style.padding = "0 10px";
        div.className = "animated  bounceInDown";
        div.id = "alert";
        div.innerHTML = text;
        document.getElementsByTagName("body")[0].appendChild(div);
        var selfObj = document.getElementById("alert");
        //动态调整位置
        var alertWidth = window.getComputedStyle(selfObj, null).width;
        div.style.marginLeft = -parseInt(alertWidth) / 2 + "px";
        setTimeout(function() {
            document.getElementsByTagName("body")[0].removeChild(div);
        }, 1500);
    }
