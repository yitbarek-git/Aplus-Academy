# Aplus Academy — Android Application

Native Android client (WebView wrapper) for **Aplus Academy** (Ethiopian University Learning Community).

- **App Name**: Aplus Academy
- **Package**: `com.aplusacademy.ethiopia`
- **Target URL**: `https://aplusacademyethiopia.vercel.app/`
- **Language**: Kotlin
- **Minimum SDK**: 24 (Android 7.0 Nougat)
- **Target SDK**: 34 (Android 14) / 35 ready
- **Architecture**: Client for the existing production web application and backend. No duplicated database, no hardcoded server secrets.

---

## Key Features & WebView Capabilities

1. **Full JavaScript & DOM Storage**:
   - `javaScriptEnabled = true`, `domStorageEnabled = true`, `databaseEnabled = true`
   - Responsive viewport and smooth layout scaling.
2. **Session & Cookie Persistence**:
   - `CookieManager` enabled with third-party cookie support and explicit flush on pause.
3. **Smart Navigation & Back Button**:
   - Pressing Android Back goes back within the WebView history.
   - If at the home page (no history), the application cleanly finishes without unexpected crashes.
4. **Offline Detection & Clean Network Error Screen**:
   - Checks active network capability.
   - If offline or unreachable, displays:
     > **"Aplus Academy could not connect to the internet."**
     > *With a prominent "Try Again" retry button and pull-to-refresh.*
5. **Progress Bar & Pull-to-Refresh**:
   - Top neon-green (`#16E016`) progress indicator during page load.
   - `SwipeRefreshLayout` for intuitive refresh.
6. **External URL & Deep Link Handling**:
   - **Telegram**: Directly launches the Telegram app via `tg://` or `https://t.me/` (or browser fallback if not installed).
   - **YouTube**: Embedded videos load directly within the page's iframe; channel links open in the native YouTube app.
   - **Payment Providers**: Deep links for Telebirr and CBE Birr (`telebirr://`, `cbebirr://`) route to mobile banking apps.
   - **Dialer & Email**: `tel:` and `mailto:` links trigger native phone and mail apps.
   - External non-Aplus links open safely in the system browser.
7. **Payment Proof Receipt Upload (File Picker)**:
   - Full `WebChromeClient.onShowFileChooser` implementation enabling students to attach payment screenshots and receipts from the device gallery or files.
8. **File Downloads**:
   - Integrated `DownloadListener` utilizing Android's `DownloadManager` for PDFs, past exams, and course documents.
9. **Security Compliance**:
   - No server secrets, API keys, or database credentials in the client code.
   - Cleartext traffic is disabled (`android:usesCleartextTraffic="false"`).
   - Strict HTTPS enforcement via `network_security_config.xml`.
   - Minimum permissions: `android.permission.INTERNET` and `android.permission.ACCESS_NETWORK_STATE`.

---

## How to Open and Build in Android Studio

1. Open **Android Studio**.
2. Select **File > Open…** and navigate to the `android/` directory.
3. Allow Gradle to sync dependencies.
4. Connect an Android device or launch an Emulator.
5. Click **Run > Run 'app'** (`Shift + F10`).

### Build APK via Command Line

- **Debug APK**:
  ```bash
  ./gradlew assembleDebug
  ```
  Output: `app/build/outputs/apk/debug/app-debug.apk`

- **Release APK**:
  ```bash
  ./gradlew assembleRelease
  ```
  Output: `app/build/outputs/apk/release/app-release-unsigned.apk`
