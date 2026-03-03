import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:template/core/config/themes/mode.dart';

import 'core/utilities/logger.dart';
import 'di/locator.dart';

void main() {
  runZonedGuarded<Future<void>>(
    () async {
      // Ensure that bindings are initialized inside the same zone
      WidgetsFlutterBinding.ensureInitialized();

      // Set up your services and dependencies inside the Zone
      await dotenv.load();
      await setUpLocator();

      runApp(ProviderScope(child: TemplateApp()));
    },
    (error, stackTrace) {
      AppLogger.log(error.toString(), name: "ERROR", error: error, trace: stackTrace);
    },
  );
}

class TemplateApp extends StatelessWidget {
  final _router = locator<GoRouter>();

  TemplateApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      // TODO: Adjust design size based on your target device's screen dimensions
      designSize: const Size(400, 840),
      minTextAdapt: true,
      splitScreenMode: true,
      child: MaterialApp.router(
        title: 'Template',
        theme: AppThemeMode.light,
        darkTheme: AppThemeMode.dark,
        themeMode: ThemeMode.light,
        routerConfig: _router,
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}
