# rougier-fiche-inventaire

This the second version of Inventory app that's also based rougier-prep-parc, but this one got the grouping file (Fiche).

To prod build the app

in the root folder run: 

1- 
```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```
2-
```bash
cd ./android
```
3-
```bash
./gradlew assembleDebug
```
