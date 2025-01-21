import {translation} from './modules/translation.js';
import { slider } from './modules/slider.js';

$(document).ready(function() {
    translation();
    slider();
    // initial variables
    const $username = $(".username");
    const $password = $(".password");
    const $loginForm = $(".form-login");
    const $rememberMe = $("#remember");
    const $agree = $("#agree");
    const $userErrorMsg = $("#userErrorMsg");
    const $passErrorMsg = $("#passErrorMsg");

    // Local user for test login
    const userStore = { username: "TEST123", password: "123123" };

    // Username to uppercase
    $username.on("input", () => {
        $username.val($username.val().toUpperCase());
    });

    // Validate and handle form submit
    $loginForm.on("submit", (e) => {
        e.preventDefault();
        validateInputs();
    });
    
    // Input validations 
    const validateInputs = () => {
        let usernameValue = $username.val().trim();
        let passwordValue = $password.val().trim();
        const textRegex = /^[A-Z0-9]+$/;
        const numberRegex = /^\d/;

        i18next.on('languageChanged', () => {
            handleLanguageChange();
        });
        

        // Set error messages
        const setError = (element, errorMsgKey, errorContainer) => {
            element.addClass("error");
            errorContainer.attr('data-i18n-error', errorMsgKey).html(i18next.t(errorMsgKey));
        };

        // Clear error messages
        const clearError = (element, errorContainer) => {
            element.removeClass("error");
            errorContainer.removeAttr('data-i18n-error').html("");
        };

        // check valid value
        let isValid = true;

        // Username Validation
        if (usernameValue === "") {
            setError($username, "usernameEmpty", $userErrorMsg);
            isValid = false;
        } else if (usernameValue.length < 6) {
            setError($username, "usernameMin", $userErrorMsg);
            isValid = false;
        } else if (usernameValue.length > 16) {
            setError($username, "usernameMax", $userErrorMsg);
            isValid = false;
        } else if (!textRegex.test(usernameValue)) {
            setError($username, "usernameInvalid", $userErrorMsg);
            isValid = false;
        } else if (numberRegex.test(usernameValue)) {
            setError($username, "usernameStartsWithNumber", $userErrorMsg);
            isValid = false;
        } else {
            clearError($username, $userErrorMsg);
        }

        // Password Validation
        if (passwordValue === "") {
            setError($password, "passwordEmpty", $passErrorMsg);
            isValid = false;
        } else if (passwordValue.length < 6) {
            setError($password, "passwordMin", $passErrorMsg);
            isValid = false;
        } else if (passwordValue.length > 16) {
            setError($password, "passwordMax", $passErrorMsg);
            isValid = false;
        } else {
            clearError($password, $passErrorMsg);
        }

        // Checkbox
        const isRemember = $rememberMe.prop("checked");
        const isAgree = $agree.prop("checked");

        const user = {
            id: 1,
            username: usernameValue,
            password: passwordValue,
            isRemember: isRemember,
            isAgree: isAgree,
        };

        // Login Logic
        if (isValid) {
            if (usernameValue !== userStore.username && passwordValue !== userStore.password) {
                setError($username, "incorrectUsername", $userErrorMsg);
                setError($password, "incorrectPassword", $passErrorMsg);
            }
            else if (usernameValue !== userStore.username) {
                setError($username, "incorrectUsername", $userErrorMsg);
            }
            else if (passwordValue !== userStore.password) {
                setError($password, "incorrectPassword", $passErrorMsg);
            }
            else {
                $loginForm[0].reset();
                console.log(user);
            }
        }
    };

});
