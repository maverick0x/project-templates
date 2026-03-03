import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../views/modules/splash.dart';
import 'routes.dart';

GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

GoRouter router() => GoRouter(
  navigatorKey: navigatorKey,
  initialLocation: AppRoutes.SPLASH_SCREEEN,
  routes: [
    // Define your routes here
    GoRoute(
      name: AppRoutes.SPLASH_SCREEEN,
      path: AppRoutes.SPLASH_SCREEEN,
      builder: ((context, state) => SplashScreen()),
    ),
  ],
);
