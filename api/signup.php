<?php
declare(strict_types=1);
require dirname(__DIR__, 2) . '/server/bootstrap.php';
loqelo_security_headers();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') loqelo_json(405, ['success'=>false,'message'=>'Method not allowed']);
if (!loqelo_config_ready() || !loqelo_storage_ready()) loqelo_json(503, ['success'=>false,'message'=>'The waitlist is being configured. Please try later.']);
if (!loqelo_same_origin()) loqelo_json(403, ['success'=>false,'message'=>'Invalid origin']);
if ((int)($_SERVER['CONTENT_LENGTH'] ?? '0') > 8192) loqelo_json(413, ['success'=>false,'message'=>'Request too large']);
if (!str_contains((string)($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json')) loqelo_json(415, ['success'=>false,'message'=>'JSON required']);
$payload = json_decode((string)file_get_contents('php://input'), true);
if (!is_array($payload)) loqelo_json(400, ['success'=>false,'message'=>'Invalid request']);
if (!loqelo_check_csrf((string)($payload['csrfToken'] ?? ''))) loqelo_json(403, ['success'=>false,'message'=>'Please refresh and try again']);
if (!empty($payload['website'])) loqelo_json(200, ['success'=>true]); // hidden honeypot; discard bots
if (!loqelo_rate_allowed('signup', 8, 3600)) loqelo_json(429, ['success'=>false,'message'=>'Too many attempts. Try again later.']);
$role = strtolower(trim((string)($payload['role'] ?? '')));
$email = strtolower(trim((string)($payload['email'] ?? '')));
$country = strtoupper(trim((string)($payload['country'] ?? '')));
$accountType = trim((string)($payload['accountType'] ?? ''));
$language = trim((string)($payload['language'] ?? 'en'));
if (!in_array($role, ['customer','provider'], true) || strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) loqelo_json(422, ['success'=>false,'message'=>'Check your email and account role']);
$allowedCountries = json_decode((string)file_get_contents(LOQELO_ROOT . '/countries.json'), true) ?: [];
if (!in_array($country, $allowedCountries, true)) loqelo_json(422, ['success'=>false,'message'=>'Choose a valid country']);
if ($accountType !== '' && !in_array($accountType, ['individual','business'], true)) loqelo_json(422, ['success'=>false,'message'=>'Invalid account type']);
if (($payload['marketingConsent'] ?? false) !== true) loqelo_json(422, ['success'=>false,'message'=>'Please confirm your consent to launch updates']);
if (!in_array($language, ['en','de','fr','pl'], true)) $language = 'en';
$entry = [
    'id'=>bin2hex(random_bytes(12)), 'created_at'=>gmdate('c'),
    'role'=>$role, 'email'=>$email,'country'=>$country,
    'account_type'=>$accountType,'language'=>$language,
    'consent'=>true, 'consent_version'=>'2026-10-v1',
    'consent_purpose'=>'Loqelo launch and project news',
    'consent_at'=>gmdate('c'), 'status'=>'subscribed',
];
try {
    $created = loqelo_store_contact($entry);
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
    $_SESSION['csrf_issued'] = time() - 2;
    loqelo_json(200, ['success'=>true,'created'=>$created,'message'=>'Thanks! Your waitlist interest is recorded.']);
} catch (Throwable $e) {
    error_log('Loqelo signup storage error: ' . get_class($e));
    loqelo_json(500, ['success'=>false,'message'=>'Could not save your signup. Please try again later.']);
}
