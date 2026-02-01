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
        // Get the container element to position within
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        
        // Get button dimensions with fallbacks
        const buttonWidth = noBtn.offsetWidth || 120;
        const buttonHeight = noBtn.offsetHeight || 50;
        const margin = 20; // Keep 20px margin from container edges
        
        // Calculate available space within container
        const availableWidth = containerRect.width - buttonWidth - (margin * 2);
        const availableHeight = containerRect.height - buttonHeight - (margin * 2);
        
        // Ensure we have valid bounds (minimum 100px available space)
        const validWidth = Math.max(100, availableWidth);
        const validHeight = Math.max(100, availableHeight);
        
        // Calculate random position within container bounds
        const randomX = Math.random() * validWidth + margin;
        const randomY = Math.random() * validHeight + margin;
        
        console.log(`Moving button within container to: X=${randomX.toFixed(2)}, Y=${randomY.toFixed(2)}, Container: ${containerRect.width}x${containerRect.height}`);
        
        // Position relative to the container instead of fixed to viewport
        noBtn.style.position = 'absolute';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '1000';
        
        // Ensure button is fully visible and not hidden
        noBtn.style.transform = 'translate(0, 0)';
        noBtn.style.opacity = '1';
        noBtn.style.visibility = 'visible';
        noBtn.style.display = 'inline-block';
        noBtn.style.pointerEvents = 'auto';
        
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
    
    // Function to create floating cartoon characters
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
        
        const cartoonSymbols = ['🐰', '🌸', '⭐', '🦄', '🌈', '🎈', '🦋', '🌺', '�', '✨', '�', '🌟'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const symbol = document.createElement('div');
                symbol.textContent = cartoonSymbols[Math.floor(Math.random() * cartoonSymbols.length)];
                symbol.style.position = 'absolute';
                symbol.style.left = Math.random() * 100 + '%';
                symbol.style.bottom = '-50px';
                symbol.style.fontSize = (Math.random() * 2.5 + 1) + 'rem';
                symbol.style.animation = `floatUp ${Math.random() * 3 + 2}s ease-in-out`;
                symbol.style.opacity = '0.9';
                symbol.style.filter = 'drop-shadow(2px 2px 4px rgba(139, 92, 246, 0.3))';
                heartsContainer.appendChild(symbol);
                
                // Remove symbol after animation
                setTimeout(() => {
                    symbol.remove();
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
    
    // Add interactive cartoon character effects
    const characters = document.querySelectorAll('.character');
    characters.forEach((character, index) => {
        character.style.cursor = 'pointer';
        character.style.pointerEvents = 'auto';
        
        character.addEventListener('click', function() {
            // Create a burst of smaller characters
            createCharacterBurst(character);
            
            // Make the character jump and spin
            character.style.animation = 'none';
            setTimeout(() => {
                character.style.animation = 'characterJump 0.8s ease-out';
            }, 10);
            
            // Change to a random character temporarily
            const originalChar = character.textContent;
            const randomChars = ['🎉', '💜', '⭐', '🦄', '🌈'];
            character.textContent = randomChars[Math.floor(Math.random() * randomChars.length)];
            
            setTimeout(() => {
                character.textContent = originalChar;
                character.style.animation = `cartoonFloat 8s ease-in-out infinite`;
                character.style.animationDelay = `${index * 0.5}s`;
            }, 800);
        });
    });
    
    // Function to create character burst effect
    function createCharacterBurst(element) {
        const rect = element.getBoundingClientRect();
        const burstSymbols = ['✨', '💜', '⭐', '🌟'];
        
        for (let i = 0; i < 8; i++) {
            const burst = document.createElement('div');
            burst.textContent = burstSymbols[Math.floor(Math.random() * burstSymbols.length)];
            burst.style.position = 'fixed';
            burst.style.left = rect.left + rect.width / 2 + 'px';
            burst.style.top = rect.top + rect.height / 2 + 'px';
            burst.style.fontSize = '1.5rem';
            burst.style.pointerEvents = 'none';
            burst.style.zIndex = '1002';
            burst.style.animation = `burstOut 1s ease-out forwards`;
            burst.style.transform = `rotate(${i * 45}deg)`;
            document.body.appendChild(burst);
            
            setTimeout(() => {
                burst.remove();
            }, 1000);
        }
    }
    
    // Add burst animation
    const burstStyle = document.createElement('style');
    burstStyle.textContent = `
        @keyframes characterJump {
            0% { transform: translateY(0) scale(1) rotate(0deg); }
            50% { transform: translateY(-50px) scale(1.5) rotate(180deg); }
            100% { transform: translateY(0) scale(1) rotate(360deg); }
        }
        
        @keyframes burstOut {
            0% {
                transform: translate(0, 0) scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(var(--tx, 100px), var(--ty, -100px)) scale(1.5) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(burstStyle);
    
    // Add a subtle parallax effect to background cartoon characters
    document.addEventListener('mousemove', function(e) {
        const characters = document.querySelectorAll('.character');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        characters.forEach((character, index) => {
            const speed = (index + 1) * 0.8;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            character.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${xOffset * 2}deg)`;
        });
    });
});
