// popup.js
// document.getElementById('myButton').addEventListener('click', function() {
//   alert('Button clicked!');
// });
//
// document.querySelector('.file-label').addEventListener('click', function() {
//   document.querySelector('#image-upload').click();
// });


// document.addEventListener('DOMContentLoaded', function () {
//   // Trigger file input when the file-label is clicked
//   document.querySelector('.file-label').addEventListener('click', function() {
//     document.querySelector('#profilePicture').click();
//   });

//   // Handle form submission
//   document.getElementById('profileForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const linkedinUrl = document.getElementById('linkedin-url').value;
//     const fileInput = document.getElementById('profilePicture');
//     const file = fileInput.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = function() {
//         // Open LinkedIn profile page in a new tab
//         chrome.tabs.create({ url: linkedinUrl }, function(tab) {
//           // Wait for the tab to finish loading
//           chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
//             if (tabId === tab.id && changeInfo.status === 'complete') {
//               // Inject the script to change the profile picture
//               chrome.scripting.executeScript({
//                 target: { tabId: tab.id },
//                 func: changeProfilePicture,
//                 args: [reader.result]
//               });
//             }
//           });
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   });

//   function changeProfilePicture(imageData) {
//     // This function runs in the context of the LinkedIn page
//     // Find the profile picture element and change its src attribute
//     // This is highly dependent on LinkedIn's DOM structure and could break if LinkedIn changes their site
//     const profilePictureElement = document.querySelector('img.profile-photo-edit__preview');
//     if (profilePictureElement) {
//       profilePictureElement.src = imageData;
//       alert('Profile picture changed (not actually saved).');
//     } else {
//       alert('Profile picture element not found.');
//     }
//   }
// });

document.addEventListener('DOMContentLoaded', function () {
  // Trigger file input when the file-label is clicked
  document.querySelector('.file-label').addEventListener('click', function() {
    document.querySelector('#profilePicture').click();
  });

  // Handle form submission
  document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const linkedinUrl = document.getElementById('linkedin-url').value;
    const fileInput = document.getElementById('profilePicture');
    const file = fileInput.files[0];

    if (!linkedinUrl) {
      alert('Please enter a LinkedIn URL.');
      return;
    }

    if (!file) {
      alert('Please select a profile picture.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = function() {
      // Open LinkedIn profile page in a new tab
      chrome.tabs.create({ url: linkedinUrl }, function(tab) {
        // Wait for the tab to finish loading
        const tabId = tab.id;
        chrome.tabs.onUpdated.addListener(function listener(tabIdUpdated, changeInfo) {
          if (tabIdUpdated === tabId && changeInfo.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
            // Inject the script to change the profile picture
            chrome.scripting.executeScript({
              target: { tabId: tabId },
              func: changeProfilePicture,
              args: [reader.result]
            });
          }
        });
      });
    };
    reader.readAsDataURL(file);
  });

  function changeProfilePicture(imageData) {
    // This function runs in the context of the LinkedIn page
    const profilePictureElement = document.querySelector('img.profile-photo-edit__preview');
    if (profilePictureElement) {
      profilePictureElement.src = imageData;
      alert('Profile picture changed (not actually saved).');
    } else {
      alert('Profile picture element not found.');
    }
  }
});
