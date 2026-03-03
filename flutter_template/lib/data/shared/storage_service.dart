import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../core/config/keys.dart';

class StorageService {
  static StorageService? _instance;
  static SharedPreferences? _preferences;
  static FlutterSecureStorage? _secureStorage;

  void clearAllDataFromDisk() {
    _preferences!.clear();
    _secureStorage!.deleteAll();
  }

  Object? getDataFromDisk(String key) {
    return _preferences!.get(key);
  }

  Future<String?> getTokenFromDisk() async {
    final result = await _secureStorage!.read(key: AppKeys.token);
    return json.decode(result ?? '');
  }

  void removeDataFromDisk(String key) {
    _preferences!.remove(key);
  }

  Future<void> saveToken(String token) async {
    await _secureStorage?.write(key: AppKeys.token, value: token);
  }

  Future<void> saveDataToDisk<T>(String key, T content) async {
    switch (content) {
      case String value:
        await _preferences!.setString(key, value);
        break;

      case int value:
        await _preferences!.setInt(key, value);
        break;

      case bool value:
        await _preferences!.setBool(key, value);
        break;

      case double value:
        await _preferences!.setDouble(key, value);
        break;

      case List<String> value:
        await _preferences!.setStringList(key, value);
        break;

      default:
        throw ArgumentError('Unsupported type');
    }
  }

  static Future<StorageService> getInstance() async {
    _instance ??= StorageService();
    _preferences ??= await SharedPreferences.getInstance();
    _secureStorage = const FlutterSecureStorage();
    return _instance!;
  }
}
