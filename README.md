# Eyes On Me · 观测者
**A Ne Zha II fan fiction by Silmeria**

---

## Site structure

```
eyes-on-me/
├── index.html              ← Landing page
├── chapters.html           ← Full chapter index
├── chapter-prologue.html   ← 楔子
├── chapter-01.html         ← 第一章
├── chapter-02.html         ← 第二章
│   ... (through chapter-27)
├── chapter-epilogue.html   ← 尾声
├── chapter-afterword.html  ← 后记
├── chapter-extra-1.html    ← 番外一
├── chapter-extra-2.html    ← 番外二
├── illustrations.html      ← Commissioned artwork gallery
├── merch.html              ← Fan merch / physical book photos
├── contact.html            ← Contact form + social links
├── style.css               ← All shared styles
├── main.js                 ← Stars, scroll animations, music player, nav
└── assets/
    ├── images/
    │   ├── illustrations/  ← Drop commissioned art images here
    │   ├── merch/          ← Drop merch/book photos here
    │   └── cover/          ← Book cover image (optional)
    └── audio/              ← Drop .mp3 files here (one per chapter)
```

---

## Hosting on GitHub Pages

1. Create a new GitHub repository (e.g. `eyes-on-me`)
2. Upload all files maintaining this folder structure
3. Go to **Settings → Pages → Branch: main → / (root)**
4. Your site will be live at `https://yourusername.github.io/eyes-on-me/`

---

## Adding chapter text

Open any `chapter-XX.html` file and find this comment:
```html
<!-- PASTE CHAPTER TEXT HERE — wrap each paragraph in <p> tags -->
```
Replace the placeholder `<p>` tags with your actual content. Each paragraph needs its own `<p>` tags:
```html
<p>第一段内容……</p>
<p>第二段内容……</p>
```

---

## Adding music to a chapter

At the bottom of each chapter file, find:
```javascript
var TRACK_SRC = '';
var TRACK_NAME = '— no track assigned —';
```
Update like this:
```javascript
var TRACK_SRC = 'assets/audio/chapter-01.mp3';
var TRACK_NAME = 'Song Title — Artist Name';
```
The music player will appear in the bottom-right corner when a track is assigned.

**Supported formats:** `.mp3`, `.ogg`, `.wav`

---

## Adding illustrations

In `illustrations.html`, find the `<!-- HOW TO ADD YOUR ILLUSTRATIONS -->` comment and replace each placeholder `<div>` with:
```html
<div class="illus-item" onclick="openLightbox('assets/images/illustrations/01.jpg', 'Title', 'Artist')">
  <img src="assets/images/illustrations/01.jpg" alt="Illustration title">
  <div class="illus-caption">
    <p class="illus-caption-title">Title</p>
    <p class="illus-caption-desc">Commissioned · Artist name</p>
  </div>
</div>
```
To add more slots, duplicate an `illus-item` block.

---

## Adding merch photos

In `merch.html`, find the `<!-- HOW TO ADD MORE MERCH PHOTOS -->` comment:
```html
<div class="merch-card" onclick="openLightbox('assets/images/merch/photo.jpg', 'Caption')">
  <div class="merch-card-img">
    <img src="assets/images/merch/photo.jpg" alt="">
  </div>
  <div class="merch-card-body">
    <p class="merch-card-name">Item name</p>
    <p class="merch-card-desc">Short description</p>
  </div>
</div>
```

---

## Updating chapter titles

In `chapters.html`, each row looks like:
```html
<a href="chapter-01.html" class="chapter-row">
  <span class="ch-num">第一章</span>
  <span class="ch-title">Chapter 1 <em>add title</em></span>
  <span class="ch-track">— add track —</span>
  <span class="ch-arrow">→</span>
</a>
```
Replace `add title` with the actual chapter title, and `— add track —` with the song name.

---

## Social links

In `contact.html`, update the `href="#"` and handle text for each platform.

---

*Fan work. Ne Zha II belongs to its creators. No commercial use.*
