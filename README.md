# ChatGPT Video Summarizer Chrome Extension
This Chrome extension provides a summary of video content on YouTube and Bilibili using OpenAI's ChatGPT API. The extension fetches video information, such as title and description, and sends a request to the ChatGPT API to generate a summary. Users can view the summary in a popup window, making it easier to understand the content of a video without watching it in its entirety.

## Features
Generates a summary of video content on YouTube and Bilibili
Integrates with ChatGPT API for text summarization
Customizable summary length through extension options
User-friendly interface with loading and error states

## Installation
1. Clone the repository or download the source code:
   ```
   git clone https://github.com/yourusername/video-summarizer.git
   ```
2. In Google Chrome, navigate to chrome://extensions/.
3. Enable "Developer mode" by clicking the toggle switch in the upper-right corner.
4. Click "Load unpacked" and select the downloaded video-summarizer folder.

The extension should now be installed and visible in your browser toolbar.

## Usage
1. Navigate to a YouTube or Bilibili video page.
2. Click the Video Summarizer icon in the browser toolbar.
3. Click the "Summarize" button in the popup window.
4. The extension will display a summary of the video content.

## Configuration
To change the maximum length of the summary:

1. Right-click the Video Summarizer icon in the browser toolbar and select "Options".
2. In the options page, set the desired value for "Max tokens".
3. Click "Save".

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Disclaimer
This Chrome extension is an example project and is not affiliated with or endorsed by YouTube, Bilibili, or OpenAI. Use at your own risk.


