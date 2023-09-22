/*
    ---小红书搜索录屏
*/
define("version","9.0.u1254303");
define("resolution","1080*1920");
define("requireVersion","3.4.0");
var calendarname = "com.android.calendar"
var device = Device.searchObject(sigmaConst.DevSelectOne);
var calendarname = "com.android.calendar"
if(!device){
    throw "找不到设备";
};

var keyword = ["好人家火锅底料","火锅底料","火锅底料推荐","重庆火锅底料"]

        var runAppName = "com.xingin.xhs"
        var runapp = device.runApp(runAppName);
        delay(3000);
        if (runapp == 0) {
            ret = get_Activity()
            if (ret.indexOf('intersitial.ui') != -1) {
                device.click(960, 130, tcConst.STATE_PRESS);
//                print(device.name + "关闭广告");
                delay(1000);
            }
            printf(keyword)
            open_ScreenRecord();
            run(keyword)
            delay(1000);
            delay(10000);
            device.closeApp(runAppName);
            delay(20000)
            device.click(195,17);
            print(device.name + "-----------结束")

        } else {
            print(device.name + '打开小红书失败');
            delay(2000);
        }

function Restart_App(appname) {
  for(var i = 0; i < 3; i++){
     try {
       var runapp = device.runApp(appname);   //运行抖音App
       delay(3000);
       if(runapp == 0){
       //ret = get_Activity();
         printf("启动APP执行成功:",+device.name);
         break;
        }else {
            printf("启动APP执行失败:"+device.name);
            delay(2000);
        }
     } catch (err) {
            printf("ERROR:"+device.name+"----"+err);
            }
          }
        }

function run(keywords) {
    device.sendAai({ query: "C:.ImageView&&R:.az9", action: "click" });

    for (var i = 0; i < keywords.length; i++) {
       outerloop:for (var q = 0; q < 3; q++) {
            if (get_Activity().indexOf('index') != -1) {

                device.click(970, 140, tcConst.STATE_PRESS);
//                print(device.name + "进入小红书搜索页");
                delay(1000);
                device.exec("ime set com.sigma_rt.totalcontrol/.ap.service.SigmaIME", 5000);
                delay(1000);
            }else{
                device.send(tcConst.keyCodes.KEYCODE_BACK, tcConst.STATE_PRESS);
                delay(2000)
            }
              // 输入关键
            printf(keywords[i]+"-----"+i)
            var keyword = device.inputTextSync(0, keywords[i]);

            delay(2000);
            var search_text = device.sendAai({ query: "C:.EditText&&R:.dns", action: "getText" });
//                print(device.name + search_text)
            if (search_text.retval == keywords[i]) {
                print(device.name + "输入：" + keywords[i]);
                break outerloop;
            }
            }

        delay(1000);
        // 点击搜索按钮
        device.sendAai({ query: "C:.TextView&&R:.dnx", action: "click" });
        // 滑动页面
        for(var o = 0; o < 5;o++){
          delay(2000);

          ret = device.sendAai({ query: "C:.ImageView&&R:.eb4", action: "getBounds" });
          if(ret == null ){
                delay(5000)
                printf("等待");
          }
          slide = device.move(tcConst.movement.shiftDown);
        }

        }
    }

function get_Activity() {
    for (var q = 0; q < 3; q++) {
        var ret = device.getActivity();
        delay(500);
        if (ret) {
            return ret
        }
    }
    print(device.name + '3次get_Activity都失败')
}
function download(){
    printf("开始下载");
//    var fileName = device.name + "_2" + ".mp4";
    var downloadPath = "/sdcard/Pictures/Screenshots";
    ret = device.download(downloadPath,"C:\\Users\\FOO\\Desktop\\lup");
    print(ret)
}

function open_ScreenRecord(){
//
//  var date = new Date();
//  var new_time = date.getFullYear() + "." + (date.getMonth() + 1)+ "." + date.getDate();
  //  luz =  "screenrecord --bit-rate 3000000 --time-limit 90 "+ "/sdcard/" + device.name + "_2"+ ".mp4 &"
//  device.exec(luz)
  print('开始录制')
  device.swipe([0,0],[500,800],2);
  delete1  = device.sendAai({query:"D:清除所有通知", postAction:"getText"})
  if(delete1 != null){
    device.sendAai({query:"D:清除所有通知", postAction:"click"})
     print('清除所有通知')
      device.swipe([0,0],[500,800],2);
      delay(2000)
  }
  delay(2000)
  device.swipe([500,1200],[540,1700],2)
  device.clickSync("屏幕录制");
  delay(1000);
  clip = device.sendAai({ query: "T:*录制屏幕短片*", action: "getText" });
  if(clip != null){
    message = device.sendAai({ query: "T:*不再提示*", action: "getText" });
    if(message != null){
        delay(1000);
        printf("点击不再提示")
        device.click(98,1424);
    }
    device.clickSync("同意")
    delay(2000)
    device.clickSync("跳过")
  }
   delay(2000)
  device.clickSync("无声")
  device.clickSync("确定");
  delay(4000)
  device.sendAai({query:"D:清除所有通知", postAction:"click"})
  device.swipe([516,28],[500,800],2);
  delay(2000)
  device.swipe([525,1510],[490,800],2);


  // device.click(546,1819,tcConst.STATE_PRESS);

}
