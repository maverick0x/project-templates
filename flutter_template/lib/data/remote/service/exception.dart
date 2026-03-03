class ApiServiceException implements Exception {
  int? code;
  String? title;
  String? message;
  Map<String, dynamic>? error;

  ApiServiceException({this.code, this.title, this.message, this.error});

  @override
  String toString() {
    return message ?? 'An error occurred';
  }
}
