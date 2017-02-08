# net-hashmap
In-memory key value store. The store supports data storage and retrieval through TCP, UDP, and http REST interfaces. 
The operations set, get, has and remove are supported.
#HTTP
```
http://localhost:8000/set/name=carlos
http://localhost:8000/get/name
http://localhost:8000/has/name
http://localhost:8000/remove/name
```

#TCP
```
echo "/set/name=carlos" | nc localhost 3000
echo "/get/name" | nc localhost 3000
echo "/has/name" | nc localhost 3000
echo "/remove/name" | nc localhost 3000
```

# UDP
```
(echo "/set/name=carlos"; sleep 4) | nc -u localhost 4000
(echo "/get/name"; sleep 4) | nc -u localhost 4000
(echo "/has/name"; sleep 4) | nc -u localhost 4000
(echo "/remove/name"; sleep 4) | nc -u localhost 4000
```

