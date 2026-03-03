import '../service/api_client.dart';
import '../service/endpoints.dart';

class TemplateRepository {
  Future<String> template() async {
    final result = await ApiClient.get(endpoint: ApiEndpoints.BASE_URL, useToken: false);

    return result;
  }
}
