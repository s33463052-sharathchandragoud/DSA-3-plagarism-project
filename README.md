# VeriText — Word-Level Plagiarism Checker

Professional DSA college project website.

## Features
- Word-level plagiarism percentage
- HashSet-based word lookup
- Sliding-window phrase detection
- String/token normalization
- Highlighted matching words
- Saved scan history with localStorage
- Responsive professional UI
- Dark/light mode
- `.txt` upload
- GitHub Pages compatible

## Run locally
Open `index.html` in a browser, or use VS Code Live Server.

## Publish on GitHub Pages
1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, `app.js`, and `README.md`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save and wait for GitHub Pages to publish.

The public site will be available from the GitHub Pages URL shown in **Settings → Pages**.

## DSA used
- HashSet for O(1)-average reference-word membership checks.
- Sliding window for consecutive phrase detection.
- Tokenization and normalization for consistent word comparison.
- Overall analysis is approximately O(n + m) for the main scan, where n and m are the token counts.
