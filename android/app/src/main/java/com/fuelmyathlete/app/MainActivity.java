package com.fuelmyathlete.app;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.ViewGroup;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebView;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.WebViewListener;

public class MainActivity extends BridgeActivity {

    private static final String TAG = "FuelMyAthlete";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        surviveRendererDeath();

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

    /**
     * Come back from the WebView's render process being killed, instead of dying with it.
     *
     * This is the fix for the only crash a closed tester actually reported: "app is crashing after
     * some time of testing". There is no exception behind it and nothing in our own code throws,
     * which is why it does not look like a bug until you know where to look.
     *
     * Android runs the WebView's renderer in a separate process, and it is allowed to reclaim that
     * process whenever it wants memory: while we are backgrounded, or on a cheap phone with several
     * apps open. When it does, WebViewClient.onRenderProcessGone fires, and the return value is a
     * promise about whether the app can carry on without that renderer. Return false and the
     * platform kills our process on the spot. Capacitor's WebViewListener returns false by default
     * and registers no listener of its own, so out of the box every Capacitor app makes that promise
     * wrongly and is terminated. To the person holding the phone it is indistinguishable from a
     * crash: the app they left ten minutes ago vanishes to the launcher.
     *
     * This app is unusually exposed to it. `server.url` means the WebView holds the whole live site
     * rather than a small bundled page, with recipe photography in it, so the renderer is a fat
     * target the moment we are not in front.
     *
     * Recovery has to be a restart. A WebView whose renderer is gone is permanently unusable and
     * every method on it throws, including getUrl, so there is nothing to read off it and nothing to
     * reload. We detach it, destroy it, and start the activity again, which builds a fresh bridge
     * and a fresh renderer. Returning true is what buys us the chance to do that.
     *
     * Nothing is lost in the restart. The plan, the profile and the ratings are in localStorage
     * under `fma:` and the session is in Supabase's own storage, so a parent comes back to the same
     * week. They land on the first screen rather than the one they left, which is the entire cost.
     */
    private void surviveRendererDeath() {
        if (getBridge() == null) return;

        getBridge().addWebViewListener(new WebViewListener() {
            @Override
            public boolean onRenderProcessGone(WebView view, RenderProcessGoneDetail detail) {
                // didCrash false means the system took it for memory, which is the ordinary case
                // and the one worth recovering from quietly. True means the renderer itself fell
                // over, which is a real bug somewhere in the page, so say so in logcat.
                Log.w(TAG, "WebView render process gone (didCrash=" + detail.didCrash() + "). Restarting.");

                if (view.getParent() instanceof ViewGroup) {
                    ((ViewGroup) view.getParent()).removeView(view);
                }
                view.destroy();

                Intent restart = new Intent(MainActivity.this, MainActivity.class);
                restart.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
                finish();
                startActivity(restart);

                // Handled. Without this the platform kills the process and the tester sees a crash.
                return true;
            }
        });
    }
}
