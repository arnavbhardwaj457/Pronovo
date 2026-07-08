# DPDP Act Compliance Document

## Overview

This document outlines how Pronovo complies with India's **Digital Personal Data Protection Act, 2023** (DPDP Act) and the **DPDP Rules, 2025**.

Pronovo processes audio recordings containing spoken English. Audio recordings may constitute **personal data** under the DPDP Act as they can contain identifiable voice patterns and potentially reveal personal information through speech content.

---

## 1. Consent (Section 6, DPDP Act)

### Implementation
- **Explicit consent banner** is displayed on the assessment page before upload
- Users must see and acknowledge the privacy notice that states:
  - Audio will be processed for pronunciation assessment
  - Audio is processed in-memory and never stored
  - Audio is sent to Azure (Microsoft) and Google for processing
- Consent is given through the **affirmative action** of clicking "Analyze Pronunciation"
- No audio data is collected before this affirmative action

### Consent Text
> "By uploading, you consent to audio processing. Your recording is analyzed in-memory and never stored. DPDP Act compliant."

---

## 2. Purpose Limitation (Section 4)

Audio data is processed **exclusively** for the stated purpose: pronunciation assessment and feedback generation.

No secondary uses:
- No voice profiling
- No speech model training
- No advertising or analytics based on audio content
- No sharing with third parties beyond the stated processors (Azure, Gemini)

---

## 3. Data Minimization (Section 4)

- Only audio data is collected — no names, emails, phone numbers, or identifiers
- No user accounts or registration required
- No cookies or tracking beyond essential session cookies (if any)
- No IP addresses are stored (rate limiter uses in-memory counters that reset)

---

## 4. Data Retention & Erasure (Section 8)

### Zero Retention Architecture

| Data Type | Storage | Retention Period |
|---|---|---|
| Audio file | In-memory (Node.js Buffer) | Duration of request (~15-25 seconds) |
| Assessment results | Not stored server-side | Returned in HTTP response only |
| IP addresses | In-memory rate limiter | 15-minute sliding window |
| Logs | Console output | No persistent log storage |

- Audio files are held in Node.js `Buffer` objects via `multer.memoryStorage()`
- Buffers are eligible for garbage collection immediately after the HTTP response is sent
- **No database, file system writes, or object storage** is used for audio data
- Assessment results exist only in the HTTP response body — they are not stored server-side

### Right to Erasure
Since no personal data is persisted, the right to erasure is **automatically satisfied**. There is no data to erase.

---

## 5. Data Security (Section 8(4))

### In Transit
- Frontend served via Vercel with automatic HTTPS (TLS 1.3)
- Backend API served via Render with automatic HTTPS (TLS 1.3)
- All API communication is encrypted via HTTPS

### At Rest
- **Not applicable** — no audio or personal data is stored at rest
- API keys are stored as environment variables on the hosting platform, not in source code

### Access Control
- No administrative panel or database access to control
- Backend has no storage layer to access
- Source code repository uses `.gitignore` to exclude environment files

---

## 6. Third-Party Data Processors

### Microsoft Azure (Speech Service)
- **Purpose**: Pronunciation assessment (speech-to-text with phoneme scoring)
- **Data sent**: Audio buffer
- **Data residency**: Azure region configured as `centralindia` (Mumbai data center)
- **Microsoft's compliance**: Azure complies with DPDP Act. See [Microsoft's India data protection page](https://www.microsoft.com/en-in/trust-center/privacy)
- **Retention by Azure**: Azure processes audio in real-time and does not store audio data by default unless opted in

### Google (Gemini API)
- **Purpose**: Generating human-readable pronunciation feedback
- **Data sent**: Transcript text, word scores, phoneme scores (no audio)
- **Note**: Raw audio is NOT sent to Google — only the derived text and scores
- **Google's compliance**: See [Google's data privacy commitment](https://ai.google.dev/terms)

---

## 7. Cross-Border Data Transfer

- Audio may be processed by Azure in the `centralindia` region (data stays in India)
- Text-based data (transcript + scores) may be processed by Google's Gemini API, which may route through international servers
- This is disclosed in the consent notice

---

## 8. Data Principal Rights (Section 11-14)

| Right | Status | Implementation |
|---|---|---|
| Right to access | ✅ Satisfied | All data is returned directly to the user in the response |
| Right to correction | N/A | No stored data to correct |
| Right to erasure | ✅ Automatic | No data persisted |
| Right to nominate | N/A | No user accounts |
| Right to grievance redressal | ✅ Available | Contact information provided |

---

## 9. Threat Model

| Threat | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Audio interception in transit | Low | High | HTTPS/TLS encryption on all connections |
| Server memory dump attack | Very Low | High | Audio buffers are transient; server runs on managed hosting |
| API key theft | Low | Medium | Keys stored as env vars; rate limiting prevents abuse |
| DDoS / rate limit bypass | Medium | Low | IP-based rate limiting; Render/Vercel have built-in DDoS protection |
| Malicious audio upload | Medium | Low | File type validation, size limits, multer configuration |

---

## 10. Contact

For privacy-related inquiries or to exercise data protection rights:
- **Email**: [to be configured]
- **Grievance Officer**: [to be appointed if required]

---

## 11. Future Compliance Enhancements

As the DPDP Act rules are fully enforced (May 2027):

1. **Consent Manager integration** — When consent manager provisions activate (November 2026)
2. **Data Protection Impact Assessment** — If processing volume increases significantly
3. **Data Protection Officer** — Appointment if classified as Significant Data Fiduciary
4. **Audit trail** — If persistent data storage is added in future versions
