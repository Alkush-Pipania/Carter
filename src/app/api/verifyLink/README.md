# Carter Browser Extension API

This API endpoint provides a way for the Carter browser extension to save links with AI-powered folder suggestion.

## Authentication

Authentication requires passing your Carter authentication token in the request. The extension needs to get this token from localStorage when the user is logged in to Carter.

## Endpoint

```
POST /api/verifyLink
```

## Request Format

```json
{
  "url": "https://example.com/page-to-save",
  "token": "your-carter-auth-token"
}
```

| Parameter | Type | Description |
| --- | --- | --- |
| `url` | string | The URL to save (required) |
| `token` | string | Authentication token from localStorage (required) |

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Link saved successfully with AI folder suggestion",
  "data": {
    "link": {
      "title": "Example Title",
      "description": "Example description of the page...",
      "links": "https://example.com/page-to-save",
      "userID": 123,
      "imgurl": "https://example.com/image.jpg",
      "secret_Id": "abc123",
      "body": "Full content of the page..."
    },
    "folderSuggestion": {
      "suggestedFolder": "42",
      "confidence": 0.87,
      "reasoning": "This link is about programming, which matches the folder 'Programming'"
    }
  }
}
```

### Error Responses

#### Authentication Error

```json
{
  "error": "Unauthorized",
  "message": "Authentication token is required"
}
```

#### Missing URL

```json
{
  "error": "Bad Request",
  "message": "URL is required"
}
```

#### Server Error

```json
{
  "error": "Failed to save link",
  "message": "Error message details"
}
```

## CORS Support

This API supports CORS for the following origins:
- http://localhost:5173
- http://localhost:3000
- http://your-production-domain.com

## Example Usage

```javascript
// JavaScript example using fetch
const saveLinkToCarter = async (url) => {
  try {
    // Get authentication token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Not logged in. Please log in to Carter first.');
    }
    
    const response = await fetch('https://your-carter-app.com/api/verifyLink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        url,
        token
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to save link');
    }
    
    return data;
  } catch (error) {
    console.error('Error saving link:', error);
    throw error;
  }
};
```

## Implementing in Browser Extensions

For Chrome extensions, you'll need to:

1. Request the appropriate permissions in your manifest.json:
```json
"permissions": [
  "activeTab",
  "storage",
  "https://your-carter-app.com/"
]
```

2. Get the token from the user's Carter session:
```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveLink") {
    const { url } = request;
    
    // Get the token from localStorage 
    chrome.tabs.executeScript({
      code: 'localStorage.getItem("token");'
    }, (results) => {
      const token = results[0];
      
      if (!token) {
        sendResponse({ 
          success: false, 
          error: "You need to log in to Carter first" 
        });
        return;
      }
      
      fetch('https://your-carter-app.com/api/verifyLink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, token })
      })
      .then(response => response.json())
      .then(data => {
        sendResponse({ success: true, data });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
    });
    
    return true; // Keeps the message channel open for async response
  }
});
``` 