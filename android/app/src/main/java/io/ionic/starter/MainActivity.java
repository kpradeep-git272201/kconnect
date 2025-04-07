package io.ionic.starter;

import android.os.Bundle;
import androidx.lifecycle.LifecycleOwner;

import com.getcapacitor.BridgeActivity;
import com.kconnect.plugins.mycustomplugin.MyCustomPluginPlugin;

public class MainActivity extends BridgeActivity implements LifecycleOwner {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(MyCustomPluginPlugin.class);
    }
}
