# ⚡ API Tester

A modern VS Code-style API testing tool built with HTML, CSS, and JavaScript.

🚀 Live Demo: https://anilarr.github.io/APITester/

---

## Features

- ✅ GET Requests
- ✅ POST Requests
- ✅ PUT Requests
- ✅ PATCH Requests
- ✅ DELETE Requests
- ✅ Custom Headers
- ✅ JSON Request Body
- ✅ Import cURL Commands
- ✅ Export Requests as cURL
- ✅ Request History
- ✅ Copy Response
- ✅ Download Response
- ✅ JSON Formatting
- ✅ Response Status
- ✅ Response Time Tracking
- ✅ Responsive Design
- ✅ VS Code Inspired UI
- ✅ GitHub Pages Compatible

---

## Screenshots

<img width="774" height="420" alt="Screenshot 2026-06-29 at 11 48 37 PM" src="https://github.com/user-attachments/assets/d795c631-758c-4e9b-a371-2739a19ea6dc" />

<img width="1499" height="821" alt="Screenshot 2026-06-29 at 11 50 40 PM" src="https://github.com/user-attachments/assets/842a1ce9-616d-4f3b-b137-cf7791b8b655" />

---

## How To Use

### Send GET Request

1. Select **GET**
2. Enter API URL
3. Click **Send**

Example:

```text
https://jsonplaceholder.typicode.com/users
```

---

### Send POST Request

URL:

```text
https://jsonplaceholder.typicode.com/posts
```

Headers:

```json
{
  "Content-Type": "application/json"
}
```

Body:

```json
{
  "title": "Hello",
  "body": "World",
  "userId": 1
}
```

---

## Import cURL

Paste any cURL command:

```bash
curl -X POST https://jsonplaceholder.typicode.com/posts \
-H "Content-Type: application/json" \
-d '{"title":"Hello","body":"World"}'
```

The application automatically extracts:

- Method
- URL
- Headers
- Request Body

---

## Export cURL

Generate a cURL command from your request configuration with one click.

Example output:

```bash
curl -X POST "https://jsonplaceholder.typicode.com/posts" \
-H "Content-Type: application/json" \
-d '{"title":"Hello","body":"World"}'
```

---

## Browser Limitations

This application runs entirely in the browser using the Fetch API.

Some APIs block browser requests because of CORS restrictions.

If you see:

```text
Request Failed
Failed to fetch
```

The API may not allow requests from browser-based applications.

Working test APIs:

```text
https://jsonplaceholder.typicode.com
https://dummyjson.com
```

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Fetch API
- LocalStorage

---

## Local Development

Clone the repository:

```bash
git clone https://github.com/AnilARR/ApiTester.git
```

Open:

```text
index.html
```

in your browser.

---

## Deployment

Deploy easily using GitHub Pages.

### Enable GitHub Pages

1. Repository Settings
2. Pages
3. Source → Deploy from Branch
4. Branch → main
5. Folder → / (root)

Save changes.

---

## Future Features

- Collections
- Environment Variables
- GraphQL Support
- Monaco Editor
- Authentication Tab
- Theme Switcher
- Workspace Export/Import

---

## License

MIT License

---

Made with ❤️ by Anil Rathod
