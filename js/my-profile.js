




document.addEventListener("DOMContentLoaded", function (e) {

    let userProfile = localStorage.getItem("User-Account-Data");

    if(userProfile) {
        let parsedUserProfile = JSON.parse(userProfile);
        console.log(parsedUserProfile.names);
        document.getElementById("profile-user-names").value = parsedUserProfile.names;
        document.getElementById("profile-user-surnames").value = parsedUserProfile.surnames;
        document.getElementById("profile-user-birthdate").value = parsedUserProfile.birthdate;
        document.getElementById("profile-user-email").value = parsedUserProfile.mainEmail;
        document.getElementById("profile-user-age").value = parsedUserProfile.age;
        document.getElementById("profile-user-phone").value = parsedUserProfile.mainPhone;

        document.getElementById("user-recovery-email").value = parsedUserProfile.recovEmail;
        document.getElementById("user-recovery-phone").value = parsedUserProfile.recovPhone;

        document.getElementById("user-account-visibility").value = parsedUserProfile.accountVisib;
        document.getElementById("user-purchases-visibility").value = parsedUserProfile.purchasesVisib;
    }



    document.getElementById("save-user-changes").addEventListener("click", () => {

        let profileNames = document.getElementById("profile-user-names").value;
        console.log(profileNames);
        let profileSurnames = document.getElementById("profile-user-surnames").value;
        console.log(profileSurnames);
        let profileBirthdate = document.getElementById("profile-user-birthdate").value;
        console.log(profileBirthdate);
        let profileMainEmail = document.getElementById("profile-user-email").value;
        console.log(profileMainEmail);
        let profileAge = document.getElementById("profile-user-age").value;
        console.log(profileAge);
        let profileMainPhone = document.getElementById("profile-user-phone").value;
        console.log(profileMainPhone);
        
        let profileRecovEmail = document.getElementById("user-recovery-email").value;
        console.log(profileRecovEmail);
        let profileRecovPhone = document.getElementById("user-recovery-phone").value;
        console.log(profileRecovPhone);

        let profileAccountVisib = document.getElementById("user-account-visibility").value;
        console.log(profileAccountVisib);
        let profilePurchasesVisib = document.getElementById("user-purchases-visibility").value;
        console.log(profilePurchasesVisib);

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