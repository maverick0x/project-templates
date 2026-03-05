import '../../core/resource/data_state.dart';
import '../../core/usecase/usecase.dart';
import '../../data/remote/repository/template_repository.dart';
import '../../data/remote/service/exception.dart';
import '../../di/locator.dart';

class TemplateUsecase extends UseCase<DataState<String>, void> {
  final _repository = locator.get<TemplateRepository>();

  @override
  Future<DataState<String>> call(void params) async {
    try {
      final result = await _repository.template();
      return DataSuccess(result);
    } on ApiServiceException catch (e) {
      return DataFailed(e.toString(), errorData: e.error);
    } catch (e) {
      return DataFailed(e.toString());
    }
  }
}
