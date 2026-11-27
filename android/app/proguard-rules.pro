# Add project specific ProGuard rules here.
# Keep Android WebView and JavaScript Interface classes
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

-keepattributes JavascriptInterface
-keepclassmembers class * extends android.webkit.WebViewClient {
    public void *(android.webkit.WebView, java.lang.String);
}
-keepclassmembers class * extends android.webkit.WebChromeClient {
    public void *(android.webkit.WebView, ...);
}

# AndroidX and Material rules
-keep class androidx.webkit.** { *; }
-keep class com.google.android.material.** { *; }
