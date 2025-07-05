# PWA Setup Guide - US Passport Photo Helper

This app has been converted to a Progressive Web App (PWA) for better user experience and offline functionality.

## 🚀 PWA Features

- **Installable**: Can be installed on mobile devices and desktop
- **Offline Support**: Core functionality works without internet
- **App-like Experience**: Runs in standalone mode without browser UI
- **Background Sync**: Handles offline operations when connection returns
- **Push Notifications**: Ready for future notification features
- **Responsive Design**: Optimized for all screen sizes

## 📱 Installation

### Mobile (iOS/Android)
1. Open the app in your mobile browser
2. Look for the "Add to Home Screen" prompt
3. Or tap the share button and select "Add to Home Screen"
4. The app will appear on your home screen like a native app

### Desktop (Chrome/Edge)
1. Open the app in Chrome or Edge
2. Look for the install button in the address bar
3. Or go to browser menu → "Install US Passport Photo Helper"
4. The app will be installed as a desktop application

## 🔧 Setup Instructions

### 1. Generate PWA Icons
1. Open `generate-icons.html` in your browser
2. Click "Generate All Icons"
3. Right-click each icon and save to the `icons/` folder
4. Use the exact filenames shown below each icon

### 2. Serve the App
The PWA requires HTTPS or localhost to work properly:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

### 3. Test PWA Features
1. Open browser developer tools
2. Go to Application tab
3. Check "Service Workers" and "Manifest" sections
4. Test offline functionality by going offline in Network tab

## 📁 PWA Files

- `manifest.json` - App manifest with metadata and configuration
- `sw.js` - Service worker for offline functionality and caching
- `browserconfig.xml` - Microsoft Edge/Windows configuration
- `icons/` - PWA icons in various sizes
- `generate-icons.html` - Utility to generate PWA icons

## 🔄 Offline Functionality

The app works offline for:
- ✅ Taking photos with camera
- ✅ Basic photo editing and cropping
- ✅ Downloading photos
- ❌ AI analysis (requires internet)

When offline, AI analysis will be queued and processed when connection returns.

## 🛠️ Development

### Service Worker Updates
When you update the service worker:
1. Users will see an "Update available" notification
2. They can refresh to get the latest version
3. The app handles updates gracefully

### Adding New Features
1. Update the service worker cache version
2. Add new files to the cache list if needed
3. Test offline functionality

## 🔍 Troubleshooting

### PWA Not Installing
- Ensure you're using HTTPS or localhost
- Check that all manifest icons exist
- Verify service worker is registered successfully

### Offline Features Not Working
- Check service worker registration in browser dev tools
- Verify files are being cached properly
- Test with browser offline mode

### Icons Not Displaying
- Ensure all icon files are in the `icons/` folder
- Check file paths in `manifest.json`
- Verify icon sizes match manifest specifications

## 📊 PWA Audit

Use Chrome DevTools Lighthouse to audit your PWA:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Progressive Web App"
4. Run audit and fix any issues

## 🌟 Best Practices

1. **Always serve over HTTPS** in production
2. **Keep service worker updated** with cache versioning
3. **Test offline functionality** regularly
4. **Optimize icons** for different platforms
5. **Monitor PWA metrics** with analytics

## 📈 Future Enhancements

Potential PWA improvements:
- Background sync for AI analysis
- Push notifications for photo tips
- Offline photo storage with IndexedDB
- Share target for receiving photos
- Shortcuts for quick actions

---

Your US Passport Photo Helper is now a full-featured PWA! 🎉 