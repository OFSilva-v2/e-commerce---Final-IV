package com.efootwear.app;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

/**
 * SplashActivity – Tela de abertura do app e-Footwear Outlet.
 *
 * Exibe a logo e o nome do app por 2,5 segundos antes de redirecionar
 * para a MainActivity que contém o WebView.
 *
 * Conceito pedagógico:
 *  - Handler + Runnable para temporizador sem bloqueio da UI Thread
 *  - Animações XML para experiência profissional
 *  - Separação de responsabilidades (Splash ≠ lógica principal)
 */
public class SplashActivity extends AppCompatActivity {

    // Tempo de exibição da splash em milissegundos
    private static final long SPLASH_DELAY_MS = 2500;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        // Referências às views
        ImageView imgLogo = findViewById(R.id.imgLogo);
        TextView tvAppName = findViewById(R.id.tvAppName);
        TextView tvTagline = findViewById(R.id.tvTagline);

        // Carrega e inicia animações definidas em res/anim
        Animation fadeInScale = AnimationUtils.loadAnimation(this, R.anim.fade_in_scale);
        Animation fadeInSlide = AnimationUtils.loadAnimation(this, R.anim.fade_in_slide);

        imgLogo.startAnimation(fadeInScale);
        tvAppName.startAnimation(fadeInSlide);
        tvTagline.startAnimation(fadeInSlide);

        // Navega para MainActivity após o delay
        new Handler().postDelayed(() -> {
            Intent intent = new Intent(SplashActivity.this, MainActivity.class);
            startActivity(intent);
            // Transição suave entre activities
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
            finish(); // Remove SplashActivity da stack de navegação
        }, SPLASH_DELAY_MS);
    }
}
