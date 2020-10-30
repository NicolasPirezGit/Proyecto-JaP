




document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("save-user-changes").addEventListener("click", () => {

        let profileNames = document.getElementById("profile-user-names");
        let profileSurnames = document.getElementById("profile-user-surnames");
        let profileBirthdate = document.getElementById("profile-user-birthdate");
        let profileMainEmail = document.getElementById("profile-user-email");
        let profileAge = document.getElementById("profile-user-age");
        let profileMainPhone = document.getElementById("profile-user-phone");
        
        let profileRecovEmail = document.getElementById("user-recovery-email");
        let profileRecovPhone = document.getElementById("user-recovery-phone");

        let profileAccountVisib = document.getElementById("user-account-visibility");
        let profilePurchasesVisib = document.getElementById("user-purchases-visibility");

        localStorage.setItem("User-Account-Data", JSON.stringify( {
            names: profileNames,
            surnames: profileSurnames,
            birthdate: profileBirthdate,
            mainEmail: profileMainEmail,
            age: profileAge,
            mainPhone: profileMainPhone,
            recovEmail: profileRecovEmail,
            recovPhone: profileRecovPhone,
            accountVisib: profileAccountVisib,
            purchasesVisib: profilePurchasesVisib
        } ));

    });

});