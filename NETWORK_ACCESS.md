# Accessing Spelling Master from Other Devices

## Current Setup

Your app is running and accessible at:
- **On this laptop**: http://localhost:3001
- **On other devices (same WiFi)**: http://192.168.40.130:3001

## How to Access from Other Devices

### On the Same WiFi Network

1. **Make sure both devices are on the same WiFi network**
   - Your laptop must be connected to WiFi (not just ethernet)
   - The other device (tablet, phone, etc.) must be on the same WiFi

2. **Keep the dev server running on your laptop**
   - The terminal running `npm run dev` must stay open
   - Don't close your laptop or put it to sleep

3. **Open the app on the other device**
   - Open any web browser (Safari, Chrome, etc.)
   - Type in the address bar: `http://192.168.40.130:3001`
   - The app should load!

### Troubleshooting

**If it doesn't work:**

1. **Check your firewall**
   - Go to System Settings > Network > Firewall
   - Make sure the firewall allows Node.js connections
   - Or temporarily disable the firewall to test

2. **Verify the IP address**
   - Your laptop's IP might change if you reconnect to WiFi
   - To check your current IP, run in terminal:
     ```bash
     ipconfig getifaddr en0
     ```
   - Update the URL on other devices with the new IP

3. **Make sure dev server is running**
   - Check the terminal - it should say "Ready in Xms"
   - If not, restart with: `npm run dev`

## For Production Use (Deploy Online)

If you want to make this accessible from anywhere (not just local network):

### Option 1: Vercel (Easiest - Free)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (from your project folder)
vercel --prod
```
You'll get a URL like: `https://spelling-master.vercel.app`

### Option 2: Netlify (Also Free)
1. Push your code to GitHub
2. Go to https://netlify.com
3. Click "Import from Git"
4. Select your repository
5. Deploy!

### Option 3: Use ngrok (Temporary Public URL)
```bash
# Install ngrok
brew install ngrok

# In a new terminal, run:
ngrok http 3001
```
This gives you a temporary public URL like: `https://abc123.ngrok.io`

## Notes

- Local network access (192.168.40.130) only works when both devices are on the same WiFi
- Data is saved locally on each device separately (they don't sync)
- For shared progress across devices, you'd need a backend server (future enhancement)


