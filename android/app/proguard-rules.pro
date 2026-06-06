# Capacitor / Cordova bridges
-keep class com.getcapacitor.** { *; }
-keep class org.apache.cordova.** { *; }
-keep class * extends com.getcapacitor.Plugin { *; }
-keepclassmembers class * {
    @com.getcapacitor.PluginMethod <methods>;
}

# WebView JavaScript interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Google Play Billing
-keep class com.android.billingclient.** { *; }
-keep class com.android.vending.billing.** { *; }

# cordova-plugin-purchase
-keep class cc.fovea.** { *; }

# Mantieni info per stack trace leggibili
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
