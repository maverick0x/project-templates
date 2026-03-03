import 'package:flutter/material.dart';

import 'colors.dart';

class AppThemeMode {
  static ThemeData get light => ThemeData(
    brightness: Brightness.light,
    colorSchemeSeed: AppColors.primary,
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.primary,
      titleTextStyle: TextStyle(
        color: AppColors.textPrimary,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
    ),
    textTheme: const TextTheme(
      bodyMedium: TextStyle(color: AppColors.textPrimary),
      bodyLarge: TextStyle(color: AppColors.textPrimary),
      bodySmall: TextStyle(color: AppColors.textPrimary),
    ),
  );

  static ThemeData get dark => ThemeData(
    brightness: Brightness.dark,
    colorSchemeSeed: AppColors.secondary,
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.secondary,
      titleTextStyle: TextStyle(
        color: AppColors.textSecondary,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
    ),
    textTheme: const TextTheme(
      bodyMedium: TextStyle(color: AppColors.textSecondary),
      bodyLarge: TextStyle(color: AppColors.textSecondary),
      bodySmall: TextStyle(color: AppColors.textSecondary),
    ),
  );
}
