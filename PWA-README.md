# PWA Setup - US Passport Photo Helper

This app is now a Progressive Web App (PWA) - installable with offline support.

## 🚀 Features

- **📱 Installable**: Works like a native app on mobile and desktop
- **🔄 Offline Support**: Camera and photo editing work without internet
- **⚡ Fast Loading**: Cached resources load instantly
- **🎯 App-like Experience**: Runs in standalone mode

## 📱 Installation

**Mobile**: Look for "Add to Home Screen" prompt or use share button
**Desktop**: Click install button in browser address bar

## 🔧 Quick Setup

1. **Generate Icons**: Open `generate-icons.html` → save icons to `icons/` folder
2. **Serve App**: `python -m http.server 8000` (requires HTTPS for production)
3. **Test**: Open DevTools → Application tab → check Service Workers & Manifest

## 📁 PWA Files

- `manifest.json` - App configuration
- `sw.js` - Service worker for offline functionality
- `icons/` - PWA icons (generate with `generate-icons.html`)
- `browserconfig.xml` - Windows/Edge support

## 🔄 Offline Support

✅ Camera, photo editing, downloads
❌ AI analysis (requires internet)

---

Your app is now installable and works offline! 🎉 