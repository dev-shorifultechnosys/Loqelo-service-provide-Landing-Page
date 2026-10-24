<?php
declare(strict_types=1);
require dirname(__DIR__, 2) . '/server/bootstrap.php';
loqelo_security_headers();
// With Cloudflare enabled, CF-IPCountry is passed by the verified proxy;
// otherwise browser-language fallback is provided in the front end.
$country = strtoupper((string)($_SERVER['HTTP_CF_IPCOUNTRY'] ?? ''));
if (!preg_match('/^[A-Z]{2}$/', $country) || in_array($country, ['XX','T1'], true)) $country = '';
$map = ['DE'=>'de','AT'=>'de','CH'=>'de','LI'=>'de','FR'=>'fr','BE'=>'fr','LU'=>'fr','MC'=>'fr','PL'=>'pl'];
loqelo_json(200, ['country'=>$country ?: null,'suggestedLanguage'=>$map[$country] ?? null]);
