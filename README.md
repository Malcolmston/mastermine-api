# mastermine-api


```json
{
host: 'https://mastermine-api.malcolm69.repl.co'
}
```

1. GET
```shell
curl host/guess/a/4,4,4,4
   -H "Accept: application/json" 
```

2. POST
```shell
curl -X POST host/newgame
   -H 'Content-Type: application/json'
   -d '{"name":"a"}'
```

