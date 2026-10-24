<?php
declare(strict_types=1);
require dirname(__DIR__, 2) . '/server/bootstrap.php';
loqelo_security_headers();
loqelo_session();
$csrf = loqelo_csrf();
$ready = loqelo_config_ready();
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!loqelo_check_csrf((string)($_POST['csrf'] ?? ''))) {
        http_response_code(403);
        $error = 'Security token invalid; reload and retry.';
    } elseif (($_POST['action'] ?? '') === 'logout') {
        $_SESSION = [];
        session_regenerate_id(true);
        header('Location: /admin/'); exit;
    } elseif (($_POST['action'] ?? '') === 'login') {
        if (!$ready) $error = 'Admin configuration incomplete.';
        elseif (!loqelo_rate_allowed('admin-login', 10, 900)) $error = 'Too many attempts; try again later.';
        elseif (password_verify((string)($_POST['password'] ?? ''), (string)(loqelo_config()['admin_password_hash'] ?? ''))) {
            session_regenerate_id(true);
            $_SESSION['admin_authenticated'] = true;
            $_SESSION['admin_login_at'] = time();
            header('Location: /admin/'); exit;
        } else $error = 'Incorrect password.';
    } elseif (!empty($_SESSION['admin_authenticated']) && ($_POST['action'] ?? '') === 'contact') {
        $action = (string)($_POST['contact_action'] ?? '');
        $id = (string)($_POST['id'] ?? '');
        if (!in_array($action, ['unsubscribe','delete'], true) || !preg_match('/^[a-f0-9]{24}$/', $id)) $error = 'Invalid operation.';
        elseif (loqelo_update_contact($id, $action)) { header('Location: /admin/?updated=1'); exit; }
        else $error = 'Contact not found.';
    }
}
$authenticated = !empty($_SESSION['admin_authenticated']) && (time() - (int)($_SESSION['admin_login_at'] ?? 0) < 28800);
$contacts = $authenticated ? loqelo_contacts() : [];
if ($authenticated && ($_GET['export'] ?? '') === 'csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="loqelo-waitlist-' . gmdate('Y-m-d') . '.csv"');
    $out = fopen('php://output','wb');
    fwrite($out, "\xEF\xBB\xBF");
    $cols = ['id','created_at','role','email','country','account_type','language','consent','consent_version','consent_purpose','consent_at','status'];
    fputcsv($out, $cols);
    foreach ($contacts as $row) {
        $values = array_map(static function($col) use ($row) {
            $value = (string)($row[$col] ?? '');
            return preg_match('/^[=+@\-\t\r]/u', $value) ? "'".$value : $value;
        },$cols);
        fputcsv($out,$values);
    }
    fclose($out); exit;
}
$active = array_values(array_filter($contacts, static fn($r) => ($r['status'] ?? '') === 'subscribed'));
$customerCount = count(array_filter($active, static fn($r) => ($r['role'] ?? '') === 'customer'));
$providerCount = count(array_filter($active, static fn($r) => ($r['role'] ?? '') === 'provider'));
$countries = [];
foreach ($active as $r) { $country = (string)($r['country'] ?? ''); $countries[$country] = ($countries[$country] ?? 0) + 1; }
arsort($countries);
?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Loqelo · Waitlist Admin</title><link rel="stylesheet" href="/admin/admin.css"><script defer src="/admin/admin.js"></script></head><body><main class="wrap"><header class="head"><div><img src="/assets/logo/loqelo-logo.svg" alt="Loqelo" width="160"><p class="muted">Private pre-launch contact dashboard</p></div><?php if ($authenticated): ?><form method="post"><input type="hidden" name="csrf" value="<?=loqelo_e($csrf)?>"><button name="action" value="logout" type="submit">Log out</button></form><?php endif; ?></header>
<?php if ($error): ?><p role="alert" class="error"><?=loqelo_e($error)?></p><?php endif; ?>
<?php if (!$authenticated): ?><section class="panel login"><h1>Admin sign in</h1><p class="muted">Only the site owner or authorized staff should access this page.</p><form method="post"><input type="hidden" name="csrf" value="<?=loqelo_e($csrf)?>"><label for="password">Admin password</label><input type="password" id="password" name="password" autocomplete="current-password" required><button type="submit" name="action" value="login">Sign in</button></form><?php if (!$ready): ?><p class="error">Before using the dashboard, configure <code>server/settings.local.php</code> outside the public directory.</p><?php endif; ?></section>
<?php else: ?><h1>Waitlist overview</h1><div class="stats"><div class="panel"><small>Active contacts</small><strong><?=count($active)?></strong></div><div class="panel"><small>Customers</small><strong><?=$customerCount?></strong></div><div class="panel"><small>Providers</small><strong><?=$providerCount?></strong></div><div class="panel"><small>Countries represented</small><strong><?=count($countries)?></strong></div></div>
<div class="section-head"><h2>Contacts</h2><a class="button" href="?export=csv">Export CSV</a></div><p class="muted">Opted-in waitlist records only; analytics reports are handled separately in GA4 after consent.</p><div class="table-scroll"><table><thead><tr><th>Received (UTC)</th><th>Role</th><th>Email</th><th>Country</th><th>Type</th><th>Status</th><th>Manage</th></tr></thead><tbody><?php foreach (array_reverse($contacts) as $row): ?><tr><td><?=loqelo_e((string)($row['created_at'] ?? ''))?></td><td><?=loqelo_e((string)($row['role'] ?? ''))?></td><td><?=loqelo_e((string)($row['email'] ?? ''))?></td><td><?=loqelo_e((string)($row['country'] ?? ''))?></td><td><?=loqelo_e((string)($row['account_type'] ?? ''))?></td><td><?=loqelo_e((string)($row['status'] ?? ''))?></td><td><form class="inline" method="post" data-admin-contact-form><input type="hidden" name="csrf" value="<?=loqelo_e($csrf)?>"><input type="hidden" name="action" value="contact"><input type="hidden" name="id" value="<?=loqelo_e((string)$row['id'])?>"><button type="submit" name="contact_action" value="unsubscribe">Unsubscribe</button><button type="submit" class="danger" name="contact_action" value="delete">Delete</button></form></td></tr><?php endforeach; ?></tbody></table></div>
<div class="panel"><h2>Country breakdown</h2><?php if (!$countries): ?><p class="muted">No contacts yet.</p><?php else: ?><ul class="country-list"><?php foreach ($countries as $country=>$count): ?><li><span><?=loqelo_e($country)?></span><strong><?=$count?></strong></li><?php endforeach; ?></ul><?php endif; ?></div><p class="muted">Keep these exports secure and implement your organization's retention and unsubscribe policy before mailing the list.</p><?php endif; ?></main></body></html>
