export interface DiditIdVerification {
  first_name: string;
  last_name: string;
  full_name: string;
  document_type: string;
  document_number: string;
  date_of_birth: string;
  gender: string;
  issuing_state_name: string;
}

export interface DiditFaceMatch {
  score: number;
  status: string;
}

export interface DiditWebhookPayload {
  webhook_type: string;             // Event type (e.g., "verification_completed")
  status: string;           // Overall status (e.g., "Approved")
  vendor_data: string;      // Your internal User ID (e.g., "maverick-user-session")
  decision: {
    id_verifications?: DiditIdVerification[];
    face_matches?: DiditFaceMatch[];
  };
}