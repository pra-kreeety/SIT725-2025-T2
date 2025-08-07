// Removed static cardList - data will now come from the server

const clickMe = () => {
    alert("Thank you for visitng us! Hope you have a nice day!")
}

// Function to get dogs from the server
const getDogs = () => {
    $.get('/api/dogs', (response) => {
        if (response.statusCode == 200) {
            addCards(response.data);
        } else {
            console.error('Error fetching dogs:', response.message);
            M.toast({ html: 'Error loading dog data: ' + response.message, classes: 'red' });
        }
    }).fail((error) => {
        console.error('AJAX error:', error);
        M.toast({ html: 'Failed to connect to server', classes: 'red' });
    });
}

const submitForm = () => {
    // Get form values
    const firstName = $('#first_name').val().trim();
    const lastName = $('#last_name').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const message = $('#message').val().trim();

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
        M.toast({ html: 'Please fill in all required fields!', classes: 'red' });
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        M.toast({ html: 'Please enter a valid email address!', classes: 'red' });
        return;
    }

    // Show loading state
    $('#formSubmit').html('<i class="material-icons left">hourglass_empty</i>Submitting...');
    $('#formSubmit').addClass('disabled');

    // Submit form data to server
    const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        message: message
    };

    // Send data to server
    $.ajax({
        url: '/api/contact',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
            if (response.statusCode === 200) {
                console.log("Contact saved successfully:", response.data);
                M.toast({ html: 'Application submitted successfully! We\'ll contact you soon.', classes: 'green' });

                // Reset form and close modal
                $('#contactForm')[0].reset();
                $('#modal1').modal('close');
            } else {
                console.error("Error saving contact:", response.message);
                M.toast({ html: 'Error: ' + response.message, classes: 'red' });
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX error:", error);
            M.toast({ html: 'Failed to submit form. Please try again.', classes: 'red' });
        },
        complete: function () {
            // Reset button state
            $('#formSubmit').html('<i class="material-icons left">send</i>Submit Application');
            $('#formSubmit').removeClass('disabled');

            // Clear any validation states
            $('.validate').removeClass('valid invalid');
        }
    });
}

const showDogDetails = (index, dogs) => {
    if (dogs && dogs[index]) {
        const dog = dogs[index];
        alert(`Dog Details:\n\nName: ${dog.title}\nBreed: ${dog.breed}\nAge: ${dog.age}\nWeight: ${dog.weight}\nTemperament: ${dog.temperament}\n\nDescription: ${dog.description}`);
    }
}

const adoptDog = (dogName) => {
    alert(`Thank you for your interest in adopting ${dogName}! 🐕\n\nPlease fill out the contact form to get in touch with us about the adoption process.`);
    // Open the contact modal
    $('#modal1').modal('open');
}

const showLabradorDetails = () => {
    alert(`Dog Details:\n\nName: Labrador\nBreed: Labrador Retriever\nAge: 4 years old\nWeight: 70 lbs\nTemperament: Outgoing, Active, Friendly\n\nDescription: Labrador Retrievers are outgoing, active dogs who have more than enough affection to go around for a family looking for a medium-to-large dog. They are famously friendly and make excellent companions.`);
}

const addCards = (items) => {
    // Clear existing cards
    $("#card-section").empty();

    items.forEach((item, index) => {
        let itemToAppend = `
            <div class="col s12 m6 l4">
                <div class="card medium hoverable">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}" alt="${item.title}">
                        <span class="card-title">${item.title}</span>
                    </div>
                    <div class="card-content">
                        <div class="card-stats">
                            <p><i class="material-icons tiny">pets</i> <strong>Breed:</strong> ${item.breed}</p>
                            <p><i class="material-icons tiny">cake</i> <strong>Age:</strong> ${item.age}</p>
                            <p><i class="material-icons tiny">monitor_weight</i> <strong>Weight:</strong> ${item.weight}</p>
                        </div>
                    </div>
                    <div class="card-action">
                        <a href="#" class="btn-small waves-effect waves-light blue lighten-1" onclick="showDogDetails(${index}, dogData)">
                            <i class="material-icons left">info</i>Learn More
                        </a>
                        <a href="#" class="btn-small waves-effect waves-light green lighten-1" onclick="adoptDog('${item.title}')">
                            <i class="material-icons left">favorite</i>Adopt
                        </a>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${item.title}
                            <i class="material-icons right">close</i>
                        </span>
                        <p><strong>About ${item.title}:</strong></p>
                        <p class="card-text">${item.description}</p>
                        <p><strong>Temperament:</strong> ${item.temperament}</p>
                        <div class="card-action">
                            <a href="#" class="btn waves-effect waves-light" onclick="adoptDog('${item.title}')">
                                <i class="material-icons left">favorite</i>Adopt ${item.title}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $("#card-section").append(itemToAppend)
    });

    // Store dog data globally for the detail function
    window.dogData = items;
}

$(document).ready(function () {
    // Initialize components immediately for better performance
    $('.materialboxed').materialbox();

    // Optimized modal settings for smooth animation
    $('.modal').modal({
        dismissible: true,
        opacity: 0.6,
        inDuration: 200,
        outDuration: 150,
        startingTop: '8%',
        endingTop: '12%',
        ready: function (modal, trigger) {
            // Modal opened callback
            $('body').addClass('modal-open');
            $(modal).find('input[type=text], input[type=email], textarea').first().focus();
        },
        complete: function () {
            // Modal closed callback - reset form
            $('body').removeClass('modal-open');
            $('#contactForm')[0].reset();
            $('.validate').removeClass('valid invalid');
            $('#formSubmit').html('<i class="material-icons left">send</i>Submit Application');
            $('#formSubmit').removeClass('disabled');
        }
    });

    // Initialize tooltips
    $('.tooltipped').tooltip();

    // Event handlers with optimized performance
    $('#clickMeButton').click((e) => {
        e.preventDefault();
        clickMe();
    });

    $('#formSubmit').click((e) => {
        e.preventDefault();
        submitForm();
    });

    // Load dogs from server instead of static data
    getDogs();

    // Optimized form validation
    $('#contactForm input, #contactForm textarea').on('blur', function () {
        validateField($(this));
    });

    // Real-time email validation
    $('#email').on('input', function () {
        const email = $(this).val();
        if (email.length > 0) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(email)) {
                $(this).removeClass('invalid').addClass('valid');
            } else {
                $(this).removeClass('valid').addClass('invalid');
            }
        }
    });
});

// Optimized field validation function
const validateField = (field) => {
    if (field.hasClass('validate')) {
        const value = field.val().trim();
        const isRequired = field.prop('required');

        if (isRequired && value === '') {
            field.removeClass('valid').addClass('invalid');
        } else if (value !== '') {
            field.removeClass('invalid').addClass('valid');
        }
    }
};
