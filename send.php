<?php
// エラー詳細を表示させる設定（デバッグ用）
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: text/html; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $to = "AMPLIFYPEANUTS@gmail.com";
    
    // フォームデータの受け取り
    $type     = isset($_POST['type']) ? htmlspecialchars($_POST['type'], ENT_QUOTES, 'UTF-8') : '';
    $category = isset($_POST['category']) ? htmlspecialchars($_POST['category'], ENT_QUOTES, 'UTF-8') : '';
    $company  = isset($_POST['company']) ? htmlspecialchars($_POST['company'], ENT_QUOTES, 'UTF-8') : '';
    $name     = isset($_POST['name']) ? htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8') : '';
    $email    = isset($_POST['email']) ? htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8') : '';
    $url      = isset($_POST['url']) ? htmlspecialchars($_POST['url'], ENT_QUOTES, 'UTF-8') : '';
    $tel      = isset($_POST['tel']) ? htmlspecialchars($_POST['tel'], ENT_QUOTES, 'UTF-8') : '';
    $message  = isset($_POST['message']) ? htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8') : '';

    $subject = "【AMPLIFY PEANUTS】お問い合わせがありました（" . ($type === 'personal' ? '個人' : '法人') . "）";

    $body = "WEBサイトよりお問い合わせを受け付けました。\n\n";
    $body .= "--------------------------------------------------\n";
    $body .= "■ 区分： " . ($type === 'personal' ? '個人' : '法人') . "\n";
    $body .= "■ 問い合わせ種別： " . $category . "\n";
    if (!empty($company)) {
        $body .= "■ 会社名 / 組織名： " . $company . "\n";
    }
    $body .= "■ 氏名： " . $name . "\n";
    $body .= "■ メールアドレス： " . $email . "\n";
    if (!empty($url)) {
        $body .= "■ WebサイトURL： " . $url . "\n";
    }
    $body .= "■ 電話番号： " . $tel . "\n";
    $body .= "■ お問い合わせ内容：\n" . $message . "\n";
    $body .= "--------------------------------------------------\n";

// Headerの設定
    $headers = "From: " . mb_encode_mimeheader("AMPLIFY PEANUTS CONTACT") . " <" . $email . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mb_language("Japanese");
    mb_internal_encoding("UTF-8");

    // --- ここを変更します！ ---
    $is_local = false;   // ← 今はパソコンでテスト中なので「true」になっています

    if (mb_send_mail($to, $subject, $body, $headers)) {
        // 送信成功時に contact-thanks.html へリダイレクト
        header("Location: contact-thanks.html");
        exit();
    } else {
        echo "メール送信エラーが発生しました。サーバーのメール送信機能（sendmail/SMTP）をご確認ください。";
        exit();
    }
} else {
    header("Location: contact.html");
    exit();
}
?>