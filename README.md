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
vite.config.tsにて接続先を設定<br>
<br>
rails apiのdocker環境へ接続<br>target: "http://rails:3000/"を有効にする
Larabel apiのdocker環境へ接続<br>target: "http://nginx/"を有効にする
spring-boot apiのdocker環境へ接続<br>target: "http://spring:8080/"を有効にする

