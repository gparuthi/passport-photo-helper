# US Passport Photo Helper 📸

A simple web app to take compliant US passport photos using your browser's camera. Built as an afternoon hack!

## 🚀 How to Use

1. Open `index.html` in any modern browser
2. Allow camera access when prompted
3. Position your face within the guides
4. Click capture when the status turns green
5. Download your 2×2 inch passport photo!

## ✨ Features

- **Real-time positioning guides** with eye-level alignment
- **AI feedback** (optional) - analyzes photo compliance every 3 seconds
- **Mobile-friendly** - works great on phones
- **Instant download** - saves as 600×600px JPEG
- **Privacy-first** - everything happens locally in your browser

## 🛠️ Setup

**Just want to use it?** Double-click `index.html` and you're done!

**Want AI features?** Run a local server:
```bash
python -m http.server 8000
# Then open http://localhost:8000
```

## 📋 What It Does

Creates photos that meet US passport requirements:
- 2×2 inches (600×600 pixels)
- Plain white background
- Neutral expression
- Both eyes visible
- Head centered and straight

## 🔧 Tech Stack

Just vanilla HTML, CSS, and JavaScript in a single file. Optional AI integration with Claude.

---

**That's it!** Open the file and start taking passport photos. 📷
