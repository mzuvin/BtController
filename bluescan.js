function BlueScan(layContent) {
    GlayContent = layContent;
    //Get page states.
    this.IsVisible = function() {
        console.log('BlueScanIsVisible' + layContent.IsVisible())
        return layContent.IsVisible()
    }
    this.IsChanged = function() {
        return false
    }

    //Show or hide this page.
    this.Show = function(show) {
        if (show) layContent.Animate("SlideFromLeft");
        else layContent.Animate("fadeout");
    }

    layV = app.CreateLayout("Linear", "Vertical,Left,FillXY");

    layV.SetBackColor("#f8f8f7");

    layVh = app.CreateLayout("Linear", "Horizontal,FillX,Left");
    layVh.SetBackColor("#356e9d");
    btngeri = app.CreateButton("[fa-arrow-left]", 0.1, 0.135, "FontAwesome,Custom");
    btngeri.SetBackColor('#356e9e');
    btngeri.SetOnTouch(btngeri_OnTouch);
    layVh.AddChild(btngeri);


    txt = app.CreateText(" Eşleşen Bluetooth Cihazları");
    txt.SetTextSize(22);
    txt.SetMargins(0, 0.02, 0.3, 0);
    txt.SetBackColor("#356e9d");
    txt.SetTextColor("#ffffff");
    txt.SetTextShadow(2, 0, 1, "#356e9d");
    layVh.AddChild(txt);
    btnfa = app.CreateButton("Yeni Cihaz", 0.2, 0.135, "FontAwesome,Custom");
    btnfa.SetStyle(btnclr1, btnclr2, 0, btnclrs, 2, 0);
    btnfa.SetOnTouch(btyeni);
    layVh.AddChild(btnfa);
    layV.AddChild(layVh);
    layb = app.CreateLayout("linear", "Horizontal,Left");
    layV.AddChild(layb);

    lst1 = app.CreateList("", 1, 0.8);
    lst1.SetBackColor("#f8f8f9");
    lst1.SetOnTouch(lst1_OnTouch);

    layb.AddChild(lst1);
    layContent.AddChild(layV);
    //Eslesen Bluetooth cihazlari
    var devices = app.GetPairedBtDevices();
    if (devices == "") {
        app.ShowPopup('Bluetooh Kapalı..');
        bti = app.LoadBoolean("btif");
        if (bti) {
            app.SetBluetoothEnabled(true);
            app.ShowProgress('Bluetooth Açılıyor.');
            setTimeout("app.HideProgress(); btlist(); ", 2000);
        } else {
            var BtyesNo = app.CreateYesNoDialog("Bluetooth Açılsın mı?");
            BtyesNo.SetOnTouch(BtyesNo_OnTouch);
            BtyesNo.SetButtonText('evet', 'hayır');
            BtyesNo.Show();
        }
    } else {
        btlist();
    }

    bt = app.CreateBluetoothSerial();
    bt.SetOnConnect(bt_OnConnect)
    bt.SetOnReceive(bt_OnReceive);
    bt.SetSplitMode("End", "\n");
}


function btyeni() {
    app.SendIntent(null, null, "android.settings.BLUETOOTH_SETTINGS", null, null, null, null, "result", OnPair);
    return;
}


//Handle end of pairing process.
function OnPair(ret) {
    btlist();
}


function BtyesNo_OnTouch(result) {
    if (result == "Yes") {
        app.SetBluetoothEnabled(true);
        app.ShowProgress('Bluetooth Açılıyor.');
        setTimeout("app.HideProgress(); btlist(); ", 2000);
    } else lst1.AddItem('Bluetooth\'u açıp tekrar uygulamaya girin. ')
}

function btlist() {
    var devices = app.GetPairedBtDevices();
    lst1.SetList("");
    for (d in devices)
        lst1.AddItem(devices[d].name, devices[d].address);
}
//Handle list selection.
function lst1_OnTouch(title, body, type, index) {
    app.ShowProgress("Bağlanıyor...");
    bt.Connect(body);
    lst1.SelectItemByIndex(index);
}
//Called when we are connected.
function bt_OnConnect(ok) {
    app.HideProgress();
    if (ok) {
        btconn = true;
        app.ShowPopup("Bağlandı!");
        GlayContent.Animate("SlideToLeft");
        btnblue.SetStyle(btnclrs, btnclrs, 100, btnclr1, 3, 0);
    } else {
        btconn = false;
        app.ShowPopup("Bağlantı yok!");
        lst.SelectItemByIndex(-1);
        btnblue.SetStyle(btnclr1, btnclr2, 0, btnclrs, 3, 0);
    }
}
//Called when we get data from remote device.
function bt_OnReceive(data) {
    app.ShowPopup(data);
}

function btngeri_OnTouch() {
    GlayContent.Animate("SlideToLeft");
}