# cPanel Express Backend

This directory contains a basic Express API configured to be hosted on cPanel's Node.js application feature.

## How to Deploy to cPanel

1. **Zip the contents**: Select all files inside this `backend` folder (`app.js`, `package.json`, etc.) and zip them. (Do not zip the `backend` folder itself, but its contents).
2. **Upload to cPanel**: Go to cPanel File Manager and upload the zip file to your desired folder (e.g., `mathumi_backend` in your root or outside `public_html`).
3. **Extract**: Extract the zip file there.
4. **Setup Node.js App**:
   - Go to "Setup Node.js App" in cPanel.
   - Click "Create Application".
   - **Node.js version**: 18.x or 20.x (recommended).
   - **Application mode**: Production.
   - **Application root**: The folder where you extracted the files (e.g., `mathumi_backend`).
   - **Application URL**: The domain/subdomain you want the API to be accessible from (e.g., `api.yourdomain.com`).
   - **Application startup file**: `app.js`.
5. **Install Dependencies**: Once created, click "Run NPM Install" from the Setup Node.js App page to install the dependencies from `package.json`.
6. **Start Application**: Ensure the app is started or click "Restart".

## Vercel Frontend Connection

Once this backend is live (e.g., at `https://api.yourdomain.com`), go to your Vercel project settings for the frontend and add an Environment Variable:
- **Key**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://api.yourdomain.com`

Redeploy your Vercel app so it picks up the new backend URL.
