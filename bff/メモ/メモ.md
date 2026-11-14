- http://127.0.0.1:3000

## やること

1. まず、jsonplaceholderをbffでたたいて、そのままレスポンスを返す
2. エラーハンドリング（jsonplaceholder通信失敗、post/putのパラメータ不足 など）
3. ログ出力
4. 一覧取得にpage, total, limitと絞り込みつける

- 認証周りを含めたエラーハンドリングも追々やりたい

```
nest g module [追加したい名前]
nest g controller [追加したい名前]
nest g service [追加したい名前]
```
