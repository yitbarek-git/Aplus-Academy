package com.aplusacademy.ethiopia

import android.annotation.SuppressLint
import android.app.DownloadManager
import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.view.View
import android.webkit.CookieManager
import android.webkit.DownloadListener
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout

class MainActivity : AppCompatActivity() {

    companion object {
        const val TARGET_URL = "https://aplusacademyethiopia.vercel.app/"
        const val HOST_NAME = "aplusacademyethiopia.vercel.app"
    }

    private lateinit var webView: WebView
    private lateinit var swipeRefreshLayout: SwipeRefreshLayout
    private lateinit var progressBar: ProgressBar
    private lateinit var errorContainer: LinearLayout
    private lateinit var btnRetry: Button

    // File upload callback for WebChromeClient (Payment Proof Receipts / Images)
    private var fileUploadCallback: ValueCallback<Array<Uri>>? = null
    private lateinit var fileChooserLauncher: ActivityResultLauncher<Intent>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initViews()
        setupBackNavigation()
        setupFileChooser()
        setupWebView()

        btnRetry.setOnClickListener {
            retryConnection()
        }

        swipeRefreshLayout.setOnRefreshListener {
            if (isNetworkAvailable()) {
                webView.reload()
            } else {
                swipeRefreshLayout.isRefreshing = false
                showErrorScreen()
            }
        }

        // Configure swipeRefreshLayout colors matching Aplus brand
        swipeRefreshLayout.setColorSchemeColors(
            getColor(R.color.brand_primary),
            getColor(R.color.brand_primary_dark)
        )
        swipeRefreshLayout.setProgressBackgroundColorSchemeColor(
            getColor(R.color.brand_surface)
        )

        // Initial Load
        loadAplusAcademy()
    }

    private fun initViews() {
        webView = findViewById(R.id.webView)
        swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout)
        progressBar = findViewById(R.id.progressBar)
        errorContainer = findViewById(R.id.errorContainer)
        btnRetry = findViewById(R.id.btnRetry)
    }

    /**
     * Handles Android back button according to specification:
     * - If WebView has browsing history: go back
     * - If no browsing history: exit application
     */
    private fun setupBackNavigation() {
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (errorContainer.visibility == View.VISIBLE) {
                    // If error screen is displayed, exit cleanly or retry
                    finish()
                } else if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    finish()
                }
            }
        })
    }

    /**
     * Configures file picker for student payment proof receipts & documents
     */
    private fun setupFileChooser() {
        fileChooserLauncher = registerForActivityResult(
            ActivityResultContracts.StartActivityForResult()
        ) { result ->
            if (fileUploadCallback == null) return@registerForActivityResult

            var results: Array<Uri>? = null
            if (result.resultCode == RESULT_OK) {
                val data = result.data
                if (data != null) {
                    val dataString = data.dataString
                    val clipData = data.clipData

                    if (clipData != null) {
                        results = Array(clipData.itemCount) { i ->
                            clipData.getItemAt(i).uri
                        }
                    } else if (dataString != null) {
                        results = arrayOf(Uri.parse(dataString))
                    }
                }
            }
            fileUploadCallback?.onReceiveValue(results)
            fileUploadCallback = null
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        val settings: WebSettings = webView.settings

        // 1. JavaScript & Storage
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true

        // 2. Responsive Viewport & Zoom
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true
        settings.setSupportZoom(true)
        settings.builtInZoomControls = true
        settings.displayZoomControls = false

        // 3. Cache & Network optimization
        settings.cacheMode = if (isNetworkAvailable()) {
            WebSettings.LOAD_DEFAULT
        } else {
            WebSettings.LOAD_CACHE_ELSE_NETWORK
        }

        // 4. Media & HTTPS
        settings.mediaPlaybackRequiresUserGesture = false
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
        settings.allowFileAccess = false
        settings.allowContentAccess = true

        // 5. User-Agent appending for custom web optimization if needed
        val defaultUserAgent = settings.userAgentString
        settings.userAgentString = "$defaultUserAgent AplusAcademyApp/1.0"

        // 6. Cookie Manager persistence
        val cookieManager = CookieManager.getInstance()
        cookieManager.setAcceptCookie(true)
        cookieManager.setAcceptThirdPartyCookies(webView, true)

        // WebChromeClient for Progress Bar & File Uploads
        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                if (newProgress in 1..99) {
                    progressBar.visibility = View.VISIBLE
                    progressBar.progress = newProgress
                } else {
                    progressBar.visibility = View.GONE
                    swipeRefreshLayout.isRefreshing = false
                }
            }

            override fun onShowFileChooser(
                mWebView: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                // Cancel existing callback if any
                fileUploadCallback?.onReceiveValue(null)
                fileUploadCallback = filePathCallback

                try {
                    val intent = fileChooserParams?.createIntent() ?: Intent(Intent.ACTION_GET_CONTENT).apply {
                        addCategory(Intent.CATEGORY_OPENABLE)
                        type = "image/*"
                    }
                    fileChooserLauncher.launch(intent)
                    return true
                } catch (e: Exception) {
                    fileUploadCallback?.onReceiveValue(null)
                    fileUploadCallback = null
                    Toast.makeText(this@MainActivity, "Cannot open file chooser", Toast.LENGTH_SHORT).show()
                    return false
                }
            }
        }

        // WebViewClient for URL Routing, External Links & Error Handling
        webView.webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
                hideErrorScreen()
                progressBar.visibility = View.VISIBLE
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                progressBar.visibility = View.GONE
                swipeRefreshLayout.isRefreshing = false
                CookieManager.getInstance().flush()
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                super.onReceivedError(view, request, error)
                // Only trigger error view for the main page failure (not minor sub-resources)
                if (request?.isForMainFrame == true) {
                    showErrorScreen()
                }
            }

            override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?
            ): Boolean {
                val uri = request?.url ?: return false
                val urlString = uri.toString()

                // Keep Aplus Academy and embedded media inside the WebView
                if (isInternalUrl(uri)) {
                    return false
                }

                // Handle Telegram links (Native App or Fallback to Browser)
                if (urlString.startsWith("tg://") || uri.host?.contains("t.me") == true) {
                    return openTelegramLink(urlString)
                }

                // Handle YouTube links: embedded iframe videos stay in WebView, external channel links open in YouTube app
                if (urlString.contains("/embed/")) {
                    return false // Let embedded YouTube player play inside the site!
                }
                if (urlString.startsWith("vnd.youtube:") || uri.host?.contains("youtube.com") == true || uri.host?.contains("youtu.be") == true) {
                    return openExternalIntent(urlString)
                }

                // Handle Payment Deep Links (Telebirr, CBE Birr, etc.)
                if (urlString.startsWith("telebirr://") || urlString.startsWith("cbebirr://")) {
                    return openExternalIntent(urlString)
                }

                // Handle Phone calls & Emails
                if (urlString.startsWith("tel:") || urlString.startsWith("mailto:")) {
                    return openExternalIntent(urlString)
                }

                // All other external websites open in the user's default browser
                return openExternalIntent(urlString)
            }
        }

        // Download Listener for Course PDFs, Past Exams and Materials
        webView.setDownloadListener(DownloadListener { url, userAgent, contentDisposition, mimetype, _ ->
            try {
                val request = DownloadManager.Request(Uri.parse(url)).apply {
                    setMimeType(mimetype)
                    addRequestHeader("User-Agent", userAgent)
                    setDescription("Downloading Aplus Academy material")
                    setTitle(url.substringAfterLast('/'))
                    setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                    setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, url.substringAfterLast('/'))
                }

                val dm = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
                dm.enqueue(request)
                Toast.makeText(this@MainActivity, getString(R.string.download_started), Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                // Fallback: open via external browser/downloader
                openExternalIntent(url)
            }
        })
    }

    private fun isInternalUrl(uri: Uri): Boolean {
        val host = uri.host?.lowercase() ?: return false
        return host == HOST_NAME ||
               host.endsWith(".vercel.app") && host.contains("aplusacademy")
    }

    private fun openTelegramLink(url: String): Boolean {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            intent.setPackage("org.telegram.messenger")
            startActivity(intent)
            return true
        } catch (e: Exception) {
            // Telegram app not installed: open standard browser view
            return openExternalIntent(url)
        }
    }

    private fun openExternalIntent(url: String): Boolean {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            startActivity(intent)
            return true
        } catch (e: ActivityNotFoundException) {
            Toast.makeText(this, "No app available to open this link.", Toast.LENGTH_SHORT).show()
            return false
        }
    }

    private fun loadAplusAcademy() {
        if (isNetworkAvailable()) {
            hideErrorScreen()
            webView.loadUrl(TARGET_URL)
        } else {
            showErrorScreen()
        }
    }

    private fun retryConnection() {
        if (isNetworkAvailable()) {
            hideErrorScreen()
            if (webView.url != null && webView.url!!.isNotEmpty()) {
                webView.reload()
            } else {
                webView.loadUrl(TARGET_URL)
            }
        } else {
            Toast.makeText(
                this,
                getString(R.string.error_no_internet_title),
                Toast.LENGTH_SHORT
            ).show()
        }
    }

    private fun showErrorScreen() {
        progressBar.visibility = View.GONE
        swipeRefreshLayout.isRefreshing = false
        swipeRefreshLayout.visibility = View.GONE
        errorContainer.visibility = View.VISIBLE
    }

    private fun hideErrorScreen() {
        errorContainer.visibility = View.GONE
        swipeRefreshLayout.visibility = View.VISIBLE
    }

    private fun isNetworkAvailable(): Boolean {
        val cm = getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager ?: return false
        val network = cm.activeNetwork ?: return false
        val capabilities = cm.getNetworkCapabilities(network) ?: return false
        return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) &&
               capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
    }

    override fun onPause() {
        super.onPause()
        webView.onPause()
        CookieManager.getInstance().flush()
    }

    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }
}
