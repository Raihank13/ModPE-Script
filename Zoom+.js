// Zoom+ zoom plus by neo091
//https://github.com/neo091/ModPE-Script
// version 0.0.2

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var GUI;
var ZoomCount = 0;

function newLevel() { //load world
	ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
		try{
			GUI = new android.widget.PopupWindow();
			var layout = new android.widget.LinearLayout(ctx);
			layout.setOrientation(android.widget.LinearLayout.VERTICAL);
			
			var zoomButton = new android.widget.Button(ctx);
			zoomButton.setText("Zoom");
			zoomButton.setOnClickListener(new android.view.View.OnClickListener() {
				onClick: function(v) {

					if(ZoomCount == 0){
						ModPE.setFov(40.1);
						ZoomCount = 1;
					}else if(ZoomCount == 1){
						v.setText("Unzoom");
						ModPE.setFov(20.0);
						ZoomCount = 2;
					}else if(ZoomCount == 2){
						v.setText("Zoom");
						ModPE.resetFov();
						ZoomCount = 0;
					}
				}
			});
			
			layout.addView(zoomButton);
			
			GUI.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
			GUI.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);

			GUI.setContentView(layout);
			GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 120, 0); //to avoid overlapping tooManyItems
		} catch(err){
			print("Error: " + err);
		}
	}}));
}

function leaveGame() { //exit world
	if(ctx!=null) {
		ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
			try{
				if(GUI != null) {
					GUI.dismiss();
					GUI = null;
				}
			}catch(err){
				print("Error: " + err);
			}
		}}));
	}
}
