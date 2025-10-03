# One-page signup → Google Sheet

This site collects lead info and sends it to a Google Sheet via a Google Apps Script Web App endpoint.

## How to set up the Google Sheet + Apps Script

1. Create a new Google Sheet and name it, e.g. "Race Leads".
2. In the Sheet, add a header row in row 1 with these columns:
	- timestamp, firstName, lastName, year, make, model, state, email, phone, userAgent
3. Open Extensions → Apps Script. Replace the default code with the script below.
4. Click Deploy → Manage deployments → New deployment → type: Web app.
	- Execute as: Me
	- Who has access: Anyone
	- Deploy, then copy the Web app URL.
5. In `script.js`, set `APPS_SCRIPT_URL` to the copied URL.
6. Open `index.html` in your browser and submit a test entry.

## Google Apps Script code
Paste this into the Apps Script editor (`Code.gs`):

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      data.firstName || "",
      data.lastName || "",
      data.year || "",
      data.make || "",
      data.model || "",
      data.state || "",
      data.streetAddress || "",
      data.city || "",
      data.zipCode || "",
      data.email || "",
      data.phone || "",
      data.userAgent || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err && err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Customize
- Colors are black/white/blue with subtle gray accents in `style.css`.
- Form fields: firstName, lastName, year, make, model, state, streetAddress, city, zipCode, email, phone (all required). Modify as needed.

## Privacy note
Only collect information you need. Consider adding a brief privacy statement on the page.

