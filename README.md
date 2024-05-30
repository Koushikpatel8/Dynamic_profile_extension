# Dynamic_profile_extension
## Objective

Create a Chrome extension that injects into the LinkedIn homepage and modifies the profile picture in all posts.

## Task Description

This Chrome extension changes the profile pictures of all posts on the LinkedIn homepage to a single image of your choice. This project demonstrates the ability to interact with a dynamic webpage and manipulate its elements.

## Features

- Injects into the LinkedIn homepage.
- Locates all profile pictures in the posts on the LinkedIn feed.
- Replaces the profile pictures with a specified image.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/linkedin-profile-modifier.git
    cd linkedin-profile-modifier
    ```

2. Open Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" by toggling the switch in the top right corner.

4. Click "Load unpacked" and select the directory where you cloned the repository.

5. The extension should now be installed and active.

## Usage

1. Navigate to the LinkedIn homepage.

2. The extension will automatically replace all profile pictures in the feed with the specified image.

## Development

### Files

- **manifest.json**: Configuration and permissions for the extension.
- **background.js**: Handles background tasks for the extension.
- **contentScript.js**: Injects into the LinkedIn homepage and modifies the profile pictures.
- **popup.html**: The extension's popup interface.
- **popup.js**: JavaScript for handling the popup interface.

### Key Code

#### Content Script (contentScript.js)

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const newProfileImageUrl = 'https://example.com/path/to/your/image.jpg'; // Replace with your image URL
  
  function replaceProfilePictures() {
    const profilePictureSelectors = [
      'img.feed-shared-actor__avatar-image', // Selector for profile pictures in posts
      'img.ivm-view-attr__img--centered', // Additional selector example (adjust as necessary)
      // Add more selectors if needed
    ];

    profilePictureSelectors.forEach(selector => {
      const profilePictures = document.querySelectorAll(selector);
      profilePictures.forEach(picture => {
        picture.src = newProfileImageUrl;
        picture.srcset = newProfileImageUrl; // For responsive images
      });
    });
  }

  // Initial replacement
  replaceProfilePictures();

  // Observe changes in the feed for dynamically loaded content
  const observer = new MutationObserver(replaceProfilePictures);
  observer.observe(document.body, { childList: true, subtree: true });
});
