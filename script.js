document.addEventListener('DOMContentLoaded', function() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const celebration = document.getElementById('celebration');
    const proposalCard = document.querySelector('.proposal-card');
    
    // Array of funny messages for when user tries to click "no"
    const funnyMessages = [
        "Are you sure? 🥺",
        "Think again! 💕",
        "Don't break my heart! 💔",
        "Please say yes! 🙏",
        "I'll be sad! 😢",
        "Give me a chance! 💝",
        "Pretty please? 🌹",
        "And flowers too! 🌸",
        "And hugs! 🤗"
    ];
    
    let messageIndex = 0;
    
    // Function to move the no button to a random position
    function moveNoButton() {
        const buttonWidth = noBtn.offsetWidth;
        const buttonHeight = noBtn.offsetHeight;
        const margin = 50; // Keep 50px margin from edges
        
        const maxX = window.innerWidth - buttonWidth - margin;
        const maxY = window.innerHeight - buttonHeight - margin;
        const minX = margin;
        const minY = margin;
        
        // Ensure we have valid bounds
        const validMaxX = Math.max(minX, maxX);
        const validMaxY = Math.max(minY, maxY);
        
        const randomX = Math.random() * (validMaxX - minX) + minX;
        const randomY = Math.random() * (validMaxY - minY) + minY;
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '1000';
        
        // Ensure button is fully visible
        noBtn.style.transform = 'translate(0, 0)';
        noBtn.style.opacity = '1';
        
        // Change button text to funny message
        noBtn.textContent = funnyMessages[messageIndex];
        messageIndex = (messageIndex + 1) % funnyMessages.length;
        
        // Add a little animation
        noBtn.style.animation = 'none';
        setTimeout(() => {
            noBtn.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    }
    
    // Move no button when mouse hovers over it
    noBtn.addEventListener('mouseenter', moveNoButton);
    
    // Also move when mouse gets close (for mobile touch events)
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        moveNoButton();
    });
    
    // Handle yes button click
    yesBtn.addEventListener('click', function() {
        // Hide the proposal card
        proposalCard.style.display = 'none';
        
        // Show celebration
        celebration.classList.remove('hidden');
        
        // Create floating hearts animation
        createFloatingHearts();
        
        // Play a happy sound effect (if you want to add audio)
        // const audio = new Audio('happy-sound.mp3');
        // audio.play();
        
        // Add some extra visual effects
        document.body.style.animation = 'gradientShift 2s ease infinite';
    });
    
    // Function to create floating hearts
    function createFloatingHearts() {
        const heartsContainer = document.createElement('div');
        heartsContainer.style.position = 'fixed';
        heartsContainer.style.top = '0';
        heartsContainer.style.left = '0';
        heartsContainer.style.width = '100%';
        heartsContainer.style.height = '100%';
        heartsContainer.style.pointerEvents = 'none';
        heartsContainer.style.zIndex = '999';
        document.body.appendChild(heartsContainer);
        
        const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓', '🌹'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                heart.style.position = 'absolute';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.bottom = '-50px';
                heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
                heart.style.animation = `floatUp ${Math.random() * 3 + 2}s ease-in-out`;
                heart.style.opacity = '0.8';
                heartsContainer.appendChild(heart);
                
                // Remove heart after animation
                setTimeout(() => {
                    heart.remove();
                }, 5000);
            }, i * 100);
        }
    }
    
    // Add CSS animation for floating up hearts
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add some interactive sparkles around the yes button
    yesBtn.addEventListener('mouseenter', function() {
        createSparkles(yesBtn);
    });
    
    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * rect.width) + 'px';
            sparkle.style.top = (rect.top + rect.height / 2 + (Math.random() - 0.5) * rect.height) + 'px';
            sparkle.style.fontSize = '1rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1001';
            sparkle.style.animation = 'sparkle 1s ease-out forwards';
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }
    
    // Add sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(1.5) rotate(180deg) translateY(-20px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
    
    // Add a subtle parallax effect to background hearts
    document.addEventListener('mousemove', function(e) {
        const hearts = document.querySelectorAll('.heart');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        hearts.forEach((heart, index) => {
            const speed = (index + 1) * 0.5;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            heart.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
});
