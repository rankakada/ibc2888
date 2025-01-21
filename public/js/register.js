import {translation} from './modules/translation.js';
import { slider } from './modules/slider.js';

$(document).ready(function () {
    translation();
    slider();

    const $registerForm = $(".form-register");
    const $togglePassword = $(".eye");
    const $username = $(".username");
    const $password = $(".password");
    const $phoneNumber = $(".phoneNumber");
    const $affiliate = $(".affiliate");
    const $code = $(".code");
    const $randomCode = $(".code-random");
    const $registerStatus = $("#registerStatus");

    // Toggle password visibility
    $togglePassword.on("click", function () {
        const type = $password.attr("type") === "password" ? "text" : "password";
        $password.attr("type", type);
        $(this).toggleClass("fa-eye-slash fa-eye");
    });

    // Generate a random 5-digit code
    const generateRandomCode = () => Math.floor(10000 + Math.random() * 90000);
    $randomCode.val(generateRandomCode());

    // Username input to uppercase
    $username.on("input", function () {
        $(this).val($(this).val().toUpperCase());
    });

    // Function to get a query parameter by name
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    // Retrieve 'fid' from URL or localStorage
    let fid = getQueryParam('fid') || localStorage.getItem('fid');

    if (fid) {
        const currentUrlParams = new URLSearchParams(window.location.search);
        if (!currentUrlParams.has('fid')) {
            currentUrlParams.set('fid', fid);
            const newUrl = `${window.location.pathname}?${currentUrlParams.toString()}`;
            window.history.replaceState({}, '', newUrl);
        }
    }

    // Retrieve 'fid' from the URL
    const affiliateId = getQueryParam("fid");
    if (affiliateId) {
        $affiliate.val(affiliateId);
    }

    // Form validation
    $registerForm.on("submit", function (e) {
        e.preventDefault();
        validateInputs();
    });

    const validateInputs = () => {
        const usernameValue = $username.val().trim();
        const passwordValue = $password.val().trim();
        const phoneNumberValue = $phoneNumber.val().trim();
        const affiliateValue = $affiliate.val().trim();
        const codeValue = $code.val().trim();
        const randomCodeValue = $randomCode.val().trim();

        const $userErrorMsg = $("#userErrorMsg");
        const $passErrorMsg = $("#passErrorMsg");
        const $phoneErrorMsg = $("#phoneErrorMsg");
        const $affiliateErrorMsg = $("#affiliateErrorMsg");
        const $codeErrorMsg = $("#codeErrorMsg");

        const textRegex = /^[A-Z0-9]+$/;
        const numberRegex = /^\d/;
        const cambodianPhoneRegex = /^(?:\+855[1-9]\d{7,8}|0[1-9]\d{7,8})$/;

        i18next.on('languageChanged', () => {
            handleLanguageChange();
        });

        const setError = ($element, errorMsgKey, $errorContainer) => {
            $element.addClass("error");
            $errorContainer.attr("data-i18n-error", errorMsgKey).html(i18next.t(errorMsgKey));
        };

        const clearError = ($element, $errorContainer) => {
            $element.removeClass("error");
            $errorContainer.removeAttr("data-i18n-error").html("");
        };

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

        // Phone number Validation
        if (phoneNumberValue === "") {
            setError($phoneNumber, "phoneNumberEmpty", $phoneErrorMsg);
            isValid = false;
        } else if (!phoneNumberValue.startsWith("+855") && !phoneNumberValue.startsWith("0")) {
            setError($phoneNumber, "phoneNumberInvalidStart", $phoneErrorMsg);
            isValid = false;
        } else if (!cambodianPhoneRegex.test(phoneNumberValue)) {
            setError($phoneNumber, "phoneNumberInvalid", $phoneErrorMsg);
            isValid = false;
        } else {
            clearError($phoneNumber, $phoneErrorMsg);
        }

        const user = {
            id: 1,
            username: usernameValue,
            password: passwordValue,
            phoneNumber: phoneNumberValue,
            currency: $("#currency").val(),
            affiliate: affiliateValue,
        };

        // Affiliate Validation
        if (affiliateValue !== affiliateId && affiliateValue !== "") {
            setError($affiliate, "affiliateInvalid", $affiliateErrorMsg);
            isValid = false;
        } else {
            clearError($affiliate, $affiliateErrorMsg);
        }

        // Register Logic
        if (isValid) {
            if (codeValue === "") {
                setError($code, "codeEmpty", $codeErrorMsg);
            } else if (codeValue !== randomCodeValue) {
                setError($code, "codeInvalid", $codeErrorMsg);
            } else {
                clearError($code, $codeErrorMsg);
                $registerStatus
                    .attr("data-i18n", "registerSuccess")
                    .html(i18next.t("registerSuccess"))
                    .addClass("registerSuccess");
                $registerForm.trigger("reset");
                localStorage.removeItem("fid");
                console.log(user);
            }
        } else {
            $registerStatus.html("");
        }
    };
});
