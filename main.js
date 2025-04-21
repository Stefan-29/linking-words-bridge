let currentSlide = 1;
const totalSlides = 8;

function showSlide(slideNumber) {
    // Hide all slides
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show the current slide
    document.getElementById('slide' + slideNumber).classList.add('active');
    
    // Update progress dots
    document.querySelectorAll('.progress-dot').forEach((dot, index) => {
        if (index + 1 <= slideNumber) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Update buttons
    document.getElementById('prevBtn').disabled = (slideNumber === 1);
    document.getElementById('nextBtn').disabled = (slideNumber === totalSlides);
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentSlide > 1) {
        currentSlide--;
        showSlide(currentSlide);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentSlide < totalSlides) {
        currentSlide++;
        showSlide(currentSlide);
    }
});

// Initialize
showSlide(currentSlide);

// Allow clicking on progress dots
document.querySelectorAll('.progress-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        currentSlide = parseInt(dot.getAttribute('data-slide'));
        showSlide(currentSlide);
    });
});

 // For the fill-in-the-blank questions
 document.querySelectorAll('.check-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.parentElement.previousElementSibling.querySelector('.answer-input');
        const feedback = this.nextElementSibling;
        const correct = input.getAttribute('data-correct');
        
        if (input.value.toLowerCase() === correct) {
            feedback.textContent = "Correct! ✓";
            feedback.style.color = "green";
        } else {
            feedback.textContent = "Try again!";
            feedback.style.color = "red";
        }
    });
});

// For the matching game
document.getElementById('check-matches').addEventListener('click', function() {
    const selects = document.querySelectorAll('.match-select');
    let correct = 0;
    
    selects.forEach(select => {
        if (select.value === select.getAttribute('data-correct')) {
            select.style.backgroundColor = "#d4edda";
            correct++;
        } else {
            select.style.backgroundColor = "#f8d7da";
        }
    });
    
    const feedback = document.getElementById('match-feedback');
    if (correct === selects.length) {
        feedback.textContent = "Great job! All matches are correct!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `You got ${correct} out of ${selects.length} correct. Try again!`;
        feedback.style.color = "red";
    }
});

// For the word finding game
document.querySelectorAll('.word.linkable').forEach(word => {
    word.addEventListener('click', function() {
        if (this.classList.contains('selected')) {
            this.classList.remove('selected');
            this.style.backgroundColor = "";
            this.style.borderRadius = "";
            this.style.padding = "";
        } else {
            this.classList.add('selected');
            this.style.backgroundColor = "#9c27b0";
            this.style.color = "white";
            this.style.borderRadius = "10px";
            this.style.padding = "0 5px";
        }
        
        // Update count
        const foundCount = document.querySelectorAll('.word.linkable.selected').length;
        document.getElementById('found-count').textContent = foundCount;
    });
});

document.getElementById('check-words').addEventListener('click', function() {
    const linkWords = document.querySelectorAll('.word.linkable');
    const selectedWords = document.querySelectorAll('.word.linkable.selected');
    const wordFeedback = document.getElementById('word-feedback');
    
    if (selectedWords.length === linkWords.length) {
        let allCorrect = true;
        selectedWords.forEach(word => {
            if (word.getAttribute('data-islink') !== "true") {
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            wordFeedback.textContent = "Amazing! You found all the linking words!";
            wordFeedback.style.color = "green";
        } else {
            wordFeedback.textContent = "Check again! Some words are not linking words.";
            wordFeedback.style.color = "red";
        }
    } else if (selectedWords.length < linkWords.length) {
        wordFeedback.textContent = "There are more linking words to find!";
        wordFeedback.style.color = "orange";
    } else {
        wordFeedback.textContent = "You selected too many words. Only choose linking words!";
        wordFeedback.style.color = "red";
    }
});