import 'dart:developer';

import 'package:flutter/foundation.dart' show ValueNotifier;
import 'package:restart_app/restart_app.dart';
import 'package:shorebird_code_push/shorebird_code_push.dart'
    show ShorebirdUpdater, UpdateException, UpdateStatus;

class ShorebirdService {
  final _updater = ShorebirdUpdater();
  final ValueNotifier<bool> isUpdateReady = ValueNotifier(false);

  final ValueNotifier<int> version = ValueNotifier(0);

  ShorebirdService() {
    fetchPatchNumber();
  }

  void fetchPatchNumber() async {
    _updater.readCurrentPatch().then((currentPatch) {
      version.value = currentPatch?.number ?? 0;
      log('Current patch version: $version');
    });
  }

  Future<void> checkForUpdates() async {
    fetchPatchNumber();
    final updateAvailable = await _updater.checkForUpdate();
    if (updateAvailable == UpdateStatus.outdated) {
      try {
        await _updater.update();
        isUpdateReady.value = true;
      } on UpdateException catch (error) {
        isUpdateReady.value = false;
        log('Failed to update: $error');
      }
    } else {
      isUpdateReady.value = false;
      log('App is up to date');
    }
  }

  void restart() => Restart.restartApp();

  void dispose() {
    isUpdateReady.dispose();
  }
}
