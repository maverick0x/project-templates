class ErrorResponse {
  int? code;
  bool? status;
  String? summary;
  String? message;
  dynamic error;

  ErrorResponse({this.code, this.status, this.summary, this.message, this.error});

  ErrorResponse.fromJson(Map<String, dynamic> json) {
    code = json['code'];
    status = json['status'];
    summary = json['summary'];
    message = json['message'];
    error = json['errors'];
  }
}

class SuccessResponse {
  int? code;
  bool? status;
  String? summary;
  String? message;
  dynamic data;

  SuccessResponse({this.code, this.status, this.summary, this.message, this.data});

  SuccessResponse.fromJson(Map<String, dynamic> json) {
    code = json['code'];
    status = json['status'];
    summary = json['summary'];
    message = json['message'];
    data = json['data'];
  }
}
