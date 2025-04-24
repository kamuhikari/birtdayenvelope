document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const openBtn = document.querySelector('.open-btn');
    const closeBtn = document.querySelector('.close-btn');
    
    openBtn.addEventListener('click', function() {
        envelope.classList.add('open');
      
    });
    
    closeBtn.addEventListener('click', function() {
        envelope.classList.remove('open');
    });
});


// audio

const rootElement = document.querySelector(':root');
const audioIconWrapper = document.querySelector ('.audio-icon-wrapper');
const audioIcon = document.querySelector('.audio-icon-wrapper i');
const song = document.querySelector('#song');
let isPlaying = false;


function disableScroll (){
    scrollTop = window.scrollXOffset || document.documentElement.scrollTop;
    scrollLeft = window.scrollYOffset || document.documentElement.scrollLeft;

    window.onscroll = function (){

      window.scrollTo(screenTop, screenLeft);
    }

    
    rootElement.style.scrollBehavior = 'auto';
    
  }


  function enableScroll(){
    window.onscroll = function () { }
    rootElement.style.scrollBehavior = 'smooth';
    // localStorage.setItem('opened','true');
    playAudio ();
  }




  function playAudio(){
    
    song.volume = 0.5;
    audioIconWrapper.style.display = 'flex';
    song.play();
    isPlaying = true;
  }

  audioIconWrapper.onclick = function () {
    if(isPlaying){
        song.pause ();
        audioIcon.classList.remove('bi-disc');
        audioIcon.classList.add('bi-pause-circle');
        this.getElementsByClassName('close-btn');
    } else {
        song.play();
        audioIcon.classList.add('bi-disc');
        audioIcon.classList.remove('bi-pause-circle');
    }

    isPlaying = !isPlaying;
  }


  function pauseAudio(){
    song.pause();
    isPlaying = false;
  }


  document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('conffeti');
    let canvas, ctx;
    let particles = [];
    
    // Initialize canvas
    function initCanvas() {
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);
        resizeCanvas();
    }
    
    // Handle window resize
    function resizeCanvas() {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
    
    // Create explosion
    function createExplosion(x, y) {
        const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#ff6b6b', '#4ecdc4', '#ffe66d'];
        
        // Create 500 particles
        for (let i = 0; i < 500; i++) {
            particles.push({
                x: x,
                y: y,
                size: Math.random() * 8 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: (Math.random() - 0.5) * 15,
                speedY: (Math.random() - 0.5) * 15,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 20,
                shape: Math.floor(Math.random() * 3), // 0=square, 1=circle, 2=triangle
                life: 100 + Math.random() * 50 // Fade out over time
            });
        }
        
        // Start animation if not already running
        if (!animationRunning) {
            animationRunning = true;
            animate();
        }
    }
    
    let animationRunning = false;
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let particlesAlive = false;
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            p.speedY += 0.1; // Gravity
            p.rotation += p.rotationSpeed;
            p.life--;
            
            // Only draw if particle is still "alive"
            if (p.life > 0) {
                particlesAlive = true;
                const opacity = Math.min(1, p.life / 50); // Fade out
                
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.globalAlpha = opacity;
                ctx.fillStyle = p.color;
                
                // Draw different shapes
                if (p.shape === 0) { // Square
                    ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                } else if (p.shape === 1) { // Circle
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size/2, 0, Math.PI * 2);
                    ctx.fill();
                } else { // Triangle
                    ctx.beginPath();
                    ctx.moveTo(0, -p.size/2);
                    ctx.lineTo(p.size/2, p.size/2);
                    ctx.lineTo(-p.size/2, p.size/2);
                    ctx.closePath();
                    ctx.fill();
                }
                
                ctx.restore();
            }
        }
        
        // Remove dead particles
        particles = particles.filter(p => p.life > 0);
        
        // Continue animation if particles remain
        if (particlesAlive) {
            requestAnimationFrame(animate);
        } else {
            animationRunning = false;
        }
    }
    
    // Initialize on load
    initCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Button click handler
    button.addEventListener('click', function(e) {
        // Explode from button position
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width/2;
        const y = rect.top + rect.height/2;
        createExplosion(x, y);
        
        // Or explode from center:
        // createExplosion(window.innerWidth/2, window.innerHeight/2);
    });
    
    // Bonus: Explode on spacebar press
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            createExplosion(window.innerWidth/2, window.innerHeight/2);
        }
    });
});