# MoodPost - A Minimalist Mood-Based Journal

MoodPost is a lightweight, interactive journaling app where users can write posts, tag emotions, and organize their thoughts. Built with vanilla JavaScript, HTML, and CSS, it stores entries locally in the browser for easy access.

## Features

- Create Posts: Users can write posts (up to 280 characters) with an optional author name. Posts can include hashtags (e.g., #express).
- Mood Reactions: Users can react to posts with three moods: Happy (😊), Sad (😢), and Fire (🔥). Reactions include a floating animation.
- Archive Posts: Posts can be archived and viewed in a separate "Archive" tab.
- Delete Posts: Users can delete posts with a confirmation prompt.
- Tabs: Switch between "Feed" (active posts) and "Archive" (archived posts) views.
- Persistent Storage: Posts are saved to localStorage and persist across page reloads.
- Responsive Design: The app is styled for both desktop and mobile devices (responsive at 480px and below).
- Animations: Includes subtle animations for rendering posts (slideUp, fadeIn) and mood reactions (floatUp).

## Tech Stack

- Vanilla JavaScript: Used for DOM manipulation, event handling, and state management.
- HTML: Structure of the app.
- CSS: Custom styles with CSS variables, animations, and responsive design.
- Font Awesome: For icons (e.g., user, archive, trash).
- Google Fonts: Uses the Poppins font for a clean, modern look.
- localStorage: For persisting posts across sessions.

## Test the App:

- Create a post by entering some text (e.g., "Hello #test") and an optional author name, then click "Post".
- React to posts with mood buttons (😊, 😢, 🔥).
- Archive or delete posts using the respective buttons.
- Switch between "Feed" and "Archive" tabs to view active or archived posts.



## Usage

**Creating a Post:**

Enter your name (optional) in the "Your name" field.
Write your post in the textarea (max 280 characters).
Click the "Post" button to share your post.
The post will appear in the "Feed" tab.


**Reacting to Posts:**

Click the mood buttons (😊, 😢, 🔥) to add a reaction. The reaction count will increment, and a floating animation will play.


**Archiving Posts:**

Click the archive icon to move a post to the "Archive" tab.
In the "Archive" tab, click the unarchive icon to move it back to "Feed".


**Deleting Posts:**

Click the trash icon to delete a post. A confirmation prompt will appear.


**Switching Tabs:**

Use the "Feed" and "Archive" tabs to switch between active and archived posts.



## Styling

The app uses a custom style.css file with the following features:

- CSS Variables: Colors and shadows are defined using CSS custom properties (e.g., --primary: #31473A).
- Animations: Includes fadeIn, slideUp, and floatUp animations for smooth transitions.
- Responsive Design: Adjusts layout and font sizes for screens smaller than 480px.
- Font Awesome Icons: Used for user, archive, trash, and other icons.
- Google Fonts: Uses the Poppins font for a clean, modern look.

