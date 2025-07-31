# README
react勉強用

# 環境
react（typescript）<br>
vite<br>
@material ui<br>

# Dockerセットアップ、および起動
<ul>
<li>セットアップ、および起動</li>docker compose up -d
<li>npm install（コンテナの起動に失敗するため）</li>docker compose run --rm react-app npm install
<li>再起動</li>docker compose up -d
</ul>

# Docker react環境への接続
docker compose react-app bash<br>
ブラウザにてlocalhost:3001にアクセスする<br>

# API接続設定
vite.config.tsにて接続先を設定
<ul>
<li>rails apiのdocker環境へ接続</li>target: "http://rails:3000/"を有効にする
<li>Larabel apiのdocker環境へ接続</li>target: "http://nginx/"を有効にする
<li>spring-boot apiのdocker環境へ接続</li>target: "http://spring:8080/"を有効にする
</ul>

# Mail
Mailpitのコンソールにて送信されたメールを確認<br>
htt://localhost:8025<br>
リンクを直接開けないので、text等からパラメータをコピーして使用する

