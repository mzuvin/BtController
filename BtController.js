app.LoadScript('tema.js');
app.LoadScript('bluescan.js');
app.LoadScript('settings.js');
app.LoadScript('info.js');
_AddPermissions("Bluetooth,Storage,Record");

function OnStart() {
    app.ShowDebug(false);
    btconn = false;
    //Default ayarlar..
    d = app.LoadText("de", "1");

    if (d == "1") {
        app.SaveBoolean("bt", true);
        app.SaveBoolean("btif", false);
        app.ShowPopup("Ayarlar sıfırlandı");
        app.SaveText("sol", "L");
        app.SaveText("sag", "R");
        app.SaveText("geri", "B");
        app.SaveText("ileri", "F");
        app.SaveText("dur", "S");
        app.SaveText("led1H", "W");
        app.SaveText("led1L", "w");
        app.SaveText("led2H", "U");
        app.SaveText("led2L", "u");
        app.SaveText("led3H", "X");
        app.SaveText("led3L", "x");
        app.SaveText("kornaH", 'V');
        app.SaveText("kornaL", 'v');
        app.SaveNumber("hiz", 100);
        app.SaveNumber("miktar", 50);
        app.SaveText("h", "hızlı");
        app.SaveText("y", "yavaş");
        app.SaveText("ssol", "sol");
        app.SaveText("ssag", "sağ");
        app.SaveText("sgeri", "geri");
        app.SaveText("sileri", "ileri");
        app.SaveText("sdur", "dur");
        app.SaveText("kirmizi", "kırmızı");
        app.SaveText("yesil", "yeşil");
        app.SaveText("sari", "sarı");
        app.SaveText("kkirmizi", "kırmızı kapat");
        app.SaveText("kyesil", "yeşil kapat");
        app.SaveText("ksari", "sarı kapat");
        app.SaveText("kapat", "kapat");
        app.SaveText('skorna', 'ses');
        app.SaveText("skkorna", "sus");
        app.SaveText("de", "2");
    }
    app.SetOrientation("Landscape");
    app.PreventScreenLock(true);
    app.EnableBackKey(false);
    app.SetScreenMode('Full');
    CreateTheme();
    //Create recognition object and set callbacks.
    speech = app.CreateSpeechRec();
    speech.SetOnReady(speech_OnReady);
    speech.SetOnResult(speech_OnResult);
    speech.SetOnError(speech_OnError);


    layMain = app.CreateLayout("Linear", "Vertical,FillXY");
    layMain.SetVisibility("Hide");
    layMains = app.CreateLayout("Linear", "Vertical,FillXY");
    layMains.SetVisibility("Hide");
    layMaini = app.CreateLayout("Linear", "Vertical,FillXY");
    layMaini.SetVisibility("Hide");

    //Create the main layout
    lay = app.CreateLayout("Linear", "Right,Horizontal");
    lay.SetPadding(0.01, 0.05, 0.04, 0);

    //Config    
    var siz = square(0.29);
    var btnwidth = siz.w;
    var btnheigh = siz.h;
    btnclr1 = '#356e9d';
    btnclr2 = '#356e9d';
    btnclrs = '#f8cc40';
    txtsize = 30;

    //Dikey
    LayVert = app.CreateLayout("Linear", "Vertical");

    layHorizUp = app.CreateLayout("Linear", "Horizontal");
    LayVert.AddChild(layHorizUp);
    //Butonlar
    btnled = app.CreateButton("[fa-lightbulb-o]", btnwidth, btnheigh, "FontAwesome,Custom");
    btnled.SetOnTouch(btnled_ontouch);
    btnled.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
    btnled.SetTextShadow(2, 0, 1, "#880000");
    btnled.SetTextSize(txtsize);
    layHorizUp.AddChild(btnled);
    btnup = app.CreateButton("[fa-arrow-up]", btnwidth, btnheigh, "FontAwesome,Custom");
    btnup.SetOnTouch(btnileri_ontouch);
    btnup.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
    btnup.SetTextShadow(2, 0, 1, "#880000");
    btnup.SetTextSize(txtsize);
    layHorizUp.AddChild(btnup);
    btnLed2 = app.CreateButton("[fa-lightbulb-o]", btnwidth, btnheigh, "FontAwesome,Custom");
    btnLed2.SetOnTouch(btnLed2_ontouch);
    btnLed2.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
    btnLed2.SetTextShadow(2, 0, 1, "#880000");
    btnLed2.SetTextSize(txtsize);
    layHorizUp.AddChild(btnLed2);

    //Yatay
    layHoriz = app.CreateLayout("Linear", "Horizontal");
    LayVert.AddChild(layHoriz);

    btnleft = app.CreateButton("[fa-arrow-left]", btnwidth, btnheigh, "FontAwesome,Custom");
    btnleft.SetBackColor('#ffffffff');
    btnleft.SetOnTouch(btnleft_ontouch);
    btnleft.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
    btnleft.SetTextShadow(2, 0, 1, "#880000");
    btnleft.SetTextSize(txtsize)
    layHoriz.AddChild(btnleft);


    //korna
    btnstop = app.CreateButton("[fa-stop]", btnwidth, btnheigh, "FontAwesome,Custom");
    btnstop.SetOnTouch(btnstop_ontouch);
    btnstop.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
    btnstop.SetTextShadow(2, 0, 1, "#880000");
    btnstop.SetTextSize(txtsize);
    layHoriz.AddChild(btnstop);

    //right
    btnright = app.CreateButton("[fa-arrow-right]", btnwidth, btnheigh, "FontAwesome,Custom");
    btnright.SetOnTouch(btnright_ontouch);
    btnright.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
    btnright.SetTextShadow(2, 0, 1, "#880000");
    btnright.SetTextSize(txtsize);
    layHoriz.AddChild(btnright);
    //down
    layHorizD = app.CreateLayout("Linear", "Horizontal");
    LayVert.AddChild(layHorizD);
    btnLed3 = app.CreateButton("[fa-lightbulb-o]", btnwidth, btnheigh, "FontAwesome,Custom");
    btnLed3.SetOnTouch(btnled3_ontouch);
    btnLed3.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
    btnLed3.SetTextShadow(2, 0, 1, "#880000");
    btnLed3.SetTextSize(txtsize);
    layHorizD.AddChild(btnLed3);
    btndown = app.CreateButton("[fa-arrow-down]", btnwidth, btnheigh, "FontAwesome,Custom");
    btndown.SetOnTouch(btngeri_ontouch);
    btndown.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
    btndown.SetTextShadow(2, 0, 1, "#880000");
    btndown.SetTextSize(txtsize);
    layHorizD.AddChild(btndown);
    btnk = app.CreateButton("[fa-bell-o]", btnwidth, btnheigh, "FontAwesome,Custom");
    btnk.SetBackColor('#ffffffff');
    btnk.SetOnTouch(btnkorna_ontouch);
    btnk.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
    btnk.SetTextShadow(2, 0, 5, '#000000');
    btnk.SetTextSize(txtsize)
    layHorizD.AddChild(btnk);

    LayVert2 = app.CreateLayout("Linear", "Vertical");
    btnblue = app.CreateButton("[fa-bluetooth]\nBT", btnwidth, btnheigh, "FontAwesome,Custom");
    btnblue.SetOnTouch(btscanopen);
    btnblue.SetStyle(btnclr1, btnclr2, 0, btnclrs, 3, 0);
    btnblue.SetTextShadow(2, 0, 5, '#000000');
    btnblue.SetTextSize(txtsize / 1.2);
    LayVert2.AddChild(btnblue);
    btnset = app.CreateButton("[fa-gear]\nAyarlar", btnwidth, btnheigh, "FontAwesome,Custom");
    btnset.SetOnTouch(btnset_OnTouch);
    btnset.SetStyle(btnclr1, btnclr2, 0, btnclrs, 3, 0);
    btnset.SetTextShadow(2, 0, 5, '#000000');
    btnset.SetTextSize(txtsize / 1.5);
    LayVert2.AddChild(btnset);
    btnset2 = app.CreateButton("[fa-info-circle]\nBilgi", btnwidth, btnheigh, "FontAwesome,Custom");
    btnset2.SetOnTouch(btninfo_OnTouch);
    btnset2.SetStyle(btnclr1, btnclr2, 0, btnclrs, 3, 0);
    btnset2.SetTextSize(txtsize / 1.5);
    btnset2.SetTextShadow(2, 0, 5, '#000000');
    LayVert2.AddChild(btnset2);

    //LayVert2.SetMargins(0,0,0.1,0)

    LayVertYazi = app.CreateLayout("Linear", "Vertical,Left");
    btnblue = app.CreateButton("B\nT\nS\nC\nR\nI\nP\nT", 0.09, 0.9, "FontAwesome,Custom");
    btnblue.SetStyle(btnclr1, btnclr2, 0, btnclrs, 3, 0);
    btnblue.SetTextShadow(2, 0, 5, '#000000');
    btnblue.SetBackColor(btnclr1)
    btnblue.SetTextSize(txtsize);
    LayVertYazi.AddChild(btnblue);

    lay.AddChild(LayVertYazi);
    lay.AddChild(LayVert2);

    layspeak = app.CreateLayout("Linear", "Vertical");
    lay.AddChild(layspeak);
    //kontrol ile arasına margin.
    layspeak.SetMargins(0, 0, 0.028, 0);
    btnplus = app.CreateButton("[fa-plus]", btnwidth, btnheigh, "FontAwesome,Custom");
    btnplus.SetBackColor('#ffffffff');
    btnplus.SetOnTouch(btnplus_ontouch);
    btnplus.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
    btnplus.SetTextShadow(2, 0, 1, "#880000");
    btnplus.SetTextSize(txtsize)
    layspeak.AddChild(btnplus);

    btnmc = app.CreateButton("[fa-microphone]", btnwidth, btnheigh, "FontAwesome,Custom");
    btnmc.SetBackColor('#ffffffff');
    btnmc.SetOnTouch(btnmic_ontouch);
    btnmc.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
    btnmc.SetTextShadow(2, 0, 1, "#880000");
    btnmc.SetTextSize(txtsize * 2)
    layspeak.AddChild(btnmc);
    btnminus = app.CreateButton("[fa-minus]", btnwidth, btnheigh, "FontAwesome,Custom");
    btnminus.SetBackColor('#ffffffff');
    btnminus.SetOnTouch(btnminus_ontouch);
    btnminus.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
    btnminus.SetTextShadow(2, 0, 1, "#880000");
    btnminus.SetTextSize(txtsize)
    layspeak.AddChild(btnminus);

    lay.AddChild(LayVert);
    app.AddLayout(lay);
    app.AddLayout(layMain);
    app.AddLayout(layMains);
    app.AddLayout(layMaini);
    bset = new Settings(layMains);
    bscan = new BlueScan(layMain);
    binfo = new info(layMaini);
}

function btnminus_ontouch() {
    hiz = hiz - miktar;
    app.ShowPopup(hiz, 'Short');
    if (hiz <= 0) {
        hiz = 0;
        app.ShowPopup('hız değeri: ' + hiz, 'Short');
        btgonder(dur);

    }
    btgonder(hiz);
}

function btnplus_ontouch() {
    hiz = hiz + miktar;
    app.ShowPopup(hiz, 'Short');
    btgonder(hiz);
}

function btnmic_ontouch() {
    //Start recognizing.
    speech.Recognize();
}
//Called when speech engine is ready.
function speech_OnReady() {
    app.ShowPopup("Dinleniyor.", "Short");
    btnmc.SetTextColor(btnclrs);
    c = setInterval('color()', 1000)
    c2 = setInterval('color2()', 2000)
}

function color2() {
    btnmc.SetTextColor("#ffffff");
    btnmc.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
}

function color() {
    btnmc.SetTextColor(btnclrs);
    btnmc.SetStyle(btnclr1, btnclr2, 100, btnclr1, 3, 0);
}

function speech_OnResult(results) {
    //Show the top result.
    seskomut = results[0].toLowerCase();
    clearInterval(c);
    clearInterval(c2);
    app.ShowPopup(seskomut);
    btnmc.SetTextColor("#ffffff");
    if (seskomut == sileri) {
        btgonder(ileri);
    }
    if (seskomut == sgeri) {
        btgonder(geri);
    }
    if (seskomut == ssag) {
        btgonder(sag);
    }
    if (seskomut == ssol) {
        btgonder(sol);
    }
    if (seskomut == kirmizi) {
        btgonder(led1h);
    }
    if (seskomut == kkirmizi) {
        btgonder(led1l);
    }
    if (seskomut == yesil) {
        btgonder(led2h);
    }
    if (seskomut == kyesil) {
        btgonder(led2l);
    }
    if (seskomut == sari) {
        btgonder(led3h);
    }
    if (seskomut == ksari) {
        btgonder(led3l);
    }
    if (seskomut == sdur) {
        btgonder(dur);
    }
    if (seskomut == skorna) {
        btgonder(kornah);
    }
    if (seskomut == skkorna) {
        btgonder(kornal);
    }
    if (seskomut == kapat) {
        btgonder(kornal);
        btgonder(led3l);
        btgonder(led2l);
        btgonder(led1l);
    }
    if (seskomut == hizli) {
        btnplus_ontouch();
    }
    if (seskomut == yavas) {
        btnminus_ontouch();
    }


}
//Called if recognition fails.
function speech_OnError() {
    btnmc.SetTextColor("#ffffff");
    app.ShowPopup("Komut algılanamadı!");
    clearInterval(c);
    clearInterval(c2);
}

function btnileri_ontouch() {
    btgonder(ileri);
}

function btnleft_ontouch() {
    btgonder(sol);
}
ck = 0;

function btnkorna_ontouch() {
    if (ck == 0) {
        btgonder(kornah);
        btnk.SetStyle(btnclrs, btnclrs, 100, btnclr1, 3, 0);
        btnk.SetText('[fa-bell-slash-o]')
        btnk.SetTextColor(btnclr1);
        ck = ck + 1;
    } else {
        btgonder(kornal);
        btnk.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
        btnk.SetText('[fa-bell-o]')
        btnk.SetTextColor("#ffffff");
        ck = 0;
    }
}

function btnright_ontouch() {
    btgonder(sag);
}

function btngeri_ontouch() {
    btgonder(geri);
}

function btnstop_ontouch() {
    btgonder(dur);
}
click1 = 0;

function btnled_ontouch() {
    if (click1 == 0) {
        btgonder(led1h);
        btnled.SetStyle('#ff0404', '#ff0404', 100, btnclr1, 3, 0);
        click1 = click1 + 1;
    } else {
        btgonder(led1l);
        btnled.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
        click1 = 0;
    }
}
click2 = 0;

function btnLed2_ontouch() {

    if (click2 == 0) {
        btgonder(led2h);
        btnLed2.SetStyle('#4caf50', '#4caf50', 100, btnclr1, 3, 0);
        click2 = click2 + 1;
    } else {
        btgonder(led2l);
        btnLed2.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
        click2 = 0;
    }
}

click3 = 0;

function btnled3_ontouch() {
    if (click3 == 0) {
        btgonder(led3h);
        btnLed3.SetStyle('#e2f805', '#e2f805', 100, btnclr1, 3, 0);
        click3 = click3 + 1;
    } else {
        btgonder(led3l);
        btnLed3.SetStyle(btnclr1, btnclr2, 100, btnclrs, 3, 0);
        click3 = 0;
    }
}

function btgonder(kod) {
    if (btconn) {
        bt.Write(kod, '\n');
    } else {
        alert('Bluetooth Cihazı Bağlanmadı.')
        bscan.Show(true);
    }
}

function btninfo_OnTouch() {
    binfo.Show(true);
}

function btnset_OnTouch() {
    bset.Show(true);
}

function btscanopen() {
    bscan.Show(true);
}

function square(size) {
    var ratio = app.GetDisplayWidth() /
        app.GetDisplayHeight();
    var ret = {};
    if (ratio >= 1) // landscape 
    {
        ret.w = size / ratio;
        ret.h = size;
    } else {
        ret.w = size;
        ret.h = size * ratio;
    }
    return ret;
}

function OnBack() {
    if (bset.IsVisible()) {
        bset.Show(false);
    } else if (binfo.IsVisible()) {
        binfo.Show(false);
    } else if (bscan.IsVisible()) {

        bscan.Show(false);
    } else {
        var yesNo = app.CreateYesNoDialog("Uygulamadan Çıkılsın mı?");
        yesNo.SetButtonText("evet", "hayır");
        yesNo.SetOnTouch(function(result) {
            if (result == "Yes") {
                bt = app.LoadBoolean("bt");
                if (bt)
                    app.SetBluetoothEnabled(false);
                app.Exit();
            }
        });
        yesNo.Show();
    }
}