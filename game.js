new Vue({
	el:"#app",
	data:{
		show:true,
		you:100,                  
		monster:100,
		moveY:0,
		moveM:0
	},
	methods:{
		resetGame:function()
		{ 
			this.monster=100;
			this.you=100;
			this.moveY=0;
			this.moveM=0;
		},
		update:function(){
			var damageM=this.calculateDamage(3,12);
         this.monster-=damageM;
         this.moveM=(350-(this.monster*3.5))/2;
         var q=this;
         setTimeout(function(){
         	q.monsterAttack();
         },1000);  
         if(this.checkWin())
				return;
         },
        monsterAttack:function()
        {
        	if(this.checkWin())
        		return;
        	var damageY=this.calculateDamage(3,12);
        	 this.you-=damageY;
        	 this.moveY=(350-(this.you*3.5))/2;         
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
                return true;
        	}
        	else if(this.monster<=0){
        		this.resetGame();
        		alert('You Win!!');
        		return true;
        	}
        	return false;
        }
	}
});