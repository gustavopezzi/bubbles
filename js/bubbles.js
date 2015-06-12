document.addEventListener("DOMContentLoaded", function(event) {
    var minRadius = 40;
    var bubbleNum = 30;
    var depth = 10;

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    window.addEventListener('resize', function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        bubbleNum = (innerWidth * (minRadius * 2)) * 0.0013;
        generateBubbles();
    });

    function Bubble() {
        this.gravity = Math.random() * 0.02;
        this.radius = minRadius + Math.random() * 40;
        this.x = this.radius + (Math.random() * (innerWidth - this.radius * 2));
        this.y = this.radius + (Math.random() * (innerHeight - this.radius * 2));
        this.z = Math.random() * depth;
        this.hspeed = 0.5 + (Math.random() * -1);
        this.vspeed = 0.5 + (Math.random() * -1);
    }

    Bubble.prototype.move = function() {
        if (this.x + this.hspeed < this.radius || this.x + this.hspeed > innerWidth - this.radius) {
            this.hspeed *= -1;
        }
  
        if (this.y + this.vspeed < this.radius || this.y + this.vspeed > innerHeight - this.radius) {
            this.vspeed *= -1;
        }
        
        this.x += this.hspeed;
        this.y += this.vspeed;
        this.vspeed += this.gravity;
    
        if (this.x > innerWidth || this.x < 0 || this.y > innerHeight || this.y < 0) {
            this.x = this.radius + (Math.random() * (innerWidth - this.radius * 2));
            this.y = this.radius + (Math.random() * (innerHeight - this.radius * 2));
        }
    };

    Bubble.prototype.draw = function() {
        var bubble = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        bubble.addColorStop(0, 'rgba(98, 79, 249, 0.05)');
        bubble.addColorStop(1, 'rgba(98, 79, 249, 0.3)');
        ctx.fillStyle = bubble;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        
        var glare = ctx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius * 1.1);
        glare.addColorStop(0,'rgba(255,255,255,0)');
        glare.addColorStop(1,'rgba(255,255,255,0.6)');
        ctx.strokeStyle = glare;
        ctx.lineWidth = this.radius * 0.25;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.66, Math.PI * -0.05, Math.PI * 1.55, true);
        ctx.stroke();
        ctx.lineWidth = this.radius * 0.1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.7, Math.PI * 0.65, Math.PI * 0.9, false);
        ctx.stroke();
    };

    var bubbles = [];

    function generateBubbles() {
        for (var i = bubbles.length; i < bubbleNum; i++)
            bubbles.push(new Bubble());
    }

    generateBubbles();

    function loop() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        
        for (var i = 0; i < bubbles.length; i++) {
            bubbles[i].draw();
            bubbles[i].move();
        }
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
});