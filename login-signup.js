$(document).ready(function () {
    // Toggle between login and signup forms
    $("#toggle-form").on("click", function (e) {
        e.preventDefault();

        const container = $(".form-container");
        container.addClass("form-transition-out");

        setTimeout(function () {
            const isLogin = $("#login-form").is(":visible");

            if (isLogin) {
                // Switch to signup
                $("#login-form").addClass("d-none");
                $("#signup-form").removeClass("d-none");
                $("#toggle-form").html('Log In <i class="bi bi-chevron-right"></i>');
            } else {
                // Switch to login
                $("#signup-form").addClass("d-none");
                $("#login-form").removeClass("d-none");
                $("#toggle-form").html('Sign Up <i class="bi bi-chevron-right"></i>');
            }

            container.addClass("form-transition-in");
            setTimeout(function () {
                container.removeClass("form-transition-out form-transition-in");
            }, 500);
        }, 400);
    });

    // Form validation for login
    $("#login-form").on("submit", function (e) {
        e.preventDefault();

        const email = $("#login-email").val();
        const password = $("#login-password").val();
        let isValid = true;

        // Reset validation
        $("#login-email, #login-password").removeClass("is-invalid is-valid");

        // Validate email
        if (!email || !isValidEmail(email)) {
            $("#login-email").addClass("is-invalid");
            isValid = false;
        } else {
            $("#login-email").addClass("is-valid");
        }

        // Validate password
        if (!password || password.length < 6) {
            $("#login-password").addClass("is-invalid");
            isValid = false;
        } else {
            $("#login-password").addClass("is-valid");
        }

        if (isValid) {
            // Show loading state
            const loginButton = $("#login-button");
            const originalText = loginButton.text();
            loginButton.html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Logging in...');
            loginButton.prop("disabled", true);

            // Simulate AJAX request
            simulateAjaxRequest({
                url: "login.php",
                method: "POST",
                data: $(this).serialize(),
                success: function (response) {
                    // Redirect after successful login
                    setTimeout(function () {
                        window.location.href = "dashboard.html";
                    }, 1500);
                },
                complete: function () {
                    // Reset button state
                    loginButton.html(originalText);
                    loginButton.prop("disabled", false);
                }
            });
        }
    });

    // Form validation for signup
    $("#signup-form").on("submit", function (e) {
        e.preventDefault();

        const email = $("#signup-email").val();
        const password = $("#signup-password").val();
        let isValid = true;

        // Reset validation
        $("#signup-email, #signup-password").removeClass("is-invalid is-valid");

        // Validate email
        if (!email || !isValidEmail(email)) {
            $("#signup-email").addClass("is-invalid");
            isValid = false;
        } else {
            $("#signup-email").addClass("is-valid");
        }

        // Validate password
        if (!password || password.length < 6) {
            $("#signup-password").addClass("is-invalid");
            isValid = false;
        } else {
            $("#signup-password").addClass("is-valid");
        }

        if (isValid) {
            // Show loading state
            const signupButton = $("#signup-button");
            const originalText = signupButton.text();
            signupButton.html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Signing up...');
            signupButton.prop("disabled", true);

            // Simulate AJAX request
            simulateAjaxRequest({
                url: "signup.php",
                method: "POST",
                data: $(this).serialize(),
                success: function (response) {
                    // Redirect after successful signup
                    setTimeout(function () {
                        window.location.href = "dashboard.html";
                    }, 1500);
                },
                complete: function () {
                    // Reset button state
                    signupButton.html(originalText);
                    signupButton.prop("disabled", false);
                }
            });
        }
    });

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Simulate AJAX request
    function simulateAjaxRequest(options) {
        console.log("AJAX Request:", options);

        // Simulate network delay
        setTimeout(function () {
            if (options.success) {
                options.success({
                    status: "success",
                    message: "Operation completed successfully"
                });
            }

            if (options.complete) {
                options.complete();
            }
        }, 1500);

        // In a real application, you would use $.ajax() here
        /*
        $.ajax({
            url: options.url,
            type: options.method,
            data: options.data,
            success: options.success,
            error: options.error,
            complete: options.complete
        });
        */
    }
});

new Typed("#typed-output", {
    strings: ["Connect with friends and family!", "Instant account creation", "Block cursor vibe!"],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: "▌"  // ← This is the block cursor
});
