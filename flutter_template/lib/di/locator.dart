import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

import '../core/config/router/router.dart';
import '../data/remote/repository/template_repository.dart';
import '../data/shared/storage_service.dart';

GetIt locator = GetIt.instance;

Future setUpLocator() async {
  locator.registerSingleton<GoRouter>(router());
  final instance = await StorageService.getInstance();
  locator.registerSingleton<StorageService>(instance);

  locator.registerSingleton<TemplateRepository>(TemplateRepository());
}
