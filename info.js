
komut="";
function info(layContent )
{
    GilayContent=layContent;
    //Get page states.
    this.IsVisible = function() { 
        console.log('Info IsVisible' + layContent.IsVisible())
        return layContent.IsVisible() }
    this.IsChanged = function() { return false }
    
    //Show or hide this page.
    this.Show = function( show )
    {
        if( show ) layContent.Animate("SlideFromLeft");
        else layContent.Animate( "fadeout" );
    }
    
    //Create layout for app controls.
    layV= app.CreateLayout( "Linear", "Vertical,Left,FillXY" );
    
    layV.SetBackColor( "#f8f8f7" );
    
    layVh = app.CreateLayout( "Linear", "Horizontal,FillX,Left" );
    layVh.SetBackColor( "#356e9d" );
    btngeri = app.CreateButton( "[fa-arrow-left]", 0.1, 0.135 ,"FontAwesome,Custom,Right");
    btngeri.SetBackColor('#356e9e');
    btngeri.SetOnTouch( btngeriinfo_OnTouch );
    layVh.AddChild( btngeri );
    
    txt = app.CreateText( "Bluetooth Controller" );
    txt.SetTextSize( 22 );
    txt.SetMargins( 0, 0.01, 0.24, 0 );
    txt.SetBackColor( "#356e9d" );
    txt.SetTextColor( "#ffffff" );
    txt.SetTextShadow( 2, 0, 1, "#356e9d" );
    layVh.AddChild( txt );
    btngplay = app.CreateButton( "[fa-star-o]", 0.1, 0.135 ,"FontAwesome,Custom");
    btngplay.SetBackColor('#a4c639');
    btngplay.SetOnTouch( web );
    layVh.AddChild( btngplay );
    
    
    layV.AddChild( layVh );
    
    layC = app.CreateLayout( "Linear", "VCenter,FillXY" );
    layC.SetPadding(0,0.05,0,0);
    img = app.CreateImage( "Img/Bt Controller.png", 0.5, -1 );
    layC.AddChild( img );
    //Create a text with formatting.
    var text = "HC05/HC06 Bluetooth modülüne kod göndermek için yapılmış bir uygulamadır<br>"+
    "Bu uygulama DroidScript Kullanılarak Yapılmıştır.<br>"+ 
    "<font color=#356e9d><h2><a href=https://github.com/mzuvin>" + 
    "@mzuvin</a></h2></font>";
    txt = app.CreateText( text, 0.8, -1, "Html,Link" );
    txt.SetMargins( 0, 0.02, 0, 0 );
    txt.SetPadding( 0.03, 0.03, 0.03, 0.03 );
    txt.SetTextSize( 17 );
    txt.SetTextColor( "#1e73be" );
    layC.AddChild( txt );
    layV.AddChild(layC)
    layContent.AddChild(layV);
}
function btngeriinfo_OnTouch (){
    GilayContent.Animate( "SlideToLeft" );
}

function web()
{
	app.OpenUrl("https://github.com/mzuvin")
}




    
    
    
    
    