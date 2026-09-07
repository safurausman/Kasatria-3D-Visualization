function initializeGoogleAuth(clientId, sheetsScope, onAccessToken) {
    window.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: sheetsScope,

        callback: async (response) => {
            if (response.error) {
                console.error(
                    "Google authorization failed:",
                    response
                );
                return;
            }

            console.log(
                "Google Sheets authorization successful."
            );

            await onAccessToken(response.access_token);
        }
    });

    google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        use_fedcm_for_button: false
    });

    google.accounts.id.renderButton(
        document.getElementById("google-login"),
        {
            theme: "outline",
            size: "large",
            text: "signin_with"
        }
    );
}

function handleCredentialResponse(response) {
    console.log("Google login successful!");

    document.getElementById("loginScreen").style.display = "none";

    if (window.tokenClient) {
        window.tokenClient.requestAccessToken({
            prompt: "consent"
        });
    } else {
        console.error(
            "Google token client is not ready."
        );
    }
}

export {
    initializeGoogleAuth
};