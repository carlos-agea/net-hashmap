# net-hashmap
In-memory key value store. The store supports data storage and retrieval through TCP, UDP, and http REST interfaces. 

#HTTP
```
http://localhost:8000/set/name=carlos
http://localhost:8000/get/name
```

#TCP
```
echo "/set/name=carlos" | nc localhost 3000
```

# UDP
```
(echo "/set/name=carlos"; sleep 4) | nc -u localhost 4000
```

