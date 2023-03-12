# htmlshape.js
HTML を入力すると整形して出力する JavaScript のライブラリです。

## 目次
* htmlshape.js  
  ライブラリ本体。
* htmlshape.min.js  
  ライブラリ本体。圧縮版。
* sample.html  
  使い方のサンプル。
* raw.html  
  崩れた HTML のサンプル。

## 説明
* HTML のインデントを整えます。
* 標準のインデント文字はスペース 2 つですが、第 2 引数に文字列を与えると変更することができます。
* Markdown を HTML に変換するライブラリ [mdparse](https://github.com/satsuki-thyme/mdparse) のお供にご利用ください。

## 動作
* タグ間のスペース、タブ、改行を削除し、タグの入れ子に従って改行とタブを入れ直します。
* HTML5 準拠のタグ以外は無視します。
* タグ内の HTML5 準拠でない記述はそのまま残します。

## CDN
https://cdn.jsdelivr.net/gh/satsuki-thyme/htmlshape.js@main/htmlshape.min.js
