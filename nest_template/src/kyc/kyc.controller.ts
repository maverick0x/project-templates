import { Body, Controller, Post } from '@nestjs/common';
import { KycService } from './kyc.service';
import { CreateKycDto } from './dto/create-kyc.dto';
import { DiditWebhookPayload } from './dto/webhook';

@Controller('kyc')
export class KycController {
  constructor(private readonly kycService: KycService) { }

  @Post()
  create(@Body() createDto: CreateKycDto) {
    return this.kycService.createV3Session(createDto.userId);
  }

  @Post('webhook')
  handleDiditWebhook(@Body() event: DiditWebhookPayload) {
    // Always verify the webhook signature in production using process.env.DIDIT_WEBHOOK_SECRET_KEY

    // if (event.type === 'didit:completed' && event.status === 'Approved') {
    const userId = event.vendor_data;
    // Update the user's KYC/KYB status to 'Verified' in your database
    console.log(`User ${userId} successfully verified!`);
    // console.log('Verification details:', event.decision);
    console.log("Verification: Event Type: ", event.webhook_type);
    console.log("Verification: Event Status: ", event.status);
    // }

    const data = {
      "application_id": "5ae06dc7-6768-46e5-a7d7-8fe54faa976d",
      "created_at": 1777369943,
      "decision": {
        "aml_screenings": null,
        "callback": null,
        "contact_details": null,
        "created_at": "2026-04-28T09:52:23.753587Z",
        "database_validations": null,
        "email_verifications": null,
        "expected_details": null,
        "expires_at": "2026-05-05T09:52:23.743431Z",
        "face_matches": [
          {
            "node_id": "feature_face_match",
            "score": 95.26,
            "source_image": "https://service-didit-verification-production-a1c5f9b8.s3.amazonaws.com/face-match/7a9584a3-5afd-4c4a-bcae-4efd3435ee1b/source.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAUH6QTJHN5JYNSGDQ%2F20260428%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20260428T103401Z&X-Amz-Expires=14400&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCWV1LXdlc3QtMSJIMEYCIQD0DVt%2FBDHK502DEKGGeUkjk4dBsA83g8EozbkLjFh2gAIhAL7wxzbEqQrMpuwgubAPlGxb2hvJWcrRyRWMYckAJHdzKuoDCNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMjkxOTU4Mzc2OTIzIgzfRZWTPEHYKgR4MXUqvgOjwiuhYZGgUjZEmFH6W6FIjxes5ewFQUHfEzAUMZJML0SOq6wu%2FeO8ACoIVzubnlTn%2B2rQiFC5IusB9wvVfBf%2B22zYxXLDnLfJUZKhXzpGlkCBFLjBvivWodRm4xTfmHGqohv1V%2BIZimoZUKROLFTN%2FWXTFW6f%2BLNJulTAw%2F5e0qbUtOqB1rFEANs%2Bousdsq2gG7WZjHXtksSFLkFhBRwjmlmdlSgFoCv2QFnHShqdWY5dW8vKWHLLrXwnuibZcpcj6Rdm8G4PhA4oB88dgNbeoTc4UQma07jh5w3k0Ld%2BXH5Gue5uI9LHndRWv9vFY0v9dTUzFwVY7jlo19RrD7s%2FVHiVKW7uRJOdhb7roGyz%2BX6IK7ZdeIQFFhCpN6sa8%2B159mPTSjkCrimiiLyd%2BDviJSSOD8ArzjiZ2e3RgjFiGIfEo8HJhFqjW%2FLPB2Aq2lhRKaGC49oOPIN3%2F900UmUVZd2kSuGdJdJDDsvsvICUrgcZyu%2FwW3F4LamrtCwUy6xsARAZMU5rCc4qaX6eWimZbEgskhgATVDZCeRvHoXE%2BIqRjO12rV%2BIioL%2BUEoALGg%2FvNI057AXTNETb0prQzCYk8LPBjqkAUgGeHxCYj2%2Fh3Arliw38lUnftbfYhyn2hj%2F9p%2FtK72ZyLq3a6CBRCOfUI8sH%2Bc1ng5QjOaqMEV4gFvuIrvqAxO3O%2BYKZ%2BD%2FgpRYp0ne2THi7nxsPPRxVNJPZd9lFFXBe%2FNJnAbRYW3B8K2dtZK5%2FHMp%2FXnt8dNntQfgg4JOpWrWdQE65m774AJOgCXm55Ra5Bs39KsLlC9wq3xc5PVPLtYImAiO&X-Amz-Signature=3042e63ace1e09e017b533a8b9d5215950bfe92c414ba4dd9049a09c505c380c",
            "source_image_session_id": null,
            "status": "Approved",
            "target_image": "https://service-didit-verification-production-a1c5f9b8.s3.amazonaws.com/face-match/7a9584a3-5afd-4c4a-bcae-4efd3435ee1b/target.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAUH6QTJHN5JYNSGDQ%2F20260428%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20260428T103401Z&X-Amz-Expires=14400&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCWV1LXdlc3QtMSJIMEYCIQD0DVt%2FBDHK502DEKGGeUkjk4dBsA83g8EozbkLjFh2gAIhAL7wxzbEqQrMpuwgubAPlGxb2hvJWcrRyRWMYckAJHdzKuoDCNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMjkxOTU4Mzc2OTIzIgzfRZWTPEHYKgR4MXUqvgOjwiuhYZGgUjZEmFH6W6FIjxes5ewFQUHfEzAUMZJML0SOq6wu%2FeO8ACoIVzubnlTn%2B2rQiFC5IusB9wvVfBf%2B22zYxXLDnLfJUZKhXzpGlkCBFLjBvivWodRm4xTfmHGqohv1V%2BIZimoZUKROLFTN%2FWXTFW6f%2BLNJulTAw%2F5e0qbUtOqB1rFEANs%2Bousdsq2gG7WZjHXtksSFLkFhBRwjmlmdlSgFoCv2QFnHShqdWY5dW8vKWHLLrXwnuibZcpcj6Rdm8G4PhA4oB88dgNbeoTc4UQma07jh5w3k0Ld%2BXH5Gue5uI9LHndRWv9vFY0v9dTUzFwVY7jlo19RrD7s%2FVHiVKW7uRJOdhb7roGyz%2BX6IK7ZdeIQFFhCpN6sa8%2B159mPTSjkCrimiiLyd%2BDviJSSOD8ArzjiZ2e3RgjFiGIfEo8HJhFqjW%2FLPB2Aq2lhRKaGC49oOPIN3%2F900UmUVZd2kSuGdJdJDDsvsvICUrgcZyu%2FwW3F4LamrtCwUy6xsARAZMU5rCc4qaX6eWimZbEgskhgATVDZCeRvHoXE%2BIqRjO12rV%2BIioL%2BUEoALGg%2FvNI057AXTNETb0prQzCYk8LPBjqkAUgGeHxCYj2%2Fh3Arliw38lUnftbfYhyn2hj%2F9p%2FtK72ZyLq3a6CBRCOfUI8sH%2Bc1ng5QjOaqMEV4gFvuIrvqAxO3O%2BYKZ%2BD%2FgpRYp0ne2THi7nxsPPRxVNJPZd9lFFXBe%2FNJnAbRYW3B8K2dtZK5%2FHMp%2FXnt8dNntQfgg4JOpWrWdQE65m774AJOgCXm55Ra5Bs39KsLlC9wq3xc5PVPLtYImAiO&X-Amz-Signature=14fc0ca81e0a479c66facccf3b60f2f5e94a417b2a6ad6b682ba0cc6aaba3b2f",
            "warnings": []
          }
        ],
        "features": [
          "ID_VERIFICATION",
          "FACE_MATCH"
        ],
        "id_verifications": [
          {
            "address": null,
            "age": 24,
            "back_image": null,
            "back_image_camera_front": null,
            "back_image_camera_front_face_match_score": null,
            "back_image_quality_score": null,
            "back_video": null,
            "date_of_birth": "2001-05-06",
            "date_of_issue": "2024-02-29",
            "document_number": "65624066658",
            "document_type": "Identity Card",
            "expiration_date": null,
            "extra_fields": {
              "first_surname": "Bello"
            },
            "extra_files": [],
            "first_name": "Farouk Adebayo",
            "formatted_address": null,
            "front_image": "https://service-didit-verification-production-a1c5f9b8.s3.amazonaws.com/ocr/4689173d-e90e-4e2b-a6ed-43ec1c5f9372-front_image-4ba0683d-4339-4c14-92d3-bf381c5c633f.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAUH6QTJHN5JYNSGDQ%2F20260428%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20260428T103401Z&X-Amz-Expires=14400&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCWV1LXdlc3QtMSJIMEYCIQD0DVt%2FBDHK502DEKGGeUkjk4dBsA83g8EozbkLjFh2gAIhAL7wxzbEqQrMpuwgubAPlGxb2hvJWcrRyRWMYckAJHdzKuoDCNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMjkxOTU4Mzc2OTIzIgzfRZWTPEHYKgR4MXUqvgOjwiuhYZGgUjZEmFH6W6FIjxes5ewFQUHfEzAUMZJML0SOq6wu%2FeO8ACoIVzubnlTn%2B2rQiFC5IusB9wvVfBf%2B22zYxXLDnLfJUZKhXzpGlkCBFLjBvivWodRm4xTfmHGqohv1V%2BIZimoZUKROLFTN%2FWXTFW6f%2BLNJulTAw%2F5e0qbUtOqB1rFEANs%2Bousdsq2gG7WZjHXtksSFLkFhBRwjmlmdlSgFoCv2QFnHShqdWY5dW8vKWHLLrXwnuibZcpcj6Rdm8G4PhA4oB88dgNbeoTc4UQma07jh5w3k0Ld%2BXH5Gue5uI9LHndRWv9vFY0v9dTUzFwVY7jlo19RrD7s%2FVHiVKW7uRJOdhb7roGyz%2BX6IK7ZdeIQFFhCpN6sa8%2B159mPTSjkCrimiiLyd%2BDviJSSOD8ArzjiZ2e3RgjFiGIfEo8HJhFqjW%2FLPB2Aq2lhRKaGC49oOPIN3%2F900UmUVZd2kSuGdJdJDDsvsvICUrgcZyu%2FwW3F4LamrtCwUy6xsARAZMU5rCc4qaX6eWimZbEgskhgATVDZCeRvHoXE%2BIqRjO12rV%2BIioL%2BUEoALGg%2FvNI057AXTNETb0prQzCYk8LPBjqkAUgGeHxCYj2%2Fh3Arliw38lUnftbfYhyn2hj%2F9p%2FtK72ZyLq3a6CBRCOfUI8sH%2Bc1ng5QjOaqMEV4gFvuIrvqAxO3O%2BYKZ%2BD%2FgpRYp0ne2THi7nxsPPRxVNJPZd9lFFXBe%2FNJnAbRYW3B8K2dtZK5%2FHMp%2FXnt8dNntQfgg4JOpWrWdQE65m774AJOgCXm55Ra5Bs39KsLlC9wq3xc5PVPLtYImAiO&X-Amz-Signature=ddb62517155ccdac9e640707ffa8702cdb88fc0bf2a47294e35f92aee85a47c2",
            "front_image_camera_front": "https://service-didit-verification-production-a1c5f9b8.s3.amazonaws.com/ocr/4689173d-e90e-4e2b-a6ed-43ec1c5f9372-front_image_camera_front-b8e4df99-2fe0-4231-a86a-a69e78bbd3de.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAUH6QTJHN5JYNSGDQ%2F20260428%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20260428T103401Z&X-Amz-Expires=14400&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCWV1LXdlc3QtMSJIMEYCIQD0DVt%2FBDHK502DEKGGeUkjk4dBsA83g8EozbkLjFh2gAIhAL7wxzbEqQrMpuwgubAPlGxb2hvJWcrRyRWMYckAJHdzKuoDCNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMjkxOTU4Mzc2OTIzIgzfRZWTPEHYKgR4MXUqvgOjwiuhYZGgUjZEmFH6W6FIjxes5ewFQUHfEzAUMZJML0SOq6wu%2FeO8ACoIVzubnlTn%2B2rQiFC5IusB9wvVfBf%2B22zYxXLDnLfJUZKhXzpGlkCBFLjBvivWodRm4xTfmHGqohv1V%2BIZimoZUKROLFTN%2FWXTFW6f%2BLNJulTAw%2F5e0qbUtOqB1rFEANs%2Bousdsq2gG7WZjHXtksSFLkFhBRwjmlmdlSgFoCv2QFnHShqdWY5dW8vKWHLLrXwnuibZcpcj6Rdm8G4PhA4oB88dgNbeoTc4UQma07jh5w3k0Ld%2BXH5Gue5uI9LHndRWv9vFY0v9dTUzFwVY7jlo19RrD7s%2FVHiVKW7uRJOdhb7roGyz%2BX6IK7ZdeIQFFhCpN6sa8%2B159mPTSjkCrimiiLyd%2BDviJSSOD8ArzjiZ2e3RgjFiGIfEo8HJhFqjW%2FLPB2Aq2lhRKaGC49oOPIN3%2F900UmUVZd2kSuGdJdJDDsvsvICUrgcZyu%2FwW3F4LamrtCwUy6xsARAZMU5rCc4qaX6eWimZbEgskhgATVDZCeRvHoXE%2BIqRjO12rV%2BIioL%2BUEoALGg%2FvNI057AXTNETb0prQzCYk8LPBjqkAUgGeHxCYj2%2Fh3Arliw38lUnftbfYhyn2hj%2F9p%2FtK72ZyLq3a6CBRCOfUI8sH%2Bc1ng5QjOaqMEV4gFvuIrvqAxO3O%2BYKZ%2BD%2FgpRYp0ne2THi7nxsPPRxVNJPZd9lFFXBe%2FNJnAbRYW3B8K2dtZK5%2FHMp%2FXnt8dNntQfgg4JOpWrWdQE65m774AJOgCXm55Ra5Bs39KsLlC9wq3xc5PVPLtYImAiO&X-Amz-Signature=9eab1af4bd78cb6ba352d40fecae8ea40c67ab7ee6cbd5e52b0aabc434d1beb2",
            "front_image_camera_front_face_match_score": 68,
            "front_image_quality_score": {
              "brightness_issue": "ok",
              "brightness_score": 95.3,
              "focus_score": 100,
              "is_document_fully_visible": true,
              "overall_score": 83.8,
              "resolution_score": 40.9
            },
            "front_video": "https://service-didit-verification-production-a1c5f9b8.s3.amazonaws.com/ocr/4689173d-e90e-4e2b-a6ed-43ec1c5f9372-front_video-71827e66-3a7d-4767-807e-2816d1fc3a6a.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAUH6QTJHN5JYNSGDQ%2F20260428%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20260428T103401Z&X-Amz-Expires=14400&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCWV1LXdlc3QtMSJIMEYCIQD0DVt%2FBDHK502DEKGGeUkjk4dBsA83g8EozbkLjFh2gAIhAL7wxzbEqQrMpuwgubAPlGxb2hvJWcrRyRWMYckAJHdzKuoDCNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMjkxOTU4Mzc2OTIzIgzfRZWTPEHYKgR4MXUqvgOjwiuhYZGgUjZEmFH6W6FIjxes5ewFQUHfEzAUMZJML0SOq6wu%2FeO8ACoIVzubnlTn%2B2rQiFC5IusB9wvVfBf%2B22zYxXLDnLfJUZKhXzpGlkCBFLjBvivWodRm4xTfmHGqohv1V%2BIZimoZUKROLFTN%2FWXTFW6f%2BLNJulTAw%2F5e0qbUtOqB1rFEANs%2Bousdsq2gG7WZjHXtksSFLkFhBRwjmlmdlSgFoCv2QFnHShqdWY5dW8vKWHLLrXwnuibZcpcj6Rdm8G4PhA4oB88dgNbeoTc4UQma07jh5w3k0Ld%2BXH5Gue5uI9LHndRWv9vFY0v9dTUzFwVY7jlo19RrD7s%2FVHiVKW7uRJOdhb7roGyz%2BX6IK7ZdeIQFFhCpN6sa8%2B159mPTSjkCrimiiLyd%2BDviJSSOD8ArzjiZ2e3RgjFiGIfEo8HJhFqjW%2FLPB2Aq2lhRKaGC49oOPIN3%2F900UmUVZd2kSuGdJdJDDsvsvICUrgcZyu%2FwW3F4LamrtCwUy6xsARAZMU5rCc4qaX6eWimZbEgskhgATVDZCeRvHoXE%2BIqRjO12rV%2BIioL%2BUEoALGg%2FvNI057AXTNETb0prQzCYk8LPBjqkAUgGeHxCYj2%2Fh3Arliw38lUnftbfYhyn2hj%2F9p%2FtK72ZyLq3a6CBRCOfUI8sH%2Bc1ng5QjOaqMEV4gFvuIrvqAxO3O%2BYKZ%2BD%2FgpRYp0ne2THi7nxsPPRxVNJPZd9lFFXBe%2FNJnAbRYW3B8K2dtZK5%2FHMp%2FXnt8dNntQfgg4JOpWrWdQE65m774AJOgCXm55Ra5Bs39KsLlC9wq3xc5PVPLtYImAiO&X-Amz-Signature=33cec81f6f980bb8075204490fb3dee7806a5420f9e0211c840a6c74a869af33",
            "full_back_image": null,
            "full_front_image": "https://service-didit-verification-production-a1c5f9b8.s3.amazonaws.com/ocr/4689173d-e90e-4e2b-a6ed-43ec1c5f9372-full_front_image-f646db38-ac6b-4833-b408-2249641da8b3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAUH6QTJHN5JYNSGDQ%2F20260428%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20260428T103401Z&X-Amz-Expires=14400&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCWV1LXdlc3QtMSJIMEYCIQD0DVt%2FBDHK502DEKGGeUkjk4dBsA83g8EozbkLjFh2gAIhAL7wxzbEqQrMpuwgubAPlGxb2hvJWcrRyRWMYckAJHdzKuoDCNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMjkxOTU4Mzc2OTIzIgzfRZWTPEHYKgR4MXUqvgOjwiuhYZGgUjZEmFH6W6FIjxes5ewFQUHfEzAUMZJML0SOq6wu%2FeO8ACoIVzubnlTn%2B2rQiFC5IusB9wvVfBf%2B22zYxXLDnLfJUZKhXzpGlkCBFLjBvivWodRm4xTfmHGqohv1V%2BIZimoZUKROLFTN%2FWXTFW6f%2BLNJulTAw%2F5e0qbUtOqB1rFEANs%2Bousdsq2gG7WZjHXtksSFLkFhBRwjmlmdlSgFoCv2QFnHShqdWY5dW8vKWHLLrXwnuibZcpcj6Rdm8G4PhA4oB88dgNbeoTc4UQma07jh5w3k0Ld%2BXH5Gue5uI9LHndRWv9vFY0v9dTUzFwVY7jlo19RrD7s%2FVHiVKW7uRJOdhb7roGyz%2BX6IK7ZdeIQFFhCpN6sa8%2B159mPTSjkCrimiiLyd%2BDviJSSOD8ArzjiZ2e3RgjFiGIfEo8HJhFqjW%2FLPB2Aq2lhRKaGC49oOPIN3%2F900UmUVZd2kSuGdJdJDDsvsvICUrgcZyu%2FwW3F4LamrtCwUy6xsARAZMU5rCc4qaX6eWimZbEgskhgATVDZCeRvHoXE%2BIqRjO12rV%2BIioL%2BUEoALGg%2FvNI057AXTNETb0prQzCYk8LPBjqkAUgGeHxCYj2%2Fh3Arliw38lUnftbfYhyn2hj%2F9p%2FtK72ZyLq3a6CBRCOfUI8sH%2Bc1ng5QjOaqMEV4gFvuIrvqAxO3O%2BYKZ%2BD%2FgpRYp0ne2THi7nxsPPRxVNJPZd9lFFXBe%2FNJnAbRYW3B8K2dtZK5%2FHMp%2FXnt8dNntQfgg4JOpWrWdQE65m774AJOgCXm55Ra5Bs39KsLlC9wq3xc5PVPLtYImAiO&X-Amz-Signature=eb80396b520e98aa69a324208f67c5eb68b02f5936840e0fb7ce778ad3f09a9c",
            "full_name": "Farouk Adebayo Bello",
            "gender": "M",
            "issuing_state": "NGA",
            "issuing_state_name": "Nigeria",
            "last_name": "Bello",
            "marital_status": "UNKNOWN",
            "matches": [],
            "mrz": null,
            "nationality": null,
            "node_id": "feature_ocr",
            "parsed_address": null,
            "personal_number": null,
            "place_of_birth": null,
            "portrait_image": "https://service-didit-verification-production-a1c5f9b8.s3.amazonaws.com/ocr/4689173d-e90e-4e2b-a6ed-43ec1c5f9372-portrait_image-4168b278-12e4-4d0f-bdf3-58667ca6c48f.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAUH6QTJHN5JYNSGDQ%2F20260428%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20260428T103401Z&X-Amz-Expires=14400&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCWV1LXdlc3QtMSJIMEYCIQD0DVt%2FBDHK502DEKGGeUkjk4dBsA83g8EozbkLjFh2gAIhAL7wxzbEqQrMpuwgubAPlGxb2hvJWcrRyRWMYckAJHdzKuoDCNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMjkxOTU4Mzc2OTIzIgzfRZWTPEHYKgR4MXUqvgOjwiuhYZGgUjZEmFH6W6FIjxes5ewFQUHfEzAUMZJML0SOq6wu%2FeO8ACoIVzubnlTn%2B2rQiFC5IusB9wvVfBf%2B22zYxXLDnLfJUZKhXzpGlkCBFLjBvivWodRm4xTfmHGqohv1V%2BIZimoZUKROLFTN%2FWXTFW6f%2BLNJulTAw%2F5e0qbUtOqB1rFEANs%2Bousdsq2gG7WZjHXtksSFLkFhBRwjmlmdlSgFoCv2QFnHShqdWY5dW8vKWHLLrXwnuibZcpcj6Rdm8G4PhA4oB88dgNbeoTc4UQma07jh5w3k0Ld%2BXH5Gue5uI9LHndRWv9vFY0v9dTUzFwVY7jlo19RrD7s%2FVHiVKW7uRJOdhb7roGyz%2BX6IK7ZdeIQFFhCpN6sa8%2B159mPTSjkCrimiiLyd%2BDviJSSOD8ArzjiZ2e3RgjFiGIfEo8HJhFqjW%2FLPB2Aq2lhRKaGC49oOPIN3%2F900UmUVZd2kSuGdJdJDDsvsvICUrgcZyu%2FwW3F4LamrtCwUy6xsARAZMU5rCc4qaX6eWimZbEgskhgATVDZCeRvHoXE%2BIqRjO12rV%2BIioL%2BUEoALGg%2FvNI057AXTNETb0prQzCYk8LPBjqkAUgGeHxCYj2%2Fh3Arliw38lUnftbfYhyn2hj%2F9p%2FtK72ZyLq3a6CBRCOfUI8sH%2Bc1ng5QjOaqMEV4gFvuIrvqAxO3O%2BYKZ%2BD%2FgpRYp0ne2THi7nxsPPRxVNJPZd9lFFXBe%2FNJnAbRYW3B8K2dtZK5%2FHMp%2FXnt8dNntQfgg4JOpWrWdQE65m774AJOgCXm55Ra5Bs39KsLlC9wq3xc5PVPLtYImAiO&X-Amz-Signature=d299f2c112c9f7a6714a838f7d2c133b19ce52433af72566d213cce0b254382f",
            "status": "Approved",
            "warnings": [
              {
                "additional_data": null,
                "feature": "ID_VERIFICATION",
                "log_type": "information",
                "long_description": "The system couldn't find or read the barcode on the document. This could be due to poor image quality or an unsupported document type.",
                "node_id": "feature_ocr",
                "risk": "BARCODE_NOT_DETECTED",
                "short_description": "Barcode not detected"
              }
            ]
          }
        ],
        "ip_analyses": null,
        "liveness_checks": null,
        "metadata": null,
        "nfc_verifications": null,
        "phone_verifications": null,
        "poa_verifications": null,
        "questionnaire_responses": null,
        "reviews": [],
        "session_id": "4689173d-e90e-4e2b-a6ed-43ec1c5f9372",
        "session_kind": "user",
        "session_number": 2,
        "session_url": "https://verify.didit.me/session/VjZ9Lgik0j-T",
        "status": "Approved",
        "vendor_data": "maverick-user-session",
        "workflow_id": "c0128d48-da2b-4a9d-b511-d633ab63faf0"
      },
      "event_id": "8605d242-65a5-4267-90ec-c286430c35d2",
      "session_id": "4689173d-e90e-4e2b-a6ed-43ec1c5f9372",
      "status": "Approved",
      "timestamp": 1777372441,
      "vendor_data": "maverick-user-session",
      "webhook_type": "status.updated",
      "workflow_id": "c0128d48-da2b-4a9d-b511-d633ab63faf0",
      "workflow_version": 1
    }

    return { message: 'Webhook received' };
  }
}
