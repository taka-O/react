# README
react勉強用

# 環境
react（typescript）<br>
vite<br>
@material ui<br>

# Dockerセットアップ、および起動
docker compose up -d<br>

# Docker react環境への接続
docker compose react-app bash<br>
localhost:3001にアクセスする<br>

# API接続設定
vite.config.tsにて接続先を設定
<ul>
<li>rails apiのdocker環境へ接続</li>target: "http://rails:3000/"を有効にする
<li>Larabel apiのdocker環境へ接続</li>target: "http://nginx/"を有効にする
<li>spring-boot apiのdocker環境へ接続</li>target: "http://spring:8080/"を有効にする
</ul>

# Mailhog問題点
mailhogのパスワード変更リンクから画面が開けない<br>
また、plain textに表示されるURLが、本来`=`の箇所が`=3D`に変更されそのままのURLではトークンが一致しない<br>
