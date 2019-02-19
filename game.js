new Vue({                        
	el:"#app",                               
	data:{
		show:true,
		you:100,                  
		monster:100,
		widthY:350,
		widthM:350,
		moveY:0,
		moveM:0,
		timerId:null,
		messages:[]
	},
	methods:{
		resetGame:function()
		{ 
			this.monster=100;
			this.you=100;
            this.widthY=350,
            this.widthM=350,
			this.moveY=0;
			this.moveM=0;
			this.messages=[];
			clearTimeout(this.timerId);
			this.disableButtons(false);   
		},
		update:function(event)
		{
			console.log("UPDATE METHOD");
			var damageM=0;
            if(event.target.id==="attack")
			   damageM=this.calculateDamage(3,12);
		    else if(event.target.id==="specialAttack")
               damageM=this.calculateDamage(12,21);
            else if(event.target.id==="heal"){
            	this.heal();
            }
            else if(event.target.id==="giveUp"){
            	this.show=true;
            	this.resetGame();
            	return;
            }
         this.monster-=damageM;
         this.widthM=(this.monster*3.5);
         if(damageM!=0)
         this.messages.unshift({turn:0,text:'You hit the monster for '+damageM});
         this.moveM=(350-(this.monster*3.5))/2;
         var q=this;//This is not defined inside javascript closures
         this.timerId=setTimeout(function(){
         	q.monsterAttack();
         	q.disableButtons(false);
         },2000);  
         this.disableButtons(true);
         this.checkWin();
     },                                                        
        monsterAttack:function()
        {
        	var damageY=this.calculateDamage(3,12);
        	 this.you-=damageY;
        	 this.widthY=(this.you*3.5)
        	 this.moveY=(350-(this.you*3.5))/2;
        	 this.messages.unshift({turn:1,text:'Monster hit you for '+damageY}); 
        	 this.checkWin()       
        },    
		calculateDamage:function(min,max)
		{   
			return Math.floor((Math.random() * max) + min);
		},
        checkWin:function()
        {
        	if(this.you<=0){
        		this.resetGame();
        		alert('You Lose!!');
        	}
        	else if(this.monster<=0){   
        		this.resetGame();
        		alert('You Win!!');
        	}
        },
        heal:function(){
            var limit=100-this.you;
            	var heal=Math.trunc(limit/2);
            	this.you+=heal;
            	this.widthY=(this.you*3.5)
        	    this.moveY=(350-(this.you*3.5))/2;
        	    this.messages.unshift({turn:0,text:'You healed for '+heal});
        },
        disableButtons:function(bool){
        	var buttons=document.getElementsByTagName("button");
        	    for(var i=0;i<buttons.length;i++){
        	    	var button=buttons[i];
        	    		button.disabled=bool;
        	    }
        	}
	}
});
