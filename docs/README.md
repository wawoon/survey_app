# How to run documetation site

```
cd slate
docker run --rm --name slate -p 4567:4567 -v $(pwd)/source:/srv/slate/source slatedocs/slate serve
```

open slate
