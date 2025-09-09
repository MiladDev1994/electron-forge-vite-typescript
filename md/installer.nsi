; ------------------------------------------------------------------
; installer.nsi - نمونه ساده ولی کامل برای اپ Electron
; ------------------------------------------------------------------

!include "MUI2.nsh"              ; Modern UI 2

; ----- اطلاعات پایه -----
Name "MyApp"                     ; نام نمایش داده‌شده در پنجره‌ها
OutFile "electron-vite.exe"     ; نام فایل خروجی نصاب
InstallDir "$PROGRAMFILES\MyCompany\MyApp" ; مسیر پیش‌فرض نصب
RequestExecutionLevel admin       ; نیاز به دسترسی ادمین برای نوشتن Program Files/Registry
SetCompressor lzma                ; فشرده‌سازی بهتر

; آیکون نصاب (اختیاری)
; Icon "installer.ico"
; UninstallIcon "installer.ico"

; ----- صفحات نصاب (MUI) -----
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "license.txt"   ; اگر لایسنس داری
!insertmacro MUI_PAGE_COMPONENTS               ; انتخاب کامپوننت‌ها / گزینه‌ها
!insertmacro MUI_PAGE_DIRECTORY                ; انتخاب پوشه نصب
!insertmacro MUI_PAGE_INSTFILES

; گزینهٔ "run the app after install" در صفحهٔ Finish
!define MUI_FINISHPAGE_RUN "$INSTDIR\MyApp.exe"
!insertmacro MUI_PAGE_FINISH

; صفحات حذف نصب (uninstall)
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"  ; یا "Persian" اگر فایل زبان داری
; صفحه Finish با گزینه اجرای برنامه
!define MUI_FINISHPAGE_RUN "$INSTDIR\electron-vite.exe"
!insertmacro MUI_PAGE_FINISH

; ----- متغیرها / داکیومنتیشن -----
!define APP_NAME "MyApp"
!define COMPANY "MyCompany"
!define VERSION "1.0.0"
!define EXE_NAME "MyApp.exe"





; ----- بخش نصب -----
Section "Install Files" SecFiles
  ; مسیر استخراج فایل‌ها
  SetOutPath "$INSTDIR"

  ; اینجا مسیر خروجی ساخته‌شده توسط Electron Forge/packager/… را بنویس
  ; مثال: اگر خروجی‌ت توی out/make یا dist/win-unpacked است
  File /r "E:\Lerning\Programing\Js\electron-vite\out\electron-vite-win32-x64\*.*" ; <-- این مسیر را تغییر بده

  ; ایجاد فولدر در استارت منو و شورتکات
  CreateDirectory "$SMPROGRAMS\${COMPANY}\${APP_NAME}"
  CreateShortCut "$DESKTOP\Electron Vite.lnk" "$INSTDIR\electron-vite.exe"

  ; نوشتن فایل حذف نصب داخل پوشهٔ نصب
  WriteUninstaller "$INSTDIR\Uninstall.exe"

  ; ثبت کردن در رجیستری برای نمایش در Programs & Features
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_NAME}" "DisplayName" "${APP_NAME}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_NAME}" "UninstallString" "$INSTDIR\\Uninstall.exe"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_NAME}" "DisplayVersion" "${VERSION}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_NAME}" "Publisher" "${COMPANY}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_NAME}" "InstallLocation" "$INSTDIR"
SectionEnd




; ----------------- بخش نصب Node.js -----------------
Section "Install Node.js" SecNode
  ; چک می‌کنیم که Node.js نصب نیست
  ReadRegStr $0 HKLM "SOFTWARE\Node.js" "InstallPath"
  StrCmp $0 "" +2
    Goto NodeInstalled

  ; دانلود یا اجرای Node.js installer
  ; فرض کنید فایل nodejs installer رو کنار installer اصلی گذاشتی
  ExecWait '"$EXEDIR\node-v20.7.0-x64.msi" /quiet /norestart'

NodeInstalled:
SectionEnd





; ----------------- بخش نصب اسکریپت -----------------
Section "Run JS Script"
  ; مسیر فایل JS داخل فولدر نصب
  ; Node.js باید نصب شده باشه و مسیرش توی PATH باشه
  ExecWait '"node" "$INSTDIR\script.js"'
SectionEnd


; ----- بخش حذف نصب -----
Section "Uninstall"
  ; پاک کردن شورتکات‌ها
  Delete "$DESKTOP\${APP_NAME}.lnk"
  Delete "$SMPROGRAMS\${COMPANY}\${APP_NAME}\${APP_NAME}.lnk"

  ; حذف فایل حذف نصب (برای اینکه خود حذف‌نصب هم حذف بشه)
  Delete "$INSTDIR\\Uninstall.exe"

  ; حذف کل دایرکتوری نصب به‌صورت بازگشتی
  RMDir /r "$INSTDIR"

  ; حذف کلید رجیستری Uninstall
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_NAME}"
SectionEnd