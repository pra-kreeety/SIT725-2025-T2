const cardList = [
    {
        title: "Golden Retriever",
        image: "images/dog-2.png",
        link: "Learn More",
        description: "Golden Retrievers are friendly, intelligent, and devoted dogs. They make excellent family pets and are known for their gentle temperament and love of water.",
        breed: "Golden Retriever",
        age: "2 years old",
        weight: "65 lbs",
        temperament: "Friendly, Intelligent, Devoted"
    },
    {
        title: "German Shepherd",
        image: "images/dog-3.jpeg",
        link: "Learn More",
        description: "German Shepherds are courageous, confident, and smart working dogs. They are extremely versatile, serving as family companions, guard dogs, and in many service roles.",
        breed: "German Shepherd",
        age: "3 years old",
        weight: "75 lbs",
        temperament: "Confident, Courageous, Smart"
    }
]

const clickMe = () => {
    alert("Thank you for visitng us! Hope you have a nice day!")
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

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        const formData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            message: message,
            timestamp: new Date().toISOString()
        };

        console.log("Form Data Submitted: ", formData);

        // Show success message
        M.toast({ html: 'Application submitted successfully! We\'ll contact you soon.', classes: 'green' });

        // Reset form and close modal
        $('#contactForm')[0].reset();
        $('#modal1').modal('close');

        // Reset button
        $('#formSubmit').html('<i class="material-icons left">send</i>Submit Application');
        $('#formSubmit').removeClass('disabled');

        // Clear any validation states
        $('.validate').removeClass('valid invalid');

    }, 1500);
}

const showDogDetails = (index) => {
    const dog = cardList[index];
    alert(`Dog Details:\n\nName: ${dog.title}\nBreed: ${dog.breed}\nAge: ${dog.age}\nWeight: ${dog.weight}\nTemperament: ${dog.temperament}\n\nDescription: ${dog.description}`);
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
                        <a href="#" class="btn-small waves-effect waves-light blue lighten-1" onclick="showDogDetails(${index})">
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

    // Load cards immediately
    addCards(cardList);

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
