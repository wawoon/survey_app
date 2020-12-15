# API documentation

We are using slate to build API documents.
https://github.com/slatedocs/slate

## To build document

```
cd slate
docker run --rm --name slate-build -v $(pwd)/build:/srv/slate/build -v $(pwd)/source:/srv/slate/source slatedocs/slate
```

## To develop document

```
cd slate
docker run --rm --name slate -p 4567:4567 -v $(pwd)/source:/srv/slate/source slatedocs/slate serve
```
