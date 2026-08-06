import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'screens/soldier_home_screen.dart';

void main() {
  runApp(const ArmoredUnitApp());
}

class ArmoredUnitApp extends StatelessWidget {
  const ArmoredUnitApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'منظومة المقاتل الميداني - وحدة المدرعات',
      debugShowCheckedModeBanner: false,
      locale: const Locale('ar', 'SA'),
      supportedLocales: const [
        Locale('ar', 'SA'),
        Locale('en', 'US'),
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF1E293B),
          primary: const Color(0xFF1E293B),
          secondary: const Color(0xFF0D9488),
          brightness: Brightness.dark,
        ),
        fontFamily: 'Cairo',
      ),
      home: const SoldierHomeScreen(),
    );
  }
}
