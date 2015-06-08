// Mod by neo091
// version 0.0.1

ModPE.setItem(499,"blaze_rod",0,"Dragon Flame Sword");
Item.addCraftRecipe(499,1,0,[4,1,0, 50,1,0, 280,1,0]);

var button_1;  //A window we haven't yet made
var herobrine, GUI, layout, herobnt, is_herobrine;
var messages = ["Ouch dude!","Stop...",":(", ""];
var time = 00;
var runTime =false;

function dip2px(ctx, dips){
 return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function sgMessage(msg){

	clientMessage(ChatColor.BLUE + "[mod]: " + ChatColor.WHITE + msg);

}

function getTime(){




}
function  newLevel() {  //As soon as the world loads
  var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
  //A variable we'll use later to add the button to the current MCPE activity            
  ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
  //This will allow our button to run on the current UI thread of MCPE  
        try { //Try to create our button

        	GUI = new android.widget.PopupWindow();
        	layout = new android.widget.LinearLayout(ctx);
        	layout.setOrientation(android.widget.LinearLayout.VERTICAL);

        	herobnt = new android.widget.Button(ctx);
			herobnt.setText("Crear Herobrine");

			var textview = new android.widget.TextView(ctx);
			textview.setText("Mod By: Neo091");

			//sete simpleguid content style
			var buttonsTextSize = parseInt(15);
			herobnt.setTextSize(buttonsTextSize);
			textview.setTextSize(buttonsTextSize);

			herobnt.setOnClickListener(new android.view.View.OnClickListener(){
				onClick: function(e)
				{
					is_herobrine = true;
					
				}
			});

			layout.addView(textview);
			layout.addView(herobnt);
					
			GUI.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
			GUI.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);

			GUI.setContentView(layout);
			GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 5, 15); //to avoid overlapping tooManyItems



        }catch(err){
          print("Button could not be displayed: " + err); //Print our error if we failed to make the button
        }
  }}));
}


function leaveGame(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
		if(GUI != null){
			GUI.dismiss();
			GUI = null;
		}
	}}));
	riding = false;
}

function modTick(){

	if(is_herobrine){
		herobrine = Level.spawnMob(Player.getX(), Player.getY(), Player.getZ(), 33, "mob/Herobrine.png");
		Entity.setRenderType(herobrine, 3);
		Entity.setNameTag(herobrine, "Herobrine");
		is_herobrine = false;
	}
}
function deathHook(murderer, victim) {
    if (Player.getEntity() == victim) {
    	if(murderer == herobrine){
    		clientMessage("Herobrine te " + ChatColor.Red + " ASESINO!");
    	}
        
    }
}
