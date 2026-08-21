package com.fuelmyathlete.app;

import android.os.Bundle;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    /**
     * Back goes back a page, and only leaves the app when there is nowhere left to go.
     *
     * Three approaches were tried on an emulator before this one, and the two that failed are
     * worth recording because both look correct.
     *
     * Capacitor's JavaScript `backButton` listener does fire, confirmed with a listener that
     * wrote to localStorage, but firing it does not stop the native side doing its default as
     * well. Back both navigated the WebView and sent the app to the background in one press, so
     * resuming showed a page further back than where you left it, having apparently closed for
     * no reason.
     *
     * Overriding `onBackPressed` did nothing at all, because on Android 13 and later with this
     * target the system routes back through the predictive back dispatcher and never calls that
     * method. It is deprecated for exactly this reason. Setting
     * `enableOnBackInvokedCallback="false"` in the manifest does not bring it back on Android 15.
     *
     * So: register with the dispatcher, which is the supported path and the one predictive back
     * actually uses. When the WebView has history, consume the press and go back. When it does
     * not, disable this callback and hand the press onward, which lets the platform do the
     * ordinary thing of leaving the app from its first screen.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (getBridge() != null
                        && getBridge().getWebView() != null
                        && getBridge().getWebView().canGoBack()) {
                    getBridge().getWebView().goBack();
                    return;
                }
                // Nothing left in the WebView's history. Step out of the way for one press so
                // the platform can background the app as it normally would.
                setEnabled(false);
                getOnBackPressedDispatcher().onBackPressed();
            }
        });
    }
}
