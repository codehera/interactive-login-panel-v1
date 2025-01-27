// Elementleri seçelim
const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
const showPasswordButton = document.querySelector('.password-button');
const face = document.querySelector('.face');
const hands = document.querySelectorAll('.hand');
const pupils = document.querySelectorAll('.eye .pupil');
const mouth = document.querySelector('.mouth');

// Mouse takibi için event listener
document.addEventListener('mousemove', (e) => {
    // Eğer input alanları odakta değilse gözler mouse'u takip etsin
    if (!usernameInput.matches(':focus') && !passwordInput.matches(':focus')) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        pupils.forEach(pupil => {
            const rect = pupil.getBoundingClientRect();
            const pupilX = rect.left + rect.width / 2;
            const pupilY = rect.top + rect.height / 2;
            
            // Göz bebeği hareket sınırları
            const maxMove = 3;
            
            // Mouse ile göz arasındaki mesafeyi hesapla
            const deltaX = mouseX - pupilX;
            const deltaY = mouseY - pupilY;
            
            // Göz bebeği hareketini sınırla
            const angle = Math.atan2(deltaY, deltaX);
            const moveX = Math.min(Math.max(Math.cos(angle) * maxMove, -maxMove), maxMove);
            const moveY = Math.min(Math.max(Math.sin(angle) * maxMove, -maxMove), maxMove);
            
            pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
});

// Username input için event listeners (şimdi password hareketlerini yapacak)
usernameInput.addEventListener('focus', () => {
    // Gözler kapansın
    pupils.forEach(pupil => {
        pupil.style.transform = 'translate(-50%, 50%)';
    });
    // Eller yukarı kalksın
    hands.forEach(hand => {
        hand.style.transform = 'translate(0, -60px)';
    });
    // Ağız açılsın
    mouth.style.height = '10px';
    mouth.style.width = '35px';
});

usernameInput.addEventListener('blur', () => {
    // Her şey normale dönsün
    pupils.forEach(pupil => {
        pupil.style.transform = 'translate(-50%, -50%)';
    });
    hands.forEach(hand => {
        hand.style.transform = 'translate(0, 0)';
    });
    mouth.style.height = '15px';
    mouth.style.width = '40px';
});

// Password input için event listeners (şimdi username hareketlerini yapacak)
passwordInput.addEventListener('focus', () => {
    // Gözler yukarı baksın
    pupils.forEach(pupil => {
        pupil.style.transform = 'translate(-50%, -120%)';
    });
    // Eller normal pozisyonda
    hands.forEach(hand => {
        hand.style.transform = 'translate(0, 0)';
    });
    // Ağız açılsın
    mouth.style.height = '10px';
    mouth.style.width = '35px';
});

passwordInput.addEventListener('blur', () => {
    // Gözler normale dönsün
    pupils.forEach(pupil => {
        pupil.style.transform = 'translate(-50%, -50%)';
    });
    // Ağız normale dönsün
    mouth.style.height = '15px';
    mouth.style.width = '40px';
});


// Password göster/gizle butonu
showPasswordButton.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordButton.textContent = 'Gizle';
        if (passwordInput.matches(':focus')) {
            hands.forEach(hand => {
                hand.style.transform = 'translate(0, 80px)'; // Şifre gösterildiğinde eller daha aşağı
            });
        }
    } else {
        passwordInput.type = 'password';
        showPasswordButton.textContent = 'Göster';
        if (passwordInput.matches(':focus')) {
            hands.forEach(hand => {
                hand.style.transform = 'translate(0, 60px)'; // Şifre gizlendiğinde eller normal aşağı pozisyonu
            });
        }
    }
});


// Modal functionality
function openModal() {
  document.getElementById('contactModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('contactModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('contactModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}