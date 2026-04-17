// Pet data object with initial values
var pet_info = {
    name: "Ghost",
    weight: 20,
    happiness: 50
};

// Random pet reactions per action
var petSpeech = {
    treat: ["Yum yum yum!", "More treats please!", "Best. Day. Ever."],
    play: ["Woof woof! Let's gooo!", "This is SO fun!", "Throw it again!"],
    exercise: ["Ugh... why...", "My paws are tired...", "Do we have to?"],
    bath: ["NOT THE BATH!", "I was saving that smell!", "Fine... but I hate it."],
    tooFat: ["Okay maybe fewer treats...", "Rolling around now..."],
    tooSad: ["I need a hug...", "Woof... :("]
};

// Run once DOM is ready
$(function () {
    checkAndUpdatePetInfoInHtml();

    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.bath-button').click(clickedBathButton);
});

function clickedTreatButton() {
    pet_info.happiness += 10;
    pet_info.weight += 2;
    showSpeech(randomFrom(petSpeech.treat));
    animatePet("bounce");
    checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
    pet_info.happiness += 15;
    pet_info.weight -= 1;
    showSpeech(randomFrom(petSpeech.play));
    animatePet("wiggle");
    checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
    pet_info.happiness -= 10;
    pet_info.weight -= 3;
    showSpeech(randomFrom(petSpeech.exercise));
    animatePet("shake");
    checkAndUpdatePetInfoInHtml();
}

// NEW: Bath button - pet dislikes it so happiness drops slightly, weight unchanged
function clickedBathButton() {
    pet_info.happiness -= 5;
    showSpeech(randomFrom(petSpeech.bath));
    animatePet("shake");
    checkAndUpdatePetInfoInHtml();
}

function checkAndUpdatePetInfoInHtml() {
    checkWeightAndHappinessBeforeUpdating();
    updatePetInfoInHtml();
    updateMoodEmoji();
}

// Prevent weight and happiness from going below 0 or happiness above 100
function checkWeightAndHappinessBeforeUpdating() {
    if (pet_info.weight < 0) pet_info.weight = 0;
    if (pet_info.happiness < 0) pet_info.happiness = 0;
    if (pet_info.happiness > 100) pet_info.happiness = 100;

    if (pet_info.weight > 40) showSpeech(randomFrom(petSpeech.tooFat));
    if (pet_info.happiness <= 5) showSpeech(randomFrom(petSpeech.tooSad));
}

function updatePetInfoInHtml() {
    $('.name').text(pet_info.name);
    $('.weight').text(pet_info.weight);
    $('.happiness').text(pet_info.happiness);
}

function updateMoodEmoji() {
    var mood = pet_info.happiness >= 80 ? "😄" :
        pet_info.happiness >= 50 ? "🙂" :
            pet_info.happiness >= 25 ? "😐" : "😢";
    $('.mood-emoji').text(mood);
}

// UNIQUE METHOD 1: .delay() pauses the jQuery animation queue before .fadeOut() runs
function showSpeech(message) {
    $('#speech-bubble')
        .text(message)
        .stop(true, true)
        .css('opacity', 1)
        .show()
        .delay(2000)   // waits 2 seconds before fading out
        .fadeOut(600);
}

// UNIQUE METHOD 2: .queue() inserts a custom step into the animation queue to remove the CSS class after the animation finishes
function animatePet(type) {
    var $img = $('.pet-image');
    $img.removeClass('bounce wiggle shake');

    setTimeout(function () {
        $img.addClass(type);
        $img.delay(400).queue(function (next) {
            $(this).removeClass(type); // clean up so animation can re-trigger
            next();
        });
    }, 10);
}

// Returns a random item from an array
function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}