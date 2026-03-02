package com.efootwear.app;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

/**
 * ============================================================
 * MainActivity – Núcleo do app e-Footwear Outlet
 * ============================================================
 *
 * OBJETIVO PEDAGÓGICO:
 * Demonstrar como criar um aplicativo Android que acessa um site
 * de e-commerce usando WebView, com recursos profissionais como:
 *
 *   1. WebView configurado para máxima compatibilidade
 *   2. Verificação de conectividade antes de carregar
 *   3. Barra de progresso durante carregamento
 *   4. Suporte ao botão "Voltar" do Android
 *   5. SwipeRefreshLayout para recarregar com gesto
 *   6. Tratamento de erros de rede
 *   7. Menu de opções (Recarregar, Abrir no Browser, Compartilhar)
 *
 * POR QUE DESENVOLVER APPS ANDROID? (Fonte: androidpro.com.br)
 *   - Android domina ~72% do mercado mobile global
 *   - Play Store tem + de 2,5 bilhões de usuários ativos
 *   - Kotlin/Java = habilidades altamente demandadas
 *   - Monetização: anúncios, assinaturas, compras in-app
 * ============================================================
 */
public class MainActivity extends AppCompatActivity {

    // URL do site e-Footwear (hospedado via GitHub Pages ou similar)
    // Alternativamente, pode apontar para o repositório GitHub raw
    private static final String ECOMMERCE_URL =
            "https://ofsilva-v2.github.io/e-commerce/index.html";

    // URL de fallback caso o GitHub Pages não esteja ativo
    private static final String FALLBACK_URL =
            "https://github.com/OFSilva-v2/e-commerce";

    // Views
    private WebView webView;
    private ProgressBar progressBar;
    private SwipeRefreshLayout swipeRefresh;
    private LinearLayout layoutNoInternet;
    private Toolbar toolbar;

    // ─────────────────────────────────────────────────────────
    // Ciclo de Vida
    // ─────────────────────────────────────────────────────────

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Inicializa as views
        toolbar = findViewById(R.id.toolbar);
        webView = findViewById(R.id.webView);
        progressBar = findViewById(R.id.progressBar);
        swipeRefresh = findViewById(R.id.swipeRefresh);
        layoutNoInternet = findViewById(R.id.layoutNoInternet);

        // Configura a Toolbar como ActionBar
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setTitle("e-Footwear Outlet");
        }

        // Configura SwipeRefresh (puxar para atualizar)
        swipeRefresh.setColorSchemeResources(
                R.color.primary, R.color.secondary, R.color.accent);
        swipeRefresh.setOnRefreshListener(this::recarregarPagina);

        // Botão "Tentar Novamente" na tela de sem internet
        findViewById(R.id.btnTentarNovamente).setOnClickListener(v -> recarregarPagina());

        // Configura e carrega o WebView
        configurarWebView();
        carregarSite();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        // Salva o estado do WebView para rotação de tela
        webView.saveState(outState);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        // Restaura o estado do WebView
        webView.restoreState(savedInstanceState);
    }

    // ─────────────────────────────────────────────────────────
    // Configuração do WebView
    // ─────────────────────────────────────────────────────────

    @SuppressLint("SetJavaScriptEnabled")
    private void configurarWebView() {
        WebSettings settings = webView.getSettings();

        // ── JavaScript ──
        // Necessário para o site de e-commerce funcionar (cart.js, main.js, products.js)
        settings.setJavaScriptEnabled(true);

        // ── Cache & Armazenamento ──
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setDomStorageEnabled(true);      // localStorage / sessionStorage
        settings.setDatabaseEnabled(true);

        // ── Conteúdo & Media ──
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);

        // ── Layout e Zoom ──
        settings.setUseWideViewPort(true);          // Respeita viewport meta tag
        settings.setLoadWithOverviewMode(true);     // Ajusta ao tamanho da tela
        settings.setBuiltInZoomControls(true);      // Permite pinch-to-zoom
        settings.setDisplayZoomControls(false);     // Esconde botões +/- de zoom

        // ── User Agent personalizado ──
        String defaultUA = settings.getUserAgentString();
        settings.setUserAgentString(defaultUA + " EFootwearApp/1.0 Android");

        // ── WebViewClient: intercepta navegação ──
        webView.setWebViewClient(new WebViewClient() {

            @Override
            public void onPageStarted(WebView view, String url, android.graphics.Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                progressBar.setVisibility(View.VISIBLE);
                swipeRefresh.setRefreshing(false);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                progressBar.setVisibility(View.GONE);
                swipeRefresh.setRefreshing(false);
                // Atualiza título da toolbar com o título da página
                if (view.getTitle() != null && !view.getTitle().isEmpty()) {
                    toolbar.setTitle(view.getTitle());
                }
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();

                // Links tel: abrem o discador
                if (url.startsWith("tel:")) {
                    startActivity(new Intent(Intent.ACTION_DIAL, Uri.parse(url)));
                    return true;
                }
                // Links mailto: abrem o e-mail
                if (url.startsWith("mailto:")) {
                    startActivity(new Intent(Intent.ACTION_SENDTO, Uri.parse(url)));
                    return true;
                }
                // Links externos ao domínio abre no browser
                if (!url.contains("ofsilva-v2.github.io") && !url.contains("github.com")) {
                    Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(browserIntent);
                    return true;
                }
                return false; // Carrega internamente
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request,
                                        WebResourceError error) {
                super.onReceivedError(view, request, error);
                if (request.isForMainFrame()) {
                    // Erro na página principal → exibe tela de erro
                    progressBar.setVisibility(View.GONE);
                    mostrarTelaErro();
                }
            }
        });

        // ── WebChromeClient: barra de progresso e título ──
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                progressBar.setProgress(newProgress);
            }

            @Override
            public void onReceivedTitle(WebView view, String title) {
                super.onReceivedTitle(view, title);
                toolbar.setTitle(title);
            }
        });
    }

    // ─────────────────────────────────────────────────────────
    // Lógica de Carregamento
    // ─────────────────────────────────────────────────────────

    private void carregarSite() {
        if (temConexao()) {
            esconderTelaErro();
            webView.loadUrl(ECOMMERCE_URL);
        } else {
            mostrarTelaErro();
            Toast.makeText(this,
                    "Sem conexão com a internet", Toast.LENGTH_SHORT).show();
        }
    }

    private void recarregarPagina() {
        if (temConexao()) {
            esconderTelaErro();
            if (webView.getUrl() != null) {
                webView.reload();
            } else {
                webView.loadUrl(ECOMMERCE_URL);
            }
        } else {
            swipeRefresh.setRefreshing(false);
            Toast.makeText(this,
                    "Verifique sua conexão e tente novamente", Toast.LENGTH_SHORT).show();
        }
    }

    // ─────────────────────────────────────────────────────────
    // Conectividade
    // ─────────────────────────────────────────────────────────

    /**
     * Verifica se o dispositivo possui conexão ativa com a internet.
     * Usa NetworkCapabilities (API 23+) em vez do antigo NetworkInfo.
     */
    private boolean temConexao() {
        ConnectivityManager cm =
                (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        if (cm == null) return false;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            android.net.Network network = cm.getActiveNetwork();
            if (network == null) return false;
            NetworkCapabilities caps = cm.getNetworkCapabilities(network);
            return caps != null && (
                    caps.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) ||
                    caps.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) ||
                    caps.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET));
        } else {
            // Fallback para versões antigas (abaixo do Android 6)
            android.net.NetworkInfo netInfo = cm.getActiveNetworkInfo();
            return netInfo != null && netInfo.isConnected();
        }
    }

    // ─────────────────────────────────────────────────────────
    // Estados de UI
    // ─────────────────────────────────────────────────────────

    private void mostrarTelaErro() {
        layoutNoInternet.setVisibility(View.VISIBLE);
        webView.setVisibility(View.GONE);
    }

    private void esconderTelaErro() {
        layoutNoInternet.setVisibility(View.GONE);
        webView.setVisibility(View.VISIBLE);
    }

    // ─────────────────────────────────────────────────────────
    // Menu de Opções
    // ─────────────────────────────────────────────────────────

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.menu_reload) {
            // Recarregar página
            recarregarPagina();
            return true;

        } else if (id == R.id.menu_open_browser) {
            // Abrir no navegador externo
            String url = webView.getUrl() != null ? webView.getUrl() : ECOMMERCE_URL;
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
            return true;

        } else if (id == R.id.menu_share) {
            // Compartilhar link
            String url = webView.getUrl() != null ? webView.getUrl() : ECOMMERCE_URL;
            Intent shareIntent = new Intent(Intent.ACTION_SEND);
            shareIntent.setType("text/plain");
            shareIntent.putExtra(Intent.EXTRA_TEXT,
                    "Confira a e-Footwear Outlet: " + url);
            startActivity(Intent.createChooser(shareIntent, "Compartilhar via"));
            return true;

        } else if (id == R.id.menu_about) {
            // Sobre o app
            mostrarDialogoSobre();
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    private void mostrarDialogoSobre() {
        new AlertDialog.Builder(this)
                .setTitle("Sobre o App")
                .setMessage(
                        "e-Footwear Outlet v1.0\n\n" +
                        "Aplicativo desenvolvido para fins educacionais.\n\n" +
                        "Projeto Prático III – Android Studio\n\n" +
                        "Tecnologias utilizadas:\n" +
                        "• Java\n" +
                        "• Android SDK\n" +
                        "• WebView\n" +
                        "• SwipeRefreshLayout\n\n" +
                        "Repositório: github.com/OFSilva-v2/e-commerce"
                )
                .setPositiveButton("Fechar", null)
                .show();
    }

    // ─────────────────────────────────────────────────────────
    // Navegação: Botão Voltar
    // ─────────────────────────────────────────────────────────

    /**
     * Intercepta o botão "Voltar" do Android.
     * Se o WebView tiver histórico de navegação, volta para a página anterior.
     * Caso contrário, fecha o app normalmente.
     */
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    // ─────────────────────────────────────────────────────────
    // Ciclo de Vida do WebView
    // ─────────────────────────────────────────────────────────

    @Override
    protected void onPause() {
        super.onPause();
        webView.onPause();       // Pausa timers JS, plugins, etc.
    }

    @Override
    protected void onResume() {
        super.onResume();
        webView.onResume();      // Retoma execução
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        webView.destroy();       // Libera recursos do WebView
    }
}
