<?php
declare(strict_types=1);
require dirname(__DIR__, 2) . '/server/bootstrap.php';
loqelo_security_headers();
if ($_SERVER['REQUEST_METHOD'] !== 'GET') loqelo_json(405, ['success'=>false]);
loqelo_json(200, ['csrfToken'=>loqelo_csrf()]);
