package com.growthapp.reactnative;

import android.Manifest;
import android.app.Activity;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.List;


public class ReactNativeContext extends ReactContextBaseJavaModule {

    public ReactNativeContext(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNToAndroid";
    }

    /**
     * 提示框
     * @param contest
     */
    @ReactMethod
    public void toastShow(String contest) {
        Toast.makeText(getReactApplicationContext(),contest,Toast.LENGTH_LONG).show();
    }

}
