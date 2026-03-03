import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:dio/dio.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';

import '../../../core/utilities/enum/http_request_type.dart';
import '../../../core/utilities/global.dart';
import '../../../core/utilities/logger.dart';
import '../../../di/locator.dart';
import '../../shared/storage_service.dart';
import 'endpoints.dart';
import 'exception.dart';
import 'response.dart';

class ApiClient {
  static final Dio _dio = _createDio();
  static final _authInterceptor = _AuthInterceptor();
  static const _defaultHeader = {'Content-Type': 'application/json'};

  static final _filenameRegExp = RegExp(r'filename[^;=\n]*=([^;\n]+)');
  static final _cachePrefixRegExp = RegExp(r'^cache');

  static Dio _createDio() {
    final dio = Dio(
      BaseOptions(
        baseUrl: ApiEndpoints.BASE_URL,
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
        sendTimeout: const Duration(seconds: 30),
      ),
    );
    dio.interceptors.add(_authInterceptor);
    dio.interceptors.add(PrettyDioLogger(responseBody: true, requestBody: true));
    return dio;
  }

  /// Call after login to cache the new token in memory.
  static Future<void> onTokenChanged() async {
    await _authInterceptor.refreshToken();
  }

  /// Call on logout to clear the cached token.
  static void onLogout() {
    _authInterceptor.clearToken();
  }

  static Future<dynamic> put({
    required String endpoint,
    dynamic data,
    bool useToken = true,
  }) async {
    final result = await _call(
      endpoint: endpoint,
      type: RequestType.PUT,
      useToken: useToken,
      data: data,
    );
    return result;
  }

  static Future<dynamic> get({
    required String endpoint,
    Map<String, dynamic>? queryParameters,
    bool useToken = true,
  }) async {
    final result = await _call(
      endpoint: endpoint,
      queryParameters: queryParameters,
      type: RequestType.GET,
      useToken: useToken,
    );
    return result;
  }

  static Future<dynamic> patch({
    required String endpoint,
    dynamic data,
    bool useToken = true,
    Map<String, dynamic>? queryParameters,
  }) async {
    final result = await _call(
      endpoint: endpoint,
      useToken: useToken,
      data: data,
      queryParameters: queryParameters,
      type: RequestType.PATCH,
    );
    return result;
  }

  static Future<SuccessResponse> post({
    required String endpoint,
    required Map<String, dynamic> data,
    bool isFormData = false,
    bool useToken = true,
  }) async {
    final result = await _call(
      endpoint: endpoint,
      type: RequestType.POST,
      useToken: useToken,
      isFormData: isFormData,
      data: data,
    );
    return result;
  }

  static Future<dynamic> delete({required String endpoint, bool useToken = true}) async {
    final result = await _call(
      endpoint: endpoint,
      type: RequestType.DELETE,
      useToken: useToken,
    );
    return result;
  }

  static Future<dynamic> _call({
    required String endpoint,
    Map<String, dynamic>? data,
    Map<String, dynamic>? queryParameters,
    required bool useToken,
    required RequestType type,
    bool isFormData = false,
  }) async {
    if (useToken) {
      await _authInterceptor.ensureToken();
    }

    try {
      final options = Options(
        headers: Map<String, dynamic>.from(_defaultHeader),
        extra: {'useToken': useToken},
      );
      Response response;
      dynamic body = data;

      if (isFormData && data != null) {
        body = FormData.fromMap(data);
      }

      switch (type) {
        case RequestType.POST:
          response = await _dio.post(endpoint, data: body, options: options);
          break;

        case RequestType.PUT:
          response = await _dio.put(endpoint, data: body, options: options);
          break;

        case RequestType.GET:
          response = await _dio.get(
            endpoint,
            queryParameters: queryParameters,
            options: options,
          );
          break;

        case RequestType.PATCH:
          response = await _dio.patch(endpoint, data: body, options: options);
          break;

        case RequestType.DELETE:
          response = await _dio.delete(
            endpoint,
            options: options,
            queryParameters: queryParameters,
            data: data,
          );
          break;
      }
      return SuccessResponse.fromJson(response.data);
    } on DioException catch (error) {
      _handleDioError(error, useToken: useToken);
    } catch (e) {
      AppLogger.log(e.toString(), error: e);
      throw ApiServiceException(message: e.toString());
    }
  }

  static Future<dynamic> download({
    required String endpoint,
    Directory? dir,
    String method = 'get',
    bool useToken = true,
  }) async {
    if (useToken) {
      await _authInterceptor.ensureToken();
    }

    int? sdkInt = await Global.getAndroidSdkInt() ?? 30;
    List<Permission> permissions = [];
    if (sdkInt > 32) {
      permissions = [Permission.videos, Permission.photos];
    } else {
      permissions = [Permission.storage];
    }
    // Check if all permissions are granted
    bool allGranted = true;
    for (Permission permission in permissions) {
      if (!(await permission.isGranted)) {
        allGranted = false;
        break;
      }
    }

    // Request permissions if any are not granted
    if (!allGranted) {
      Map<Permission, PermissionStatus> statuses = await permissions.request();
      allGranted = statuses.values.every((status) => status.isGranted);

      // Return if not all permissions are granted
      if (!allGranted) {
        return;
      }
    }

    Directory? tempDir;
    if (Platform.isIOS) {
      tempDir = await getDownloadsDirectory();
    } else {
      tempDir = Directory("/storage/emulated/0/Download/");
      if (!await tempDir.exists()) {
        tempDir = await getApplicationDocumentsDirectory();
      }
    }
    tempDir = dir ?? tempDir;

    try {
      Response response = await _dio.get(
        endpoint,
        options: Options(
          method: method,
          headers: Map<String, dynamic>.from(_defaultHeader),
          responseType: ResponseType.bytes,
          extra: {'useToken': useToken},
        ),
      );

      String? contentDisposition = response.headers.value('content-disposition');
      String? contentType = response.headers.value('content-type');

      String fileName = 'downloaded_file';

      if (contentDisposition != null && contentDisposition.contains('filename=')) {
        Match? match = _filenameRegExp.firstMatch(contentDisposition);
        if (match != null) {
          fileName =
              match
                  .group(1)
                  ?.replaceAll('"', '')
                  .replaceAll('\'', '')
                  .replaceAll(' ', '') ??
              fileName;
        }
      }

      fileName = fileName.replaceAll(_cachePrefixRegExp, ''); // Remove "cache" prefix
      if (contentType != null) {
        if (contentType.contains('application/pdf')) {
          fileName += fileName.endsWith('.pdf') ? '' : '.pdf';
        } else if (contentType.contains('image/')) {
          String ext = contentType.split('/').last;
          fileName += fileName.endsWith('.$ext') ? '' : '.$ext';
        }
      }
      String savePath = "${tempDir?.path}/$fileName";
      File file = File(savePath);
      await file.writeAsBytes(response.data);
      return file;
    } on DioException catch (error) {
      _handleDioError(error, useToken: useToken);
    } catch (e) {
      AppLogger.log(e.toString(), error: e);
      throw ApiServiceException(message: e.toString());
    }
  }

  static Never _handleDioError(DioException error, {required bool useToken}) {
    if (error.response != null) {
      dynamic data = error.response!.data;

      if (data is Uint8List) {
        String jsonString = String.fromCharCodes(data);
        data = jsonDecode(jsonString);
      }

      if (data is Map<String, dynamic>) {
        ErrorResponse response = ErrorResponse.fromJson(data);

        if (error.response!.statusCode != 422) {
          if (error.response?.statusCode == 401 && useToken) {
            _authInterceptor.clearToken();
          }
          throw ApiServiceException(
            code: response.code,
            title: response.summary,
            message: response.message,
          );
        }

        Map<String, dynamic>? errorMap = data['errors'];
        if (errorMap != null && errorMap.keys.isNotEmpty) {
          throw ApiServiceException(
            code: response.code,
            title: response.summary,
            message: response.message,
            error: errorMap,
          );
        }

        throw ApiServiceException(
          code: response.code,
          title: response.summary,
          message: response.message,
        );
      }
    }

    AppLogger.log(error.response.toString(), error: error);
    throw ApiServiceException();
  }
}

class _AuthInterceptor extends Interceptor {
  String? _cachedToken;

  Future<void> refreshToken() async {
    _cachedToken = await locator.get<StorageService>().getTokenFromDisk();
  }

  void clearToken() {
    _cachedToken = null;
  }

  /// Ensures token is loaded at least once from disk.
  Future<void> ensureToken() async {
    if (_cachedToken == null) {
      await refreshToken();
    }
  }

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    if (options.extra['useToken'] == true && _cachedToken != null) {
      options.headers['Authorization'] = 'Bearer $_cachedToken';
    }
    handler.next(options);
  }
}
