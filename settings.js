
komut="";
function Settings(layContent )
{
    GslayContent=layContent;
    //Get page states.
    this.IsVisible = function() { 
        console.log('Settings IsVisible' + layContent.IsVisible())
        return layContent.IsVisible() }
    this.IsChanged = function() { return false }
    
    //Show or hide this page.
    this.Show = function( show )
    {
        if( show ) layContent.Animate("SlideFromLeft");
        else layContent.Animate( "fadeout" );
    }
    layV= app.CreateLayout( "Linear", "Vertical,Left,FillXY" );
    layV.SetBackColor( "#f8f8f7" );
    layVh = app.CreateLayout( "Linear", "Horizontal,FillX,Left" );
    layVh.SetBackColor( "#356e9d" );
    var btngeri = app.CreateButton( "[fa-arrow-left]", 0.1, 0.135 ,"FontAwesome,Custom");
    btngeri.SetBackColor('#356e9e');
    btngeri.SetOnTouch( btngeri1_OnTouch );
    layVh.AddChild( btngeri );
    
    txt = app.CreateText( "Kontrol Ayarları.." );
    txt.SetTextSize( 22 );
    txt.SetMargins( 0, 0.01, 0.4, 0 );
    txt.SetBackColor( "#356e9d" );
    txt.SetTextColor( "#ffffff" );
    txt.SetTextShadow( 2, 0, 1, "#356e9d" );
    layVh.AddChild( txt );
    btnfa= app.CreateButton( "Sıfırla", 0.2, 0.135 ,"FontAwesome,Custom");
    btnfa.SetStyle(btnclr1, btnclr2, 0,btnclrs,2,0 );  
    btnfa.SetOnTouch( sifirla );
    layVh.AddChild( btnfa );
    
    layV.AddChild( layVh );
    layb = app.CreateLayout( "linear", "Horizontal,Left" );
    layV.AddChild(layb);
    
    sol = app.LoadText( "sol");
    sag = app.LoadText( "sag" )
    geri = app.LoadText( "geri" );
    ileri  = app.LoadText( "ileri");
    dur = app.LoadText("dur");
    led1h= app.LoadText("led1H");
    led1l=app.LoadText("led1L");
    led2h= app.LoadText("led2H");
    led2l= app.LoadText("led2L");
    led3h = app.LoadText("led3H");
    led3l= app.LoadText("led3L");
    kornah= app.LoadText("kornaH");
    kornal= app.LoadText("kornaL");
    hiz= app.LoadNumber('hiz');
    miktar= app.LoadNumber('miktar');
    
    //sesli komutlar
    ssol = app.LoadText( "ssol");
    ssag = app.LoadText( "ssag" )
    sgeri = app.LoadText( "sgeri" );
    sileri  = app.LoadText( "sileri");
    sdur = app.LoadText("sdur");
    kirmizi = app.LoadText("kirmizi");
    kkirmizi= app.LoadText("kkirmizi" );
    yesil = app.LoadText("yesil");
    kyesil=app.LoadText("kyesil");
    sari = app.LoadText("sari");
    ksari = app.LoadText("ksari");
    kapat = app.LoadText("kapat");
    skorna= app.LoadText('skorna');
    skkorna=app.LoadText("skkorna");
    hizli = app.LoadText( "h" );
    yavas= app.LoadText("y");
    
    var datalst="sol:sola git: [fa-arrow-left] ,sag:sağa git:[fa-arrow-right],ileri:ileri git:[fa-arrow-up],geri:geri git:[fa-arrow-down],dur:dur: [fa-stop] ,hız:Başlangıç hız ayarı:[fa-plus],hız artışı:Artış miktarı sayısı:[fa-minus],led1 H:Kırmızı ledi aç:[fa-lightbulb-o],led1 L:Kırmızı ledi kapat:[fa-lightbulb-o],led2 H:Yeşil ledi aç:[fa-lightbulb-o],led2 L:Yeşil ledi kapat:[fa-lightbulb-o],led3 H:Sarı ledi aç:[fa-lightbulb-o],led3 L:Sarı ledi kapat:[fa-lightbulb-o],korna H:Korna sesi:[fa-bell-o],korna L:Korna sustur:[fa-bell-slash-o],kapat:Tüm ledleri söndürür sesi kapatır.:[fa-close]";
    lst = app.CreateList(datalst , 0.5, 0.8);
    lst.SetBackColor( "#f8f8f9" );
    lst.SetOnTouch( lst_OnTouch );
    lst.SetOnLongTouch(lst_OnLongTouch);
    layb.AddChild( lst );
    
    layD = app.CreateLayout( "Linear", "Vertical" );
    
    
    txtu = app.CreateText( "Komutu Düzenle" );
    txtu.SetTextSize( 19 );
    txtu.SetPadding( 0, 0.05, 0, 0 );
    txtu.SetTextColor( "#356e9d" );
    txtu.SetTextShadow( 2, 0, 1, "#356e9d" );
    layD.AddChild( txtu );
    edt = app.CreateTextEdit( "komutu giriniz", 0.4, 0.2 );
    edt.SetMargins( 0, 0.02, 0, 0 );
    layD.AddChild( edt );
    
    btnsetk = app.CreateButton( "Kaydet",0.2, -1, "FontAwesome,Custom");
    btnsetk.SetOnTouch( btnsetk_OnTouch );
    btnsetk.SetStyle(btnclr1, btnclr2, 0,btnclrs,2,0 );  
    btnsetk.SetTextSize(20);
    btnsetk.SetTextShadow( 2, 0, 5, '#000000' );
    layD.AddChild( btnsetk );
    txtb = app.CreateText( "Sesli komut düzenlemek için\n listeye basılı tutun\n",0.4,0.17,"Multiline" );
    txtb.SetSize(-1,-1);
    txtb.SetTextSize( 19 );
    txtb.SetPadding( 0, 0.03, 0, 0 );
    txtb.SetTextColor( "#356e9d" );
    //txtu.SetTextShadow( 2, 0, 1, "#356e9d" );
    layD.AddChild( txtb );
    chk = app.CreateCheckBox( "Çıkarken Bt'yi Kapat" );
   
    chk.SetOnTouch( chk_OnTouch );
    layD.AddChild( chk );
     bt = app.LoadBoolean( "bt");
     if(bt)
     chk.SetChecked(true );
     else
     chk.SetChecked(false);
     
     chkb = app.CreateCheckBox( "Otomatik Bt'yi Aç" );
   
    chkb.SetOnTouch( chkb_OnTouch );
    layD.AddChild( chkb );
     bti = app.LoadBoolean( "btif");
     if(bti)
     chkb.SetChecked(true );
     else
     chkb.SetChecked(false);
     
    layb.AddChild( layD );
    layContent.AddChild(layV);
}
function chk_OnTouch( isChecked ) 
{
    if(isChecked){
    app.SaveBoolean(  "bt", isChecked );
    }
    else
    app.SaveBoolean(  "bt", isChecked );
}
function chkb_OnTouch( isChecked ) 
{
    if(isChecked){
    app.SaveBoolean(  "btif", isChecked );
    }
    else
    app.SaveBoolean(  "btif", isChecked );
}

function sifirla()
{
 var yesNos = app.CreateYesNoDialog( "Ayarlar sıfırlansın mı?" );
 yesNos.SetButtonText( "evet","hayır" );
 yesNos.SetOnTouch( function(result){ if(result=="Yes"){app.SaveText("de","1");  app.Exit(); }} );
 yesNos.Show();
}



function lst_OnLongTouch(title, body, type, index){
    lst.SelectItemByIndex( index );
    komut="s"+title;
    txtuChange(title+ ' ses');
    ssdeger="";
    if (title=='sol'){
    ssdeger=ssol;
    }
    if (title=='sag'){
    ssdeger=ssag;
    }
    if (title=='ileri'){
    ssdeger=sileri;
    }
    if (title=='geri'){
    ssdeger=sgeri;
    }
    if (title=='dur'){
    ssdeger=sdur;
    }
    if (title=='led1 H'){
    ssdeger=kirmizi;
    }
     if (title=='led1 L'){
    ssdeger=kkirmizi;
    }
    if (title=='led2 H'){
    ssdeger=yesil;
    }
     if (title=='led2 L'){
    ssdeger=kyesil;
    }
    if (title=='led3 H'){
    ssdeger=sari;
    }
     if (title=='led3 L'){
    ssdeger=ksari;
    }
    if (title=='korna H'){
    ssdeger=skorna;
    }
    if (title=='korna L'){
    ssdeger=skkorna;
    }
    if (title=='kapat')
    ssdeger=kapat;
    if (title=='hız'){
    ssdeger=hizli;
    }
    if (title=='hız artışı'){
    ssdeger=yavas;
    }
    edt.SetText( ssdeger );
}

function lst_OnTouch( title, body, type, index ){
    lst.SelectItemByIndex( index );
    komut=title;
    txtuChange(title);
    sdeger="";
    if (title=='sol'){
    sdeger=sol;
    }
    if (title=='sag'){
    sdeger=sag;
    }
    if (title=='ileri'){
    sdeger=ileri;
    }
    if (title=='geri'){
    sdeger=geri;
    }
    if (title=='dur'){
    sdeger=dur;
    }
    if(title=='led1 H'){
    sdeger=led1h;
    }
    if(title=='led1 L'){
    sdeger=led1l;
    }
    if(title=='led2 H'){
    sdeger=led2h;
    }
    if(title=='led2 L'){
    sdeger=led2l;
    }
    if(title=='led3 H'){
    sdeger=led3h;
    }
    if(title=='led3 L'){
    sdeger=led3l;
    }
    if(title=='korna H')
    sdeger=kornah;
    if (title=='korna L')
    sdeger = kornal;
    if (title=='hız'){
    sdeger=hiz;
    }
    if (title=='hız artışı'){
    sdeger=miktar;
    }
    
    edt.SetText( sdeger );
}

function txtuChange(t){
	txtu.SetText(t+" komutunu düzenle" );
}


function btngeri1_OnTouch ()
{
    GslayContent.Animate( "SlideToLeft" );
}

function btnsetk_OnTouch()
{
	edit = edt.GetText();	
	if (komut ==""){
	alert("Komut Seciniz");
	}
	else{
	 if (komut=='sol'){
     app.SaveText(  "sol", edit );
     sp(edit);
     sol=edit;
    }
    if (komut=='ssol'){
     app.SaveText(  "ssol", edit );
      sp(edit);
     ssol=edit;
    }
     if (komut=='sag'){
     app.SaveText( "sag", edit );
      sp(edit);
     sag=edit;
    }
    if (komut=='ssag'){
     app.SaveText( "ssag", edit );
      sp(edit);
     ssag=edit;
    }
     if (komut=='geri'){
     app.SaveText(  "geri", edit );
      sp(edit);
     geri=edit;
    }
     if (komut=='sgeri'){
     app.SaveText(  "sgeri", edit );
      sp(edit);
    sgeri=edit;
    }
     if (komut=='ileri'){
     app.SaveText( "ileri", edit );
      sp(edit);
     ileri=edit;
    }
    if (komut=='sileri'){
     app.SaveText( "sileri", edit );
      sp(edit);
     sileri=edit;
    }
     if (komut=='dur'){
     app.SaveText( "dur", edit );
      sp(edit);
     dur=edit;
    }
     if (komut=='sdur'){
     app.SaveText( "sdur", edit );
      sp(edit);
     sdur=edit;
    }
     if (komut=='led1 H'){
     app.SaveText( "led1H", edit );
      sp(edit);
     led1h=edit;
    }
     if (komut=='sled1 H'){
     app.SaveText( "kirmizi", edit );
      sp(edit);
     kirmizi=edit;
    }
    if (komut=='led1 L'){
     app.SaveText( "led1L", edit );
      sp(edit);
     led1l=edit;
    }
     if (komut=='sled1 L'){
     app.SaveText( "kkirmizi", edit );
      sp(edit);
     kkirmizi=edit;
    }
     if (komut=='led2 H'){
     app.SaveText( "led2H", edit );
      sp(edit);
     led2h=edit;
    }
     if (komut=='sled2 H'){
     app.SaveText( "yesil", edit );
      sp(edit);
     yesil=edit;
    }
    if (komut=='led2 L'){
     app.SaveText( "led2L", edit );
      sp(edit);
     led2l=edit;
    }
    if (komut=='sled2 L'){
     app.SaveText( "kyesil", edit );
      sp(edit);
     kyesil=edit;
    }
    if (komut=='led3 H'){
     app.SaveText( "led3H", edit );      
      sp(edit);
     led3h=edit;                        
    }
     if (komut=='sled3 H'){
     app.SaveText( "sari", edit );      
      sp(edit);
     sari=edit;                        
    }
     if (komut=='led3 L'){
     app.SaveText( "led3L", edit );
      sp(edit);
     led3l=edit;
    }
     if (komut=='sled3 L'){
     app.SaveText( "ksari", edit );
      sp(edit);
     ksari=edit;
    }
     if (komut=='korna H'){
     app.SaveText( "kornaH", edit );
      sp(edit);
     kornah=edit;
    }
     if (komut=='korna L'){
     app.SaveText( "kornaL", edit );
      sp(edit);
     kornal=edit;
    }
     if (komut=='skorna H'){
     app.SaveText( "skorna", edit );
      sp(edit);
     skorna=edit;
    }
     if (komut=='skorna L'){
     app.SaveText( "skkorna", edit );
      sp(edit);
     skkornal=edit;
    }
    
    if (komut=='hız'){
    edit=parseInt(edit);
    if (!isNaN(edit)){
     app.SaveNumber( "hiz", edit );
      sp(edit);
     hiz=edit;
    
     }else
     alert("lütfen sayı giriniz");
    }
    if (komut=='hız artışı'){
    edit=parseInt(edit);
     if (!isNaN(edit)){
     app.SaveNumber( "miktar", edit );
      sp(edit);
     miktar=edit;
     }else
     alert("lütfen sayı giriniz");
    }
     if (komut=='shız'){
     app.SaveText( "h", edit );
      sp(edit);
     hizli=edit;
     hiz=edit;
     
    }
    if (komut=='shız artışı'){
     app.SaveText( "y", edit );
      sp(edit);
     yavas=edit;
     miktar=edit;
     
    }
    
     
	}	
}

function sp(p)
{
	   app.ShowPopup(p+" Kaydedildi" );
}