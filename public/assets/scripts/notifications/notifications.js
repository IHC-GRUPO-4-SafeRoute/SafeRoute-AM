const notificationStatus = document.querySelectorAll(".notification-status");
const readButton = document.getElementById("read-all-button");


const unreadImage = "../../assets/images/notifications/circle.png";
const readImage = "../../assets/images/notifications/check.png";


notificationStatus.forEach(button => {

    button.addEventListener("click", () => {

        const image = button.querySelector("img");


        if (image.src.includes("circle.png")) {

            image.src = readImage;

        } else {

            image.src = unreadImage;

        }


        updateButton();

    });

});



readButton.addEventListener("click", () => {


    const allRead = [...notificationStatus].every(button => {

        return button.querySelector("img").src.includes("check.png");

    });



    notificationStatus.forEach(button => {

        const image = button.querySelector("img");


        if(allRead){

            image.src = unreadImage;

        }else{

            image.src = readImage;

        }

    });


    updateButton();


});



function updateButton(){


    const allRead = [...notificationStatus].every(button => {

        return button.querySelector("img").src.includes("check.png");

    });



    if(allRead){

        readButton.textContent = "Marcar Como No Leído";

    }else{

        readButton.textContent = "Marcar Todo Como Leído";

    }

}